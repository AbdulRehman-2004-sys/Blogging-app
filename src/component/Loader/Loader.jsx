import React from 'react'

const Loader = () => {
  return (
    <div className='w-screen h-screen fixed dark:bg-gray-900 top-0 left-0 z-50 flex justify-center items-center'>
      <h1 className='text-5xl text-white  dark:text-white font-bold'>Loading....</h1>
    </div>
  )
}

export default Loader
