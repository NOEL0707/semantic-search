from fastapi import FastAPI
import textwrap
from pymilvus import connections, utility, FieldSchema, Collection, CollectionSchema, DataType,Status
import openai
import datasets
from datasets import list_datasets
from datasets import config
from datasets import load_dataset
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


HOST = 'localhost'
PORT = 19530
COLLECTION_NAME = 'book_search'
DIMENSION = 1536
OPENAI_ENGINE = 'text-embedding-ada-002'
openai.api_key = ""
INDEX_PARAM = {
    'metric_type':'L2',
    'index_type':"HNSW",
    'params':{'M': 8, 'efConstruction': 64}
}

QUERY_PARAM = {
    "metric_type": "L2",
    "params": {"ef": 64},
}

BATCH_SIZE = 1000
# Connect to Milvus Database
fields = [
    FieldSchema(name='id', dtype=DataType.INT64, is_primary=True, auto_id=True),
    FieldSchema(name='title', dtype=DataType.VARCHAR, max_length=64000),
    FieldSchema(name='description', dtype=DataType.VARCHAR, max_length=64000),
    FieldSchema(name='embedding', dtype=DataType.FLOAT_VECTOR, dim=DIMENSION)
]
schema = CollectionSchema(fields=fields)
con=connections.connect(host=HOST, port=PORT)
collection = Collection(name=COLLECTION_NAME, schema=schema)
# Simple function that converts the texts to embeddings
def embed(texts):
    embeddings = openai.Embedding.create(
        input=texts,
        engine=OPENAI_ENGINE
    )
    return [x['embedding'] for x in embeddings['data']]

def query_database(queries, top_k = 5):
    if type(queries) != list:
        queries = [queries]
    res = collection.search(embed(queries), anns_field='embedding', param=QUERY_PARAM, limit = top_k, output_fields=['id','title', 'description'])
    for i, hit in enumerate(res):
        print('Description:', queries[i])
        print('Results:')
        data=[]
        for ii, hits in enumerate(hit):
            dict={
                "id":hits.entity.get('id'),
                "rank":ii+1,
                "score":hits.score,
                "title":hits.entity.get('title'),
                "description":hits.entity.get('description')
            }
            # print('\t' + 'Rank:', ii + 1, 'Score:', hits.score, 'Title:', hits.entity.get('title'))
            # print(textwrap.fill(hits.entity.get('description'), 88))
            # print()
            data.append(dict)
    # Create an empty list to store the unique dictionaries
    unique_dicts = []

    # Create an empty set to keep track of the unique score values
    unique_scores = set()

    # Loop through each dictionary in the list
    for d in  data :
        score = d['score']
        
        # Check if the score is unique
        if score not in unique_scores:
            # Add the dictionary to the list of unique dictionaries
            unique_dicts.append(d)
            # Add the score to the set of unique score values
            unique_scores.add(score)
    return unique_dicts

@app.get("/")
def read_root():
    return {"Result": "Welcome to sementica your sementic search tool"}

@app.get("/search/{query}/{limit}")
def read_item(query: str,limit:int):
    s=query_database(query,limit)
    # print(s)
    for z in s:
        print(z['id'])
        z['id'] = str(z['id'])
    return {"results": s}


@app.get("/view/{id}")
def read_item(id: str):
    exp="id in ["+id+"]"
    print(exp)
    results = collection.query(
        expr = exp,
        offset = 0,
        limit = 1, 
        output_fields = ['id',"title", "description"],
        consistency_level="Strong"
    )
    print(results)
    if(len(results)==0):
        return {"results":[]}
    return {"results": results[0]}

@app.get("/delete/{id}")
def read_item(id: str):
    results = collection.delete(
        expr = "id in ["+id+"]"
    )
    print(results)
    return {"results": "Success"}
@app.post("/insert")
def read_item(res:dict):
    print(res)
    data = [
        [res['title']],
        [res['description']],
        embed(res['description'])
    ]
    insertResult=collection.insert(data)
    print(insertResult)
    return {"results": 'suceess'}