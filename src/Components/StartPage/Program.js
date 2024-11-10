import { Earth, SquarePen, Users } from 'lucide-react'
import React from 'react'

function Program() {
  return (
    <div className='mt-[100px]'>
      <div className='flex justify-center items-center'>
        <h1 className='font-medium text-3xl'> Our Programs</h1>
      </div>
      <div className='flex justify-center gap-[100px] mt-[50px] '>
        <div className='w-[350px] p-[25px] rounded-md shadow-md hover:shadow-blue-700'>
            <div className='border border-blue-700 h-[45px] w-[45px] flex justify-center items-center text-blue-700 rounded-lg'><Users/></div>
            <p className=' text-[20px] mt-2'>Collaboration</p>
            <p className='text-gray-500  mt-2'>IIT Alumni Centre, Bengaluru is actively working on mentoring initiatives bringing in the vast expertise of IIT alumni worldwide for the benefit of other alumni.</p>
        </div>
        <div className='w-[350px] p-[25px] rounded-md shadow-md hover:shadow-blue-700'>
            <div className='border border-blue-700 h-[45px] w-[45px] flex justify-center items-center text-blue-700 rounded-lg'><SquarePen/></div>
            <p className=' text-[20px] mt-2'>Mentoring</p>
            <p className='text-gray-500  mt-2'>IIT Alumni Centre, Bengaluru is actively working on mentoring initiatives bringing in the vast expertise of IIT alumni worldwide for the benefit of other alumni.</p>
        </div>
        <div className='w-[350px] p-[25px] rounded-md shadow-md hover:shadow-blue-700'> 
            <div className='border border-blue-700 h-[45px] w-[45px] flex justify-center items-center text-blue-700 rounded-lg'><Earth/></div>
            <p className='text-[20px] mt-2'>Networking</p>
            <p className='text-gray-500  mt-2'>IIT Alumni Centre, Bengaluru arranges various events and programmes to enable alumni and faculty to meet, network and discover mutual interests and partnerships.</p>
        </div>
      </div>
    </div>
  )
}

export default Program
