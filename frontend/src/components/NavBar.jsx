import React from 'react';
import "../input.css";
import logo from "../images/logo.png";
import { Link } from 'react-router-dom';
function NavBar(props) {
    return (
        <nav className='w-full gap-4 flex justify-center items-center h-20 box shadow-md  px-8 bg-black '>
            <div className=' h-full flex justify-center items-center gap-2'>
                <img src={logo} alt={"not found"} className=' shadow-lg bg-white' style={{width:"80px",height:"70px",borderRadius:"50%"}}>
                </img>
                <div className='flex justify-center items-center'>
                    <p className='text-2xl text-white font-extrabold'>BookQuest</p>
                </div>
            </div>
            <div className='w-[fit-content] h-full flex justify-center items-center gap-4 '>
                <Link to="/">
                    <button className="flex h-full p-2 justify-center items-center hover:border-b-4">
                        <p className='text-lg text-white'>Search</p>
                    </button>
                </Link>
                <Link to="/insert">
                    <button className="flex h-full p-2 justify-center items-center hover:border-b-4">
                        <p className='text-lg text-white'>Insert</p>
                    </button>
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;
