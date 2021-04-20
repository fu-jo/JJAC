import React, {useContext, useState, useEffect} from 'react'
import {auth} from "../firebase"

const UserContext = React.createContext()

var user = auth.currentUser()

export function useUser(){
    return useContext(UserContext)
}

export function UserProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function role(){
        return user.role
    }
    function email(){
        return user.email
    }
    function name(){
        return user.name
    }
    function id(){
        return user.id
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setLoading(false)
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        role,
        email,
        name,
        id
    }

    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    )
}

