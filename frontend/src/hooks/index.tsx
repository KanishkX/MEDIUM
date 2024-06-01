import axios from "axios"
import { BACKEND_URL } from "../config"
import { useEffect, useState } from "react"

export interface Blog {
    "title":string
    "author": { "name": string}
    "member"?: boolean
    "content": string
    "publishDate"?: string
}

export function useBlog({id}: { id: string }){
    const [blog, setBlog] = useState<Blog>();
    const [load, setLoad] = useState(true);
    
    useEffect (()=>{
            axios.get(`${BACKEND_URL}/api/v1/book/${id}`, {headers :{Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlZWU5NzQ3LWMwMDctNDQ5OC04MmE3LWJmN2UxOWU4OTU2YSJ9.dBz35_PQHQcjGfG10itik6seLrfpOtJUqYsRSkYr6mE"}} )
            .then(Response =>{
                if(Response.data){
                    setBlog(Response.data);
                }else{
                    console.log(Response.data);
                }
                setLoad(false);})
            .catch(error => {
                console.error("Error fetching blog posts: ", error);
                setLoad(false);
            });
    })
    return {blog, load};
}
export function useBlogs(){
    const [blog, setBlog] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/book/bulk`, 
            {headers: 
            {Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlZWU5NzQ3LWMwMDctNDQ5OC04MmE3LWJmN2UxOWU4OTU2YSJ9.dBz35_PQHQcjGfG10itik6seLrfpOtJUqYsRSkYr6mE"}})
            .then(response => {
                console.log(response);
                if (response.data.posts) {
                    setBlog(response.data.posts);
                } else {
                    console.error("Error: posts key is missing in the response", response.data);
                }
                setLoading(false);
            }).catch(error => {
                console.error("Error fetching blog posts:", error);
                setLoading(false);
            });
        
    },[])
    
    return {blog, loading}
}   