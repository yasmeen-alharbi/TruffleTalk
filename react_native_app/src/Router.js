import React, {
    useEffect,
    useContext,
    useState,
} from 'react';
import { View } from 'native-base';
import * as SecureStore from 'expo-secure-store';
import { Route, Routes } from 'react-router-native';
import { ActivityIndicator } from 'react-native'

import Home from './Home';
import Login from './Login';
import StartUp from './StartUp';
import { AuthContext } from './AuthProvider';

const Router = () => {
    const { user, setUser, isGuest } = useContext(AuthContext);

    useEffect(() => {
        SecureStore.getItemAsync('user').then(userString => {
            setUser(JSON.parse(userString));
        }).catch(err => {
            console.log(err);
        });

    }, []);

    return (
        <View>
            <Routes>
                <Route path="/" Component={StartUp} />
                <Route path="/login" Component={Login} />
                {/* TODO: need to add an error screen */}
                <Route path="/home" Component={Home} />
            </Routes>
        </View>
    );
};

export default Router;