import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import api from './util/api';

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const logOut = () => {
        api({ token: user.token }).delete('/auth/token')
            .then(() => {
                SecureStore.deleteItemAsync('user');
            })
            .catch(({ errors }) => {
                setError(errors);
            })
            .finally(() => {
                setUser(null); // Just in case anything fails
            });
    };

    return (
        <AuthContext.Provider value={{ user, setUser, error, logOut, }}>
            { children }
        </AuthContext.Provider>
    );
};