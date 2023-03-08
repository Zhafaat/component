import { useEffect } from "react";
import { useState } from "react"

function App() {
  
  const [email, setEmail] = useState('');
  const [allEmail, setAllEmail] = useState([])
  const [date, setDate] = useState('');

  useEffect(() => {

    setDate(new Date())

    const storedEmail = JSON.parse(localStorage.getItem('email'));
    if (storedEmail) {
      setAllEmail(storedEmail);
    }
    // console.log(allEmail)
    
  }, []);

  const handleChange = (event) => {
    setEmail(event.target.value);
  }; 
  
  const handleSubmit = (event) => {
    event.preventDefault();
    allEmail.push(email)
    localStorage.setItem('email', JSON.stringify(allEmail))
    setEmail('');

  }
  

  return (
    <div className="min-h-screen flex flex-col text-white">
      <main className="container mx-auto px-6 pt-16 flex-1 text-center">

        <h2 className="text-2xl md:text-4xl lg:text-6xl uppercase">
          Welcome to
        </h2>

        <h1 className="text-3xl md:text-6xl lg:text-8xl font-black uppercase mb-8">
          MY Coding Project
        </h1>

        <div className="text-lg md:text-2xl lg:text-4xl py-2 px-4 md:py-4 md:px-10 lg:py-6 lg:px-12 bg-white bg-opacity-10 w-fit mx-auto mb-8 rounded-full">
          {date.toString()}
        </div>

        <form onSubmit={handleSubmit}>

          <div className="flex flex-col md:flex-row justify-center mb-4">
            <input 
            placeholder="e.g. ilmuumum18@gmail.com"
            type="email" 
            name="user email"
            value={email}
            className="text-lg md:text-1xl md:w-96 palceholder:text-gray-400 placeholder:italic py-4 px-6 md:px-10 lg:py-6 lg:px-12 bg-white bg-opacity-10 focus:bg-opacity-20 duration-150 rounded-full md:rounded-tr-none md:rounded-br none mb-4 md:mb-8 outline-none"
            onChange={handleChange} />
            
            <input 
            type="submit" 
            value="Join today"
            name="user join"
            className="bg-primary rounded-full md:rounded-tl-none md:rounded-bl-none text-lg md:text-2xl py-4 px-6 md:px-10 lg:py-6 lg:px-12 mb-4 md:mb-8 cursor-pointer hover:opacity-75 duration-150" />

          </div>

          <div className="opacity-75 italic">
            By subscribing, you agree to Join
          </div>
        </form>

        <div className="text-lg md:text-2xl lg:text-3xl py-2 px-4 md:py-4 md:px-10 lg:py-6 lg:px-12 bg-white bg-opacity-10 w-fit mx-auto mt-8 mb-8 rounded-lg">
          Our member:
          {allEmail.map((item, index) => (
            <p className="text-lg md:text-1xl lg:text-1xl py-1 px-2 md:py-3 md:px-9 lg:py-5 lg:px-11" key={index}>{item}</p>
          ))}
        </div>


      </main>

      <footer className="container mx-auto p-6 flex flex-col md:flex-row items-center justify-between">
        <p>Built by Zhafaat Rahimi Zainal</p>

        <div className="flex -mx-6">
          <a href="#" className="mx-3 hover:opacity-80 duration-150">About us</a> |
          <a href="#" className="mx-3 hover:opacity-80 duration-150">Privacy</a> |
          <a href="#" className="mx-3 hover:opacity-80 duration-150">Contact</a>
        </div>

      </footer>
    </div>
  )
}

export default App