
import './App.css'
import { Button } from "./Components/ui/Button";

function App() {

  function colorHandler() {
  }

  return (
    <div className='h-80 w-80 bg-blue-300 '>
      <Button variant={'primary'} size={'md'} text={'this good'} onClick={colorHandler} />
    </div>
  )
}

export default App
