import { ReactNode, createContext, useEffect, useState, useContext } from "react";
import { UserModel } from "../models/UserModel";
import axios from "axios";
import { AuthenticationModal } from "../layouts/AuthenticationModal/AuthenticationModal";
import { useLocalStorage } from "../hooks/useLocalStorage";

type AuthContext = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  signUp: (user: UserModel) => void
  signIn: (email: string, password: string) => void
  signOut: () => void
  isLoading: boolean
  user: UserModel | undefined
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContext)

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isOpen, setIsOpen] = useLocalStorage<boolean>("is-auth-modal-open", false)
  const [user, setUser] = useState<UserModel | undefined>()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    refresh()
  }, [])

  useEffect(() => {
    if (!user) return
    setIsLoading(false)
  }, [user])

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("lock-body-scroll")
      return
    }
    document.body.classList.remove("lock-body-scroll")
  }, [isOpen])

  // Throws Error
  const signUp = async (user: UserModel) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/auth/sign-up`, user)
      if (res.status !== 201) {
        throw new Error("Something went wrong when signing up")
      }
    }
    catch (err: any) {
      throw new Error(err)
    }
  }

  const signIn = async (email: string, password: string) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/auth/sign-in`,
      {
        email,
        password
      },
      { withCredentials: true })
    setUser(res.data)
  }

  const refresh = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/auth/refresh`, { withCredentials: true })
      setUser(res.data)
    } catch (err: any) {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/auth/sign-out`, { withCredentials: true })
      setUser(undefined)
    } catch (err: any) {
      throw new Error(err)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        setIsOpen,
        signUp,
        signIn,
        signOut,
        isLoading,
        user
      }}
    >
      {children}
      {isOpen && <AuthenticationModal setIsOpen={setIsOpen} />}
    </AuthContext.Provider>
  )
}