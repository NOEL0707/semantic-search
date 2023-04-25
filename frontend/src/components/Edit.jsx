import React, { useState } from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import Loader from './Loader';
import { Delete } from '@mui/icons-material';
function Edit(props) {
    const { id } = useParams();
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [isLoading,setIsLoading]=useState(false);
    useEffect(() => {
        setIsLoading(true);
        axios
        .get(`http://127.0.0.1:8000/view/${id}`, {
          withCredentials: false,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        })
        .then((res) => {
            setIsLoading(false);
            setTitle(res.data.results.title);
            setDescription(res.data.results.description);

        }).catch((err)=>{
          console.log(err);
          setIsLoading(false);
        });
    },[]);
    const handleEdit=async ()=>{
        setIsLoading(true);
        try {
            const res=await  axios
            .post(`http://127.0.0.1:8000/update/${id}`,{'title':title,'description':description},{
              withCredentials: false,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
              }
            });
            setIsLoading(false);
            window.location.reload();
        } catch (error) {
         console.log(error);
         setIsLoading(false);
         alert('updatation Failed');
        }
    }
    const handleDelete=async ()=>{
        setIsLoading(true);
        try {
            const res=await  axios
            .get(`http://127.0.0.1:8000/delete/${id}`,{
              withCredentials: false,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
              }
            });
            setIsLoading(false);
            alert('entry Deleted')
            window.location.replace("http://localhost:3000/")
        } catch (error) {
         console.log(error);
         setIsLoading(false);
         alert('Deletion Failed')   
        }
    }
    return (
        <div className='w-full flex justify-center items-center'>
            {!isLoading && <div className='w-[80%] flex flex-col justify-center items-center shadow-md p-2 gap-4 rounded-md'>
                <div className='w-full flex justify-center items-center text-xl font-bold'>
                    Details of book with ID <b className='text-gray-400 p-2'>{id}</b>
                </div>
                <div className='w-full flex flex-col justify-center items-center gap-2'>
                    <div className='w-full flex justify-start items-center text-gray-400 font-bold '>Title</div>
                    <div className='w-full flex justify-center items-start rounded-md shadow-md p-2 bg-gray-50'>
                        <TextareaAutosize
                            maxRows={4}
                            aria-label="maximum height"
                            placeholder="Maximum 4 rows"
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
                                placeholder="Maximum 4 rows"
                                defaultValue={description}
                                onChange={(e)=>{setDescription(e.target.value)}}
                                style={{ width: '100%',padding:'4px'}}

                            />
                        </div>
                </div>
                <div className='w-full flex justify-center items-center'>
                    <Button variant='filled' style={{background:'black',color:'white'}} onClick={handleDelete} endIcon={<Delete></Delete>}>Delete</Button>
                </div>
            </div>}
            {isLoading && <Loader></Loader>}
            
        </div>
    );
}

export default Edit;
