import React from 'react';
import { createContext,  useEffect, useReducer } from "react";

import { onAutStateChangedListener, createUserDocumentFromAuth } from '../src/utils/firebase/firebase/firebase.utils.js'

import { createAction } from '../src/utils/firebase/reducer/reducre.utils.jsx';

export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
});

export const USER_ACTION_TYPES = {
    SET_CURRNT_USER: "SET_CURRNT_USER",
};

const INITIAL_STATE = {
    currentUser: null,
};

const userReducer = (state, action) => {
    const {type, payload} = action;

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRNT_USER:
            return { ...state, currentUser: payload};
        default:
            throw new Error(`Unhandled type ${type} in userReducer`)
    }
};

export const UserProvider = ({ children }) => {
   const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

   const setCurrentUser = (user ) => 
   dispatch(createAction(USER_ACTION_TYPES.SET_CURRNT_USER, user ));

    const value = {currentUser};

    useEffect(() => {
        const unsubscribe = onAutStateChangedListener((user) => {
           if(user) {
             createUserDocumentFromAuth(user);
           }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};