import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import { Eraser, FileText, Hash, House, Scissors, SquarePen, Users, Image, LogOut} from 'lucide-react';

import { NavLink } from 'react-router-dom';

const navItems = [
  {to:'/ai', label:'Dashboard', Icon: House },
  {to:'/ai/write-article', label:'Write Article', Icon: SquarePen },
  {to:'/ai/blog-titles', label:'Blog Titles', Icon: Hash },
  {to:'/ai/generate-images', label:'Generate Images', Icon: Image },
  {to:'/ai/remove-background', label:'Remove Background', Icon: Eraser },
  {to:'/ai/remove-object', label:'Remove Object', Icon: Scissors },
  {to:'/ai/review-resume', label:'Review Resume', Icon: FileText },
  {to:'/ai/community', label:'Community', Icon: Users },    
]


const Sidebar = ({sidebar, setSidebar}) => {
    const { user } = useUser();
    const { signOut, openUserProfile} = useClerk();
    
  return (
    <div className={`z-[100] w-50 overflow-y-scroll sm:w-60 border-r border-gray-200 flex flex-col justify-between items-center max-sm:fixed top-16 bottom-0 ${sidebar? 'translate-x-0': 'max-sm:-translate-x-full'} transition-transform duration-300 ease-in-out bg-white`}>
        <div className='my-7 w-full'>
            <img src={user.imageUrl} alt="user avatar" className='w-13 h-13 rounded-full mx-auto' />
            <h1 className='text-center mt-1'>{user.fullName}</h1>
            <div className='px-6 mt-5 text-sm font-medium text-gray-600'>
            { navItems.map(({to, label, Icon}) => (
                <NavLink key={to} to={to} end={to === '/ai'} onClick={()=> setSidebar(false)} className={({isActive}) => `px-3.5 py-3 flex gap-3 rounded items-center ${isActive? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white': ''}`}>
                    <Icon className='w-4 h-4'/>
                    {label}                    
                </NavLink>
            ))}
            </div>
        </div>
        <div className='border-t border-gray-200 w-full flex items-center justify-between p-3 px-7'>
              <div onClick={openUserProfile} className='flex gap-3 items-center cursor-pointer'>
                <img src={user.imageUrl} alt="image" className='w-8  h-8 rounded-full' />
                <div>
                  <h1 className='font-medium'>{user.fullName}</h1>
                  <p className='text-xs text-gray-500'>
                      <Protect plan='premium' fallback='free'>Premium </Protect>
                      Plan
                  </p>
              </div>
            </div>
            <LogOut onClick={signOut} className='text-gray-400 hover:text-gray-600 w-5 transition cursor-pointer' />
        </div>
    </div>
  )
}

export default Sidebar