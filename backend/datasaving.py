from pymilvus import connections, utility, FieldSchema, Collection, CollectionSchema, DataType
import openai
import datasets
from datasets import list_datasets
from datasets import config
from datasets import load_dataset
from tqdm import tqdm

HOST = 'localhost'
PORT = 19530
COLLECTION_NAME = 'book_search'
DIMENSION = 1536
OPENAI_ENGINE = 'text-embedding-ada-002'
openai.api_key = "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"

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
connections.connect(host=HOST, port=PORT)
# Remove collection if it already exists
if utility.has_collection(COLLECTION_NAME):
    utility.drop_collection(COLLECTION_NAME)
# Create collection which includes the id, title, and embedding.
fields = [
    FieldSchema(name='id', dtype=DataType.INT64, is_primary=True, auto_id=True),
    FieldSchema(name='title', dtype=DataType.VARCHAR, max_length=64000),
    FieldSchema(name='description', dtype=DataType.VARCHAR, max_length=64000),
    FieldSchema(name='embedding', dtype=DataType.FLOAT_VECTOR, dim=DIMENSION)
]
schema = CollectionSchema(fields=fields)
collection = Collection(name=COLLECTION_NAME, schema=schema)
# Create the index on the collection and load it.
collection.create_index(field_name="embedding", index_params=INDEX_PARAM)
collection.load()
# print(list_datasets())

# datasets download book_titles_and_descriptions_en_clean
config.HF_DATASETS_CACHE = "C:/Users/noel vincent/"

# Download the dataset and only use the `train` portion (file is around 800Mb)
dataset = load_dataset('Skelebor/book_titles_and_descriptions_en_clean', split='train')

# Simple function that converts the texts to embeddings
def embed(texts):
    embeddings = openai.Embedding.create(
        input=texts,
        engine=OPENAI_ENGINE
    )
    return [x['embedding'] for x in embeddings['data']]

data = [
    [], # title
    [], # description
]

# Embed and insert in batches
for i in tqdm(range(0, 10000)):
    data[0].append(dataset[i]['title'])
    data[1].append(dataset[i]['description'])
    if len(data[0]) % BATCH_SIZE == 0:
        data.append(embed(data[1]))
        collection.insert(data)
        data = [[],[]]

# Embed and insert the remainder 
if len(data[0]) != 0:
    data.append(embed(data[1]))
    collection.insert(data)
    data = [[],[]]
