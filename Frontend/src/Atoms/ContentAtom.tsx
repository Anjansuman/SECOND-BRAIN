import { atom } from "recoil";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const ContentAtom = atom({
    key: "ContentAtom",
    default: axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
            "Authorization": localStorage.getItem("token")
        }
    }).then((response) => {
        return response.data.content;
    })
});




// export function useContent() {
//     const [contents, setContents] = useState([]);


//     useEffect(() => {
//         axios.get(`${BACKEND_URL}/api/v1/content`, {
//             headers: {
//                 "Authorization": localStorage.getItem("token")
//             }
//         }).then((response) => {
//             setContents(response.data.content);
//         })
//     }, []);

//     return contents;
// }