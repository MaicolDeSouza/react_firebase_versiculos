import {createContext, useState } from "react";

//Criando o contexto
export const AuthContext = createContext()

//Criando o provider
export const AuthContextProvider = ({children})=>{
    const [auth, setAuth] = useState('')
    const [user, setUser] = useState('')

    return(
        //Fornecendo o valor para ser usado externamente
        <AuthContext.Provider value={{auth, setAuth, user, setUser}}> 
        {children}
        </AuthContext.Provider>
    )
}

