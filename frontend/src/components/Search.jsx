import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import SearchResults from './SearchResults';
import axios from 'axios';
import Loader from './Loader';
function Search(props) {
    const [text,setText]=useState('');
    const [data,setData]=useState(null);
    const [limit,setLimit]=useState(5);
    const [isLoading,setIsLoading]=useState(false);
    const  handleSearch=async ()=>{
        setIsLoading(true);
        try {
            const res=await axios.get(`http://127.0.0.1:8000/search/${text}/${limit}`,{
                withCredentials: false,
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Credentials": true,
                },
              })
              console.log("response of dog ", res.data);
              setData(res.data.results);
              setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }
    return (
        <div className='w-full flex flex-col gap-3 justify-center items-center'>
            <div className='w-full h-20 flex justify-center items-center gap-2'>
                <TextField id="outlined-basic" label="Query" variant="outlined" style={{width:'70%',borderRadius:'5px'}} onChange={(e)=>setText(e.target.value)}/>
                <div className='w-40 h-[70%] flex justify-center items-center rounded-md cursor-pointer'>
                    <TextField label="Query-Limit"  variant="outlined" type='number' onChange={(e)=>setLimit(e.target.value)} style={{color:'black'}} value={limit}></TextField>
                </div>
                <div className='w-20 h-[70%] flex justify-center items-center bg-black rounded-md cursor-pointer' onClick={handleSearch}>
                    <SearchIcon style={{color:'white',background:'black'}}></SearchIcon>
                </div>
            </div>
            <div className='w-full flex text-2xl justify-center items-center font-bold'>
                Search Results
            </div>
            <div className='w-[85%] shadow-md'>
                {data!=null && data.length>=0 && !isLoading &&<SearchResults data={data}></SearchResults>}
                {(data==null || data.length<=0) && !isLoading && <div className='w-full flex text-2xl text-gray-400 justify-center items-center font-bold p-5'>No Results Found</div>}
                {isLoading && <div className='w-full flex text-2xl text-gray-400 justify-center items-center font-bold p-5'><Loader></Loader></div>}
            </div>
        </div>
    );
}

export default Search;