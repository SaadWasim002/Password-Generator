import { useState , useCallback ,useEffect , useRef} from 'react'


function App() {
  const [length , setLength] = useState(8);
  const [numberAllowed , setNumberAllowed] = useState(false);
  const [charAllowed , setCharAllowed] = useState(false);
  const [password , setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed)
        s += "0123456789";
    if(charAllowed)
        s += "!@#$%^&*()_+=-";
    for(let i = 1 ; i <= length ; i++){
      let char = Math.floor(Math.random() * s.length + 1);
      pass += s.charAt(char)
    }
    setPassword(pass);
  },[length , numberAllowed , charAllowed , setPassword ])



  const generateNew = ()=>{
    console.log("clicked");
    passwordGenerator();
  }


  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0 , 100);
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(() => {
    passwordGenerator()
  } , [length , numberAllowed , charAllowed , passwordGenerator])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-60 text-orange-500 bg-gray-700 '>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
        value = {password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button onClick={copyToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-800'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
           type="range"
           min ={6}
           max = {100}
           value = {length}
           className='cursor-pointer' 
           onChange={(e) => {
            setLength(e.target.value)
           }}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
           type="checkbox" 
           defaultChecked = {numberAllowed}
           id = "numberAllower"
           onChange={() => {
            setNumberAllowed((prev) => !prev);
           }}
          />
          <label htmlFor="numberAllower">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
           type="checkbox" 
           defaultChecked = {charAllowed}
           id = "charAllowed"
           onChange={() => {
            setCharAllowed((prev) => !prev);
           }}
          />
          <label htmlFor="charAllowed">Characters</label>
        </div>
      </div>
      <div className='flex  overflow-hidden mb-4 justify-center py-5'>
      <button onClick={generateNew} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Generate New</button>
      </div>
    </div>
    </>
  )
}

export default App
