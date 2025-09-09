import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'


function Navbar() {

    const navigate = useNavigate();
    const { user } = useUser();
    const { openSignIn } = useClerk();

  return (
    <div className='absolute z-5 w-full py-3 px-4 sm:px-20 md:px-30 flex justify-between bg-transparent'>
        <img src={assets.logo1} alt="logo" className='w-32 sm:w-50 h-8 cursor-pointer' onClick={() => navigate('/')} />

        { user? <UserButton />
          :
          (<button onClick={openSignIn} className='flex items-center gap-3 rounded-full bg-primary text-white px-5 py-1 sm:px-10 sm:py-2.5 cursor-pointer text-sm'>Get started<ArrowRight className='w-4 h-4' /></button>)
        }
        
    </div>
  )
}

export default Navbar