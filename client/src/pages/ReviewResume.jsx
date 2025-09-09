import { Sparkles, FileText } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


function ReviewResume() {
  const [ input, setInput ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ content, setContent ] = useState('');
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
          const formData = new FormData();
          formData.append('resume', input);

          const { data } = await axios.post('/api/ai/resume-review', formData, {
            headers: {Authorization: `Bearer ${await getToken()}`}
          });

          if(data.success) {
            setContent(data.content);
          } else {
          toast.error(data.message);
        }
      } catch (error) {
          toast.error(error.message);
      }
      setLoading(false);
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex flex-wrap gap-5 items-start text-slate-700 transition-all duration-500 ease-in-out'>
      {/**Left column */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-5 bg-white border border-gray-200 rounded-lg'>
          <div className='flex items-center gap-3'>
            <Sparkles className='w-6 text-[#00da83]' />
            <h1 className='text-xl font-semibold'>Resume Review</h1>
          </div>
          <p className='mt-6 text-sm font-medium'>Upload Resume</p>
        <input 
              onChange={(e)=> setInput(e.target.files[0])}
              type="file" 
              accept='application/pdf'
              className='w-full outline-none p-2 px-3 text-sm border border-gray-300 text-gray-600 mt-2 rounded-md cursor-pointer' 
              required/>
          <p className='mt-1 text-xs font-extralight'>Supports PDF, PNG, JPG formats</p>

          <button className='mt-6 flex gap-3 w-full bg-gradient-to-r from-[#00da83] to-[#009bb3] rounded-lg p-2 justify-center items-center text-white cursor-pointer text-sm'>
              {
                  loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'>
                  </span> : <FileText className='w-5'/>
              }
              <p>Review Resume</p>
          </button>
          
      </form>

      {/**Right column */}
        <div className='w-full max-w-xl border border-gray-200 rounded-lg bg-white p-5 min-h-96 max-h-[600px] flex flex-col'>
            <div className='flex items-center gap-1'>
              <FileText className='w-5 h-5 text-[#00da83]' />
              <h1 className='text-xl font-semibold'>Analysis Results</h1>
            </div>
            {!content? ( 
              <div className='flex-1 flex justify-center items-center'>
                <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                  <FileText className='w-10 h-10' />
                  <p>Upload your resume and click "Review Resume" to get started</p>
                </div>
            </div>
            ) : (
              <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
                  <div className='reset-tw'>
                    <Markdown>
                      {content}
                    </Markdown>
                  </div>
              </div>
            )}
        </div>
    </div>
  )
}

export default ReviewResume