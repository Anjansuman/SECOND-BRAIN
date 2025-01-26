import { Input } from "../Components/ui/Input";
import { Button } from "../Components/ui/Button";

export const Signin = () => {
    return <div className="h-screen w-screen flex justify-center items-center bg-[#ebebeb] ">
        <div>
            <div className="border rounded-md p-8 bg-white ">
                <div>
                    <Input placeholder={"Username"} />
                    <Input placeholder={"Password"} />
                    <div>
                        <Button variant='primary' size='md' text='Sign-in' fullWidth={true} />
                    </div>
                </div>
            </div>
        </div>
    </div>
}