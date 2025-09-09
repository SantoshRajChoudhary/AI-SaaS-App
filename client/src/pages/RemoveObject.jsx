import { Sparkles, Scissors, Download } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function RemoveObject() {

  const [ input, setInput ] = useState('');
  const [ object, setObject ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ content, setContent ] = useState('');
  const [downloadUrl, setDownloadUrl] = useState(''); // New state variable

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {

        if(object.split(',').length > 1) {
          return toast('Please enter only one object name.')
        }
        const formData = new FormData();
        formData.append('image', input);
        formData.append('object', object);

        const { data } = await axios.post('/api/ai/remove-image-object', formData, {
          headers: {Authorization: `Bearer ${await getToken()}`}
        });
        if(data.success) {
          setContent(data.content);
          setDownloadUrl(data.downloadUrl);
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
            <Sparkles className='w-6 text-[#4a7aff]' />
            <h1 className='text-xl font-semibold'>Object Removal</h1>
          </div>
          <p className='mt-6 text-sm font-medium'>Upload image</p>
        <input 
              onChange={(e)=> setInput(e.target.files[0])}
              type="file" 
              accept='image/*'
              className='w-full outline-none p-2 px-3 text-sm border border-gray-300 text-gray-600 mt-2 rounded-md cursor-pointer' 
              required/>
          <p className='mt-6 text-sm font-medium'>Describe object name to remove</p>
          <textarea 
          onChange={(e)=> setObject(e.target.value)}
          value={object}
          rows={4}
          type="text" 
          className='w-full border border-gray-200 p-2 rounded-md mt-2 text-sm outline-none' 
          placeholder='e.g., watch or spoon, only signle object name..' required>
          </textarea>
          <p className='mt-1 text-xs font-extralight'>Be specific about what you want to remove</p>

          <button 
          disabled={loading}
          className='mt-6 flex gap-3 w-full bg-gradient-to-r from-[#417df6] to-[#8d38eb] rounded-lg p-2 justify-center items-center text-white cursor-pointer text-sm'>
              {loading?  <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'>
              </span>: <Scissors className='w-5'/>}
              <p>Remove Object</p>
          </button>
          
      </form>

      {/**Right column */}
        <div className='w-full max-w-xl border border-gray-200 rounded-lg bg-white p-5 min-h-96 max-h-[600px] flex flex-col'>
            <div className='flex items-center gap-1'>
              <Scissors className='w-5 h-5 text-[#4a7aff]' />
              <h1 className='text-xl font-semibold'>Processed Image</h1>
            </div>
             {!content ? (
                <div className='flex-1 flex justify-center items-center'>
                  <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                  <Scissors className='w-10 h-10' />
                  <p>Upload an image and click "Remove object" to get started</p>
                  </div>
                </div>
            ): (
              <div className='relative mt-3 h-full'>
                    <a
                    href={downloadUrl} 
                    download 
                    className="absolute top-2 right-2 bg-white border rounded px-2 py-1 text-xs shadow hover:bg-gray-100"
                    >
                    <Download className='w-3 h-4' />
                    </a>
                    <img src={content} alt='image' className='w-full max-h-[400px] object-contain' />
                </div>
            )}
        </div>
    </div>
  )
}

export default RemoveObject