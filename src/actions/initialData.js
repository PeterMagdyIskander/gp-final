import { checkAutoLogin } from "./authedUser";
export function handleInitialData(){
    return (dispatch)=>{
        dispatch(checkAutoLogin());
    }
}