import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import api from './util/api';

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const logOut = () => { // TODO: move later
        api({ token: user.token }).delete('/auth/token').then(() => {
            setUser(null);

            SecureStore.deleteItemAsync('user');
        }).catch(({ errors }) => {
            setError(errors);
        });
    };

    return (
        <AuthContext.Provider value={{ user, setUser, error, logOut, }}>
            { children }
        </AuthContext.Provider>
    );
};