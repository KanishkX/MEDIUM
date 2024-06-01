import { Quote } from "../components/quote";
import { Form } from "../components/form";
export function Signup (){
    return (<>
    <div className=" grid grid-cols-1 lg:grid-cols-2">
        <div>
        <Form type="signup" />
        </div>
        
        <div className="hidden lg:block">
            <Quote />
        </div>
    </div>
       
    </>);
}