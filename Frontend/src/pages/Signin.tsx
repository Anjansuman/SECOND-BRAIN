import { Input } from "../Components/ui/Input";
import { Button } from "../Components/ui/Button";
import axios from "axios";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        console.log(username);
        const password = passwordRef.current?.value;
        console.log(password);

        const response = await axios.post(BACKEND_URL + '/api/v1/signin', {
            username,
            password
        });
        const jwt = response.data.token;
        // this sets jwt into the local storage of chrome
        localStorage.setItem("token", jwt);
        navigate("/dashboard");
    }

    return <div className="h-screen w-screen flex justify-center items-center bg-[#ebebeb] ">
        <div>
            <div className="border rounded-md p-8 bg-white ">
                <div>
                    <Input inputRef={usernameRef} placeholder={"Username"} />
                    <Input inputRef={passwordRef} placeholder={"Password"} />
                    <div>
                        <Button onClick={signin} variant='primary' size='md' text='Sign-in' fullWidth={true} />
                    </div>
                </div>
            </div>
        </div>
    </div>
}