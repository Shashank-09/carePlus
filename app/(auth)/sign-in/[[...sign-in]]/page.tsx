import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const SignInPage = () => {
  return (
    <main  className='auth-page'>
        {/* <div className="flex h-screen max-h-screen">
        
        <section className="remove-scrollbar container my-auto">
          <div className="sub-container max-w-[496px]">
            
            
           <SignIn />
            
          </div>
        </section>
        
        <Image
          src="/assets/images/register-img.png"
          width={1000}
          height={1000}
          alt="patient"
          className="side-img max-w-[390px]"
          
        />
      </div> */}
      <SignIn />
     
      

   </main>
  )
}

export default SignInPage