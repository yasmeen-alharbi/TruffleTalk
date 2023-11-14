import React, { useState } from 'react';
import api from './util/api';

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isGuest, setIsGuest] = useState(false);
    const [error, setError] = useState(null);

    const logIn = (email, password) => {
        api().post('/auth/token', {
            email,
            password,
            device_name: 'mobile',
        })
        .then(response => {

            const userResponse = {
                email: response.data.user.email,
                name: response.data.user.name,
                token: response.data.token,
            };

            setUser(userResponse);
            setError(null);
        })
        .catch(({errors}) => {
            setError(errors[0]);
        });
    };

    const logOut = () => {
        api({token: user.token}).delete('/auth/token').then(() => {
            setUser(null);
            SecureStore.deleteItemAsync('user');
        }).catch(({errors}) => {
            setError(errors[0]);
        });
    };

    return (
        <AuthContext.Provider value={{user, setUser, error, logIn, logOut, isGuest, setIsGuest}}>
            {children}
        </AuthContext.Provider>
    );
};