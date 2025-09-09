import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';

function Hero() {
  const navigate = useNavigate();
  return (
    <div className='px-4 sm:px-20 w-full xl:px-32 inline-flex flex-col gap-6 justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen transition-all duration-1000 ease-in-out'>
        <div className='max-w-[1240px] mx-auto text-center gap-4'>
            <h1 className='mx-auto lg:text-7xl md:text-5xl sm:text-4xl text-3xl font-bold leading-[1.2]'>Create amazing content <br />with <span className='text-primary'>AI tools</span></h1>
            <p className='mt-4 max-w-xs md:max-w-md lg:max-w-xl m-auto max-sm:text-xs max-md:text-sm max-lg:text-md  text-gray-600'>Transform your content creation with our suite of premium Ai tools. Write articles, generate images, and enhance your workflow.</p>
        </div>
        <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
          <button onClick={() => navigate('/ai')} className='rounded-lg border-gray-300 bg-primary text-white px-2 py-1 sm:px-7 sm:py-2.5 md:px-9 cursor-pointer  hover:scale-102 active:scale-95 transition'>Start creating now</button>
          <button className='rounded-lg border-gray-300 bg-white text-black px-2 sm:px-7 sm:py-2.5 md:px-9 cursor-pointer  hover:scale-102 active:scale-95 transition'>Watch demo</button>
        </div>
        <div className='flex items-center gap-4 mx-auto text-gray-600 mt-2'>
          <img src={assets.user_group} alt="/" className='sm:h-8 md:h-10 h-5' /> Trusted by 10K+ people
        </div>
        
    </div>
  )
}

export default Hero