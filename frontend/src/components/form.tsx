import { useState } from "react"
import { SignupInput } from "@kanishk44/medium-common-kanishk"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {BACKEND_URL} from "../config"

export function Form({type}: {type: "signup" | "signin"}){
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name:"",
        username:"",
        password:""
    });

    async function request(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type == "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token",jwt);
            navigate("/blogs");}
        catch(e){
            alert("Error");
        }
    }

    return(<>
    <div className="flex h-screen justify-center flex-col"> 
        <div className="flex justify-center">
                    <div className="grid grid-cols-1 gap-2 max-w-64">
                        {
                            type == "signup" ? <h1 className="font-bold text-4xl text-center">Create Account</h1> : <h1 className="font-bold text-4xl m-5 text-center">Signin</h1> 
                        }
                        
                        <div className="text-center">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?" }
                            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                                {type === "signin" ? "Sign up" : "Sign in"}
                            </Link>
                        </div>
                        
                        {
                            type == "signup"? 
                            <><div className="font-bold">Name</div>
                            <input type="text" placeholder="Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => {setPostInputs({
                                ...postInputs, name: e.target.value
                            })}}></input></> : null
                        }
                        
                        <div className="font-bold">Email</div>
                        <input type="email" placeholder="xyz@gmail.com" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => {setPostInputs({
                            ...postInputs, username: e.target.value
                        })}}></input>
                        <div className="font-bold">Password</div>
                        <input type="password" placeholder="123456"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => {setPostInputs({
                            ...postInputs, password: e.target.value
                        })}}></input>
                        <button className="text-white bg-black rounded-lg max-w-15 ml-10 mr-10 mt-5 p-1" onClick={request}>{ type == "signup" ? "Sign Up" : "Sign In" }</button>
                    </div>
                </div>
    </div></>) 
}