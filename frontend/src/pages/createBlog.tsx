import { useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function CreateBlog (){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    return (<>
    < Appbar />
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full" >
            <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Title" />

            <div className="mt-2 ">
                <div className="w-full mb-4 ">
                    <div className="flex items-center justify-between border">
                        <div className="my-2 bg-white rounded-b-lg w-full">
                            <label className="sr-only">Publish post</label>
                            <textarea onChange={(e) => {
                                    setDescription(e.target.value)
                                }} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..." required />
                        </div>
                    </div>
                </div>
            </div> 
            <button className ="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800" onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/book`, {
                        title,
                        content: description
                    }, {
                        headers: {
                            Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlZWU5NzQ3LWMwMDctNDQ5OC04MmE3LWJmN2UxOWU4OTU2YSJ9.dBz35_PQHQcjGfG10itik6seLrfpOtJUqYsRSkYr6mE"
                        }
                    });
                    navigate(`/blog/${response.data.id}`)
                }} type="submit">Publish Post</button>  
            </div>
           
            
        </div>
        
    </>);
}