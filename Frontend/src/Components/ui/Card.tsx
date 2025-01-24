import { BinIcon } from "../../icons/BinIcon";
import { ShareIcon } from "../../icons/ShareIcon";

function convertToEmbedLink(youtubeUrl: string) {
    // Check if the URL contains "youtu.be" or "youtube.com"
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w\-]+)/;
    const match = youtubeUrl.match(regex);
  
    if (match && match[1]) {
      const videoId = match[1]; // Extract the video ID
      return `https://www.youtube.com/embed/${videoId}`;
    } else {
      return "Invalid YouTube URL";
    }
  }

interface cardProps {
    title: string;
    link: string;
    type: "youtube" | "twitter"
}

export const Card = ( props: cardProps ) => {
    return <div className="bg-white border border-gray-300 max-w-80 rounded-md p-3 cursor-pointer">
        <div className="flex justify-between items-center">
            <div className="flex items-center text-md font-medium">
                <div className="flex pr-2 text-gray-500">
                    <BinIcon size='md'/>
                </div>
                {props.title}
            </div>
            <div className="flex">
                <div className="pr-2 text-gray-500">
                    <ShareIcon size='md'/>
                </div>
                <div className="text-gray-500">
                    <BinIcon size='md'/>
                </div>
            </div>
        </div>
        <div className="pt-4">
            <iframe className="w-full rounded-md"src={convertToEmbedLink(props.link)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
    </div>
}