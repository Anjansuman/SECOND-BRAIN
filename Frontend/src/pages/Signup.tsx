import { Input } from "../Components/ui/Input";
import { Button } from "../Components/ui/Button";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Signup = () => {

    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    async function signup() {
        const username = usernameRef.current?.value;
        console.log(username);
        const password = passwordRef.current?.value;
        console.log(password);

        await axios.post(BACKEND_URL + '/api/v1/signup', {
            username,
            password
        });
        alert("You have signed up");
    }

    return <div className="h-screen w-screen flex justify-center items-center bg-[#ebebeb] ">
        <div>
            <div className="border rounded-md p-8 bg-white ">
                <div>
                    <Input inputRef={usernameRef} placeholder={"Username"} />
                    <Input inputRef={passwordRef} placeholder={"Password"} />
                    <div>
                        <Button onClick={signup} variant='primary' size='md' text='Sign-up' fullWidth={true} />
                    </div>
                </div>
            </div>
        </div>
    </div>
}