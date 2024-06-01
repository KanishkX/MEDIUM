type blogtype = {
    title: string,
    member?: boolean,
    name: string,
    content:string,
    publishDate?: string
}
export function Blogcard ({title,member = false,name,content, publishDate = "2024"}: blogtype){
    return (<>
    <div className="border-b border-slate-300 pb-4 pt-2">
        <div className="flex">
            <div className="flex justify-center flex-col">
                <Initials name = {name} size= {"small"}/>
            </div>
            <div className="font-extralight ">
            {name}
            </div>
            <div className="pl-2 font-thin text-slate-500">
            {publishDate} {member == true? "⭐ Member-ony" : ""}
            </div>
        </div>

        <div className="text-xl font-bold">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100) + "..."}
        </div>
        <div className="text-slate-400">
            {`${ Math.ceil(content.length /100)} minutes`}
        </div>
    </div>
        

    </>)
}
export function Initials({name, size = "small"}: {name: string, size: "small" | "big"}){
    return (<div className={`relative inline-flex items-center justify-center ${size === "small"? "w-6 h-6": "w-10 h-10"} bg-gray-100 rounded-full dark:bg-gray-600 mr-2`}>
    <span className={`${size === "small"?"font-xs" : "font-md"} text-gray-600 dark:text-gray-300`}>{name[0]}</span>
</div>)
}