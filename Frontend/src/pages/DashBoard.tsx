
import { useState } from "react";
import { Button } from "../Components/ui/Button";
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { Card } from "../Components/ui/Card";
import { CreateContentModel } from '../Components/CreateContentModel';
import { SideBar } from '../Components/SideBar';
import { useRecoilValue } from "recoil";
import { ContentAtom } from "../Atoms/ContentAtom";

export function DashBoard() {


  const content: { type: "youtube" | "twitter"; title: string; link: string }[] = useRecoilValue(ContentAtom);



  const [modelOpen, setModelOpen] = useState(false);

  return (
    <div className=''>
      <SideBar/>
      <div className='p-4 ml-72 min-h-screen bg-[#ebebeb]'>
        <CreateContentModel open={modelOpen} onClose={() => setModelOpen(false)} />

        <div className='flex justify-end gap-4 mb-4'>
          <Button startIcon={<ShareIcon size={'md'}/>} variant={'primary'} size={'md'} text={'Share Brain'} />
          <Button onClick={() => setModelOpen(true)} startIcon={<PlusIcon size={'md'}/>} variant={'secondary'} size={'md'} text={'Add content'}/>
        </div>

        <div className='flex gap-4'>
          {content.map(({ type, title, link }) => <Card title={title} type={type} link={link} />)}
        </div>
      </div>
    </div>
  )
}

