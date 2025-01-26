import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { BrainIcon } from "../icons/BrainIcon";

export const SideBar = () => {
    return <div className="h-screen w-72 bg-white border-r-2 border-gray-300 fixed left-0 top-0 p-4 ">
        <div className="flex items-center text-2xl py-2 cursor-pointer mb-8 ">
            <div className="pr-2">
                <BrainIcon/>
            </div>
            Second Brain
        </div>
        <div className="flex items-center py-1 hover:bg-gray-300 rounded-md transition-colors duration-300 cursor-pointer">
            <div className="pr-2">
                <TwitterIcon/>
            </div>
            Twitter
        </div>
        <div className="flex items-center py-1 hover:bg-gray-300 rounded-md transition-colors duration-300 cursor-pointer">
            <div className="pr-2">
                <YoutubeIcon/>
            </div>
            Youtube
        </div>
    </div> 
}