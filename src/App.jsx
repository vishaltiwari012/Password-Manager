import './App.css'
import Manager from './components/Manager'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <Navbar/>
      <div className='min-h-[86vh] bg-blue-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),
            linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] 
            bg-[size:14px_24px]"
            '>
      <Manager/>
      </div>
      <Toaster/>
      <Footer/>
    </>
  )
}

export default App
