import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";


interface CreateContentModelProps {
    open: boolean,
    onClose: () => void
}

export const CreateContentModel = ({ open, onClose }: CreateContentModelProps) => {
    return <div>
        {open && <div className="h-screen w-screen bg-slate-500 fixed left-0 top-0 opacity-60 backdrop-blur-lg flex justify-center ">
            <div className="flex flex-col justify-center">
                <span className="bg-white opacity-100 p-4 rounded ">
                    <div className="text-black flex justify-end" onClick={onClose}>
                        <CrossIcon size='lg' />
                    </div>
                    <div>
                        <Input placeholder={'Title'}/>
                        <Input placeholder={'Link'}/>
                    </div>
                    <div className="flex justify-center">
                        <Button variant="primary" size='md' text='Done' />
                    </div>
                </span>
            </div>
        </div>}
    </div>
}

