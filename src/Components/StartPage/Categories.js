import React from 'react'
import Reactpic from "../Assets/physics.png"
import nodejs from "../Assets/nodejs.png"
import typescript from "../Assets/typescript.png"
import internet from "../Assets/internet.png"
import security from "../Assets/cyber-security.png"
import cad from "../Assets/cad-file.png"
import blockchain from "../Assets/blockchain.png"
import app from "../Assets/app.png"
import { Asterisk } from 'lucide-react'

function Categories() {
  return (
    <div>
      <div className='flex justify-center items-center mt-[100px]'>
        <p className='font-medium text-3xl'>Our Categories</p>
      </div>
      <div>
        <div className='flex justify-center mt-[50px] gap-[100px]'>
            <div className='w-[300px]'>
                <div className=' rounded-lg h-[40px] w-[40px] justify-center flex items-center'>
                    <img className='h-[30px]' src={Reactpic}></img>
                </div>
                <p className='font-medium mt-2'>React Development</p>
                <p className=' text-gray-500 mt-2'>Specializes in creating dynamic and responsive user interfaces using React. Focuses on building reusable components and optimizing performance to deliver seamless user experiences in modern web applications.</p>
            </div>
            <div className='w-[300px]'>
                <div className=' rounded-lg h-[40px] w-[40px] justify-center flex items-center '>
                    <img className='h-[30px]' src={nodejs}></img>
                </div>
                <p className='font-medium mt-2'>Node.js</p>
                <p className='font- text-gray-500'>Expertise in building scalable server-side applications using Node.js. Involved in API development, real-time applications, and efficient handling of asynchronous operations, with a focus on performance and security.</p>
            </div>
            <div className='w-[300px]'>
                <div className=' rounded-lg h-[40px] w-[40px] justify-center flex items-center '>
                    <img className='h-[30px]' src={typescript}></img>
                </div>
                <p className='font-medium mt-2'>TypeScript</p>
                    <p className='font- text-gray-500'>Skilled in TypeScript, with a focus on developing robust and maintainable codebases for both frontend and backend applications. Emphasizes type safety and scalability in software development.</p>
            </div>
        </div>
        <div className='flex justify-center gap-[100px] mt-[50px]'>
            <div className='w-[300px]'>
                <div className=' rounded-lg h-[40px] w-[40px] justify-center flex items-center '>
                    <img className='h-[30px]' src={security}></img>
                </div>
                <p className='font-medium mt-2'>Cybersecurity</p>
                    <p className='font- text-gray-500'>Passionate about cybersecurity, with a focus on protecting applications from vulnerabilities and threats. Implements secure coding practices, conducts regular security audits, and stays updated on the latest security trends.</p>
            </div>
            <div className='w-[300px]'>
                <div className=' rounded-lg h-[40px] w-[40px] justify-center flex items-center '>
                    <img className='h-[30px]' src={app}></img>
                </div>
                <p className='font-medium mt-2'>App Development</p>
                    <p className=' text-gray-500 mt-2'>Specializes in designing and building mobile and web applications with a focus on user experience and functionality. Ensures that apps are reliable, performant, and tailored to meet the needs of end-users.</p>
            </div>
            <div className='w-[300px]'>
                <div className=' rounded-lg h-[40px] w-[40px] justify-center flex items-center '>
                    <img className='h-[30px]' src={cad}></img>
                </div>
                <p className='font-medium mt-2'>CAD</p>
                    <p className=' text-gray-500 mt-2'>Experienced in working with CAD files to create platforms that facilitate the sharing and management of engineering designs. Bridges the gap between engineering and software development, ensuring precision and efficiency in CAD-related projects.</p>
            </div>
        </div>
        <div className='flex justify-center gap-[100px] mt-[50px]'>
            <div className='w-[300px]'>
                <div className=' rounded-lg h-[40px] w-[40px] justify-center flex items-center '>
                    <img className='h-[30px]' src={internet}></img>
                </div>
                <p className='font-medium mt-2'>Web Development</p>
                    <p className=' text-gray-500 mt-2'>Proficient in creating responsive and user-friendly websites using the latest technologies and best practices. Dedicated to delivering engaging web experiences optimized for performance and accessibility across all devices.</p>
            </div>
            <div className='w-[300px]'>
                <div className=' rounded-lg h-[40px] w-[40px] justify-center flex items-center '>
                    <img className='h-[30px]' src={blockchain}></img>
                </div>
                <p className='font-medium mt-2'>Blockchain</p>
                    <p className=' text-gray-500 mt-2'>Enthusiast in decentralized technologies, working on implementing smart contracts and developing decentralized applications (dApps). Dedicated to exploring the potential of blockchain to create secure and transparent systems.</p>
            </div>
            <div className='w-[300px]'>
                <div className=' rounded-lg h-[40px] w-[40px] justify-center flex items-center '>
                    <Asterisk color='blue'/>
                </div>
                <p className='font-medium mt-2'>Others</p>
                    <p className=' text-gray-500 mt-2'>Enthusiast in decentralized technologies, working on implementing smart contracts and developing decentralized applications (dApps). Dedicated to exploring the potential of blockchain to create secure and transparent systems.</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Categories
