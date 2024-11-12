import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PreventSignInAsAuth = (props)=>{
    const users = useSelector(state=>state.users)
    const navigate = useNavigate()
    console.log("inside prev sig");
    
    return <>
        {users.auth ? navigate('/dashboard'):props.children}
    </>
}

export default PreventSignInAsAuth