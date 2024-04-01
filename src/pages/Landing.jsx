import React from 'react'

const Landing = () => {
  return (
    <div className='overflow-x-hidden w-screen'>
      <div className="container mx-auto bg-red-400 h-screen">
        <div className='w-[350px] md:w-[500px] lg:w-[800px] mx-auto flex flex-col items-center justify-center h-screen text-center gap-8 relative '>
          <p className="text-sm uppercase font-bold">welcome to</p>
          <h1 className="text-5xl font-alice capitalize text-blackSilent">My dream job</h1>
          <button className="btn btn-sm rounded-full">Start traking your job search</button>
        </div>
      </div>
    </div>
  )
}

export default Landing