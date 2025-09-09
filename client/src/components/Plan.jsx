import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {

    return (
        <div className='md:max-w-2xl max-w-sm mx-auto z-20 my-30'>
            <div className='text-center'>
                <h2 className='mx-auto md:text-5xl sm:text-4xl text-3xl font-semibold text-slate-700'>Choose your plan</h2>
                <p className='mt-4 sm:max-w-xl max-w-xs mx-auto text-sm sm:text-base text-gray-500'>Start for free and scale up as you grow. Find the perfect plan for your content creation needs.</p>
            </div>
            <div className='mt-14 max-md:mx-8'> 
                <PricingTable />
            </div>
        </div>
    )
}

export default Plan