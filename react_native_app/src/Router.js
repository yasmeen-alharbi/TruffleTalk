import React, {
    useEffect,
    useContext,
} from 'react';
import { View } from 'native-base';
import * as SecureStore from 'expo-secure-store';
import { Route, Routes } from 'react-router-native';

import Home from './Home';
import Login from './Login';
import StartUp from './StartUp';
import Register from './Register';
import UserSearch from './UserSearch';
import { AuthContext } from './AuthProvider';

const Router = () => {
    const { setUser } = useContext(AuthContext);

    useEffect(() => {
        SecureStore.getItemAsync('user').then(userString => {
            setUser(JSON.parse(userString));
        })
        .catch(err => {
            console.log(err);
        });

    }, []);

    return (
        <View>
            <Routes>
                <Route path="/" Component={StartUp} />
                <Route path="/login" Component={Login} />
                <Route path="/register" Component={Register} />
                {/* TODO: need to add an error screen */}
                <Route path="/home" Component={Home} />
                <Route path="/users" Component={UserSearch}/>
            </Routes>
        </View>
    );
};

export default Router;