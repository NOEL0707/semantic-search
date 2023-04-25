import React, { useState } from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import Loader from './Loader';
function Insert(props) {
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [isLoading,setIsLoading]=useState(false);

    const handleEdit=async ()=>{
        setIsLoading(true);
        try {
            const res=await  axios
            .post(`http://127.0.0.1:8000/insert`,{'title':title,'description':description},{
              withCredentials: false,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
              }
            });
            setIsLoading(false);
            window.location.reload();
            alert('Successfully Inserted');   

        } catch (error) {
         console.log(error);
         setIsLoading(false);
         alert('Insertion Failed');   
        }
    }
    return (
        <div className='w-full flex justify-center items-center'>
            {!isLoading && <div className='w-[80%] flex flex-col justify-center items-center shadow-md p-2 gap-4 rounded-md'>
                <div className='w-full flex justify-center items-center text-xl font-bold'>
                    Insert a Book
                </div>
                <div className='w-full flex flex-col justify-center items-center gap-2'>
                    <div className='w-full flex justify-start items-center text-gray-400 font-bold '>Title</div>
                    <div className='w-full flex justify-center items-start rounded-md shadow-md p-2 bg-gray-50'>
                        <TextareaAutosize
                            maxRows={4}
                            aria-label="maximum height"
                            placeholder="Enter the title of book"
                            defaultValue={title}
                            onChange={(e)=>{setTitle(e.target.value)}}
                            style={{ width: '100%',padding:'4px'}}
                        />
                    </div>

                </div>
                <div className='w-full flex flex-col justify-center items-center gap-2'>
                    <div className='w-full flex justify-start items-center text-gray-400 font-bold p-2'>Description</div>
                        <div className='w-full flex justify-center items-start rounded-md shadow-md p-2 bg-gray-50'>
                            <TextareaAutosize
                                maxRows={4}
                                aria-label="maximum height"
                                placeholder="Enter the description of book"
                                defaultValue={description}
                                onChange={(e)=>{setDescription(e.target.value)}}
                                style={{ width: '100%',padding:'4px'}}

                            />
                        </div>
                </div>
                <div className='w-full flex justify-center items-center'>
                    <Button variant='filled' style={{background:'black',color:'white'}} onClick={handleEdit}>Insert</Button>
                </div>
            </div>}
            {isLoading && <Loader></Loader>}
            
        </div>
    );
}

export default Insert;