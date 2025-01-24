
import './App.css';
import { useState } from "react";
import { Button } from "./Components/ui/Button";
import { PlusIcon } from './icons/PlusIcon';
import { ShareIcon } from './icons/ShareIcon';
import { Card } from "./Components/ui/Card";
import { CreateContentModel } from './Components/CreateContentModel';
import { SideBar } from './Components/SideBar';

function App() {

  const [modelOpen, setModelOpen] = useState(false);

  return (
    <div className=''>
      <SideBar/>
      <div className='p-4 ml-72 min-h-screen bg-[#ebebeb]'>
        <CreateContentModel open={modelOpen} onClose={() => {setModelOpen(false)}} />

        <div className='flex justify-end gap-4 mb-4'>
          <Button startIcon={<ShareIcon size={'md'}/>} variant={'primary'} size={'md'} text={'Share Brain'} />
          <Button onClick={() => setModelOpen(true)} startIcon={<PlusIcon size={'md'}/>} variant={'secondary'} size={'md'} text={'Add content'}/>
        </div>

        <div className='flex gap-4'>
        <Card type='youtube' title='S8UL' link="https://youtu.be/wEb92MPklis?si=vi6Mgeo9Fhbx93TE" />
        <Card type='youtube' title='S8UL' link="https://youtu.be/wEb92MPklis?si=vi6Mgeo9Fhbx93TE" />
        </div>
      </div>
    </div>
  )
}

export default App
