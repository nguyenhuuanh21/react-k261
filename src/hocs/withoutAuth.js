import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
export function withoutAuth(OriginalComponent){
    return function AuthComponent(props){
        const auth=useSelector(({auth})=>auth.auth)
        return auth.isAuthenticated
        ?<Navigate to="/"/> 
        :<OriginalComponent {...props}/>
    }
}