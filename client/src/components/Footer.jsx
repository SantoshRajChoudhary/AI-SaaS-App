import {assets} from '../assets/assets'
import { useLocation, useNavigate } from 'react-router-dom'

function Footer() {
    const navigate = useNavigate();
    const location = useLocation();

    function handleClick() {
        if(location.pathname === '/') {
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
        else {
            navigate('/');
        }
    }
  return (
   <div>
         <div className='grid sm:grid-cols-5 md:grid-cols-9 gap-4 sm:mx-15 mx-10 py-5 border-b border-gray-300'>
        <div className='sm:col-span-4 md:col-span-3 lg:col-span-4 sm:mr-8 max-w-sm'>
            <img src={assets.logo1} alt="logo" className='w-40 h-7 cursor-pointer' onClick={handleClick}/>
            <p className='text-gray-500 text-sm my-5'>
                Experience the power of AI with OneSolution.ai <br />
                Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow.
            </p>
        </div>
        <div className='sm:col-span-1 md:col-span-2'>
           <div>
             <h1 className='font-medium'>Company</h1>
            <ul className='my-5'>
                <li className='text-gray-500 text-sm'>Home</li>
                <li className='text-gray-500 text-sm'>About us</li>
                <li className='text-gray-500 text-sm'>Contact us</li>
                <li className='text-gray-500 text-sm'>Privacy policy</li>
            </ul>
           </div>
        </div>
        <div className='sm:col-span-6 md:col-span-4 lg:col-span-3 sm:text-center'>
            <h1 className='font-medium md:text-justify'>Subscribe to our newletter</h1>
            <p className='text-gray-500 text-sm my-5 md:text-justify'>
                The latest news, articles, and resources, sent to your inbox weekly.
            </p>
            <div className='flex md:justify-start sm:justify-center'>
                <input type="email" className='w-3/5 sm:w-2/3 text-gray-500 rounded-md border border-gray-300 p-1 mr-1 text-md outline-neutral-300' placeholder='Enter your email' />
                <button className='text-white rounded-md border border-gray-300 py-1 px-3 bg-blue-500 cursor-pointer text-sm hover:bg-blue-600' >Subscribe</button>
            </div>
        </div>
    </div>
    <p className='text-gray-500 text-center text-xs m-3'>Copyright 2025 © OneSolution.ai All Right Reserved</p>
   </div>
  )
}

export default Footer