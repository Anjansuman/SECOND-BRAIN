
import './App.css'
import { Button } from "./Components/ui/Button";
import { PlusIcon } from './icons/PlusIcon';
import { ShareIcon } from './icons/shareIcon';

function App() {

  function colorHandler() {
  }

  return (
    <div className=''>
      <Button startIcon={<ShareIcon size={'md'}/>} variant={'primary'} size={'md'} text={'share'} onClick={colorHandler} />
      <Button startIcon={<PlusIcon size={'md'}/>} variant={'secondary'} size={'md'} text={'Add content'} onClick={colorHandler} />
    </div>
  )
}

export default App
