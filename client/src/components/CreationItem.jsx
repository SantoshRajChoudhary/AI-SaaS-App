import React, { useState } from 'react'
import Markdown from 'react-markdown';

function CreationItem({item}) {
    const [ expanded, setExpanded ] = useState();
  return (
    <div onClick={() => setExpanded(!expanded)} className='p-4 max-w-5xl border border-gray-300 rounded-lg bg-white text-sm cursor-pointer max-h-100 items-center overflow-auto'>
        <div className='flex justify-between items-center gap-4'>
                <div>
                    <h2>{item.prompt}</h2>
                    <p className='text-gray-400'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>
                </div>
                <button className='bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] rounded-full px-3 py-1'>{item.type}</button>
        </div>
        { expanded && (
            <div    >
                {
                    item.type === 'image'? (
                        <img src={item.content} alt="image" className='w-1/2 max-w-md mt-3 mx-auto' />
                    ): (
                        <div className='h-full overflow-y-scroll mt-3 text-sm text-slate-700 mx-3'>
                            <div className='reset-tw'>
                                <Markdown>{item.content}</Markdown>
                            </div>
                        </div>
                    )
                }
            </div>
        )
        }
    </div>
  )
}

export default CreationItem