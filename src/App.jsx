
import './App.css'
import { useCallback, useEffect, useRef, useState } from 'react'

function App() {

  const [length, setLength] = useState(3);
  const[numberAllowed, setNumber] = useState(false);
  const[charAllowed, setCharacter] = useState(false);
  const[password, setPassword] = useState("");
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str +="!@#$%^&*(){}[]'"
    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
   setPassword(pass)
  },[length,numberAllowed,charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length,numberAllowed,charAllowed, passwordGenerator])
  
  const copy = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])
  return (
    <>
    <div className='w-full flex justify-center items-center flex-col'>
      <h1 className='font-bold text-lg'>Password Generator</h1>
      <div className='accent-blue-600 w-full max-w-md max-auto shadow-md rounded-lg py-2 px-4 my-8 text-black bg-gray-300'>
    <div className='flex shadow rounded-lg overflow-hidden mb-4 bg-slate-400'>
      <input type="text" 
      value={password} 
      className='outline-none w-96 rounded-sm bg-slate-100 border-sky-100 border-solid border-4' 
      readOnly 
      ref={passwordRef}
      placeholder='password'/>
      <button className='outline-none p-2 bg-blue-700 text-white active:scale-95' 
      onClick={copy}>copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
      <input type="range" 
      min={6} 
      max={100} 
      value={length} 
      className='cursor-pointer' 
      onChange={(e)=>setLength(e.target.value)}/>
      <label>Length :{length}</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={numberAllowed}
        id='numberInput'
        onChange={()=>{
          setNumber((prev)=>!prev)
        }}/>
      </div>
      <label htmlFor="numberInput">Number</label>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={charAllowed}
        id='charInput'
        onChange={()=>{
          setCharacter((prev)=>!prev)
        }}/>
      </div>
      <label htmlFor="charInput">Character</label>
      
    </div>
   </div>
   </div>
    </>
  )
}

export default App
