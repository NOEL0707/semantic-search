import React from 'react';
import logo from "../images/logo.png";

function Header(props) {
    return (
        <div className='w0full flex flex-col justify-center items-center mt-5'>
            <div className='w-[60%] flex flex-col justify-center items-center'>
                <img src={logo} alt={"not found"} className='bg-white rounded-md' style={{width:"400px",height:"175px"}}>
                </img>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-2xl text-black font-extrabold'>BookQuest</p>
                    <p className='text-lg text-gray-400'>One Stop Destination for Searching Books</p>
                </div>
            </div>
        </div>
    );
}

export default Header;