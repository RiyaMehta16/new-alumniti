import { Github, Linkedin, Mail, Rocket } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <div className='h-[250px] mt-[150px]'>
    <div className='bg-zinc-200 h-[1px] w-full' ></div>
      <div className='bg-white'>
        
        <div className='flex flex-col justify-center items-center mt-[100px]'>
            <p className='text-black font-medium text-lg'>Alumनीति</p>
            <div className='flex mt-3 gap-6'>
              <div>
                <Github size={20} color='red'/>
              </div>
              <div>
                <Linkedin size={20} color='blue'/>
              </div>
              <div>
                <Mail size={20} color='red'/>
              </div>
            </div>
        </div>
        <div className='mt-12 flex justify-end'>
          Built by Yogesh, Amandeep, Manjeet, Nikhil, Riya..!
        </div>
      </div>
    </div>
  )
}

export default Footer
