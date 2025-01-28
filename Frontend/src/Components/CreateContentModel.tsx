import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface CreateContentModelProps {
    open: boolean,
    onClose: () => void
}

export const CreateContentModel = ({ open, onClose }: CreateContentModelProps) => {

    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const typeRef = useRef<HTMLInputElement>();

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const type = typeRef.current?.value;

        await axios.post(BACKEND_URL + "/api/v1/content", {
            title,
            link,
            type
            // make a checkbox for type or use an api for fetching logo from website's link, by using second way no type will required to ask, we just need to store the type (name) of the website in the db.
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
        alert("Content added!");
    }

    return <div>
        {open && <div className="h-screen w-screen bg-slate-500 fixed left-0 top-0 opacity-60 backdrop-blur-lg flex justify-center ">
            <div className="flex flex-col justify-center">
                <span className="bg-white opacity-100 p-4 rounded ">
                    <div className="text-black flex justify-end" onClick={onClose}>
                        <CrossIcon size='lg' />
                    </div>
                    <div>
                        <Input inputRef={titleRef} placeholder={'Title'}/>
                        <Input inputRef={linkRef} placeholder={'Link'}/>
                        <Input inputRef={typeRef} placeholder={'youtube only'}/>
                    </div>
                    <div className="flex justify-center">
                        <Button onClick={addContent} variant="primary" size='md' text='Done' />
                    </div>
                </span>
            </div>
        </div>}
    </div>
}

