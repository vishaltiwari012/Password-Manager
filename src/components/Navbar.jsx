import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-700 text-white'>
        <div className="my-container flex justify-around items-center px-4 py-5 h-14">

        <div className="logo font-bold text-white text-2xl">
            <span className='text-blue-700'>&lt;</span>
            <span>Pass</span><span className='text-blue-700'>OP/&gt;</span>
        </div>

        {/* <ul>
            <li className='flex gap-6'>
                <a href="/" className='hover:text-blue-300'>Home</a>
                <a href="#" className='hover:text-blue-300'>About</a>
                <a href="#" className='hover:text-blue-300'>Contact</a>
            </li>
        </ul> */}
        <button className='text-white ring-white ring-1 bg-green-700 my-5 mx-2 rounded-full flex justify-between items-center'>
            <img className='invert w-10 p-1' src="icons/github.svg" alt="github" />
            <span className="font-bold px-2"><a href="">Github</a></span>
            
        </button>
        </div>
    </nav>
  )
}

export default Navbar;
