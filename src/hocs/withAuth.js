import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
export function withAuth(OriginalComponent){
    return function AuthComponent(props){
        const auth=useSelector(({auth})=>auth.auth)
        return auth.isAuthenticated
        ?<OriginalComponent {...props}/> 
        :<Navigate to="/access-denied"/>
    }
}