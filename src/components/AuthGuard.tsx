import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"

export const AuthGuard: React.FC<{ component: () => JSX.Element }> = (props) => {
  const auth = useAuth()
  
  useEffect(() => {
    if (auth.isLoading) return
    
    if (!auth.user) auth.setIsOpen(true)
  }, [auth])

  if (auth.isLoading || (!auth.isLoading && !auth.user)) {
    return null
  }

  const Component = props.component

  return <Component />
}