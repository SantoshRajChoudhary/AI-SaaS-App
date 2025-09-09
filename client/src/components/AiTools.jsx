import { useNavigate } from "react-router-dom"
import { AiToolsData } from "../assets/assets"
import { useUser } from "@clerk/clerk-react";


function AiTools() {
    const navigate = useNavigate();
    const {user} = useUser();
  return (
    <div className='py-20 flex flex-col gap-3 items-center '>
        <div className='text-center'>
            <h1 className='mx-auto md:text-5xl sm:text-4xl text-3xl font-semibold text-slate-700'>Powerful AI Tools</h1>
            <p className='mt-4 sm:max-w-xl max-w-xs mx-auto text-sm sm:text-base text-gray-500'>Everything you need to create, enhance and optimize your content with cutting-edge AI technology.</p>
        </div>
        <div className='flex flex-wrap justify-center'>
            <div className="px-20 py-10 md:px-20 md:py-20 flex flex-col justify-center md:grid lg:grid-cols-3 md:grid-cols-2 gap-6 md:gap-8">
                {AiToolsData.map((tool, idx) => (
                    <div key={idx} className="p-8 flex flex-col gap-2 rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 transition duration-300 cursor-pointer max-w-xs" onClick={() => user && navigate(tool.path) }>
                                <tool.Icon className='w-12 h-12 p-2 text-white rounded-xl' style={{background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`}}/>
                                <h1 className="mt-4 mb-1 font-semibold text-lg">{tool.title}</h1>
                                <p className="text-sm text-gray-500 max-w-[95%]">{tool.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default AiTools