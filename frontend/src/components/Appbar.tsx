import { Initials } from "./blogscard"
import img1 from "../assets/medium1.png"
export function Appbar(){
    return (<>
        <div className="border-b flex justify-between px-10 p-5" >
            {/* <div className="text-xl font-bold">
                Medium
            </div> */}
            <img src={img1} alt="Medium" />
            <div>
               <Initials name="Kanishk" size="big"/>
            </div>
        </div>
    </>)
}