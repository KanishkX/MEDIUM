import { Blogcard } from "../components/blogscard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { Skeleton } from "../components/skeleton";
export function Blogs (){
    const {loading, blog} =useBlogs();
    if(loading == true){
        return(<>
            <Appbar />
            <div className="flex justify-center items-center h-screen">
                <div className="max-w-15 flex flex-col justify-center items-center">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            </div>
        </>
            )
    }
    return (<>
        <Appbar />
        <div className="flex justify-center">   
            <div className="p-20">
                {
                    blog.map(x => <Blogcard  title={x.title} member= {x.member} name = {x.author.name || "Kanishk" } content={x.content} publishDate={x.publishDate} />)
                }
                <Blogcard title="How an Ugly Singple-Page Website Makes $5,000 a Month with Affiliate Marketing " member = {true} name = "Kanishk" content="No need to create a fancy website with hundered of pages to make money online - Making money online is the dream for man" publishDate="26 April 2024" />
            </div>
        </div>
        

    </>);
}