import React, {
    useEffect,
    useContext
} from 'react';
import { View } from 'native-base';
import * as SecureStore from 'expo-secure-store';
import { Route, Routes } from 'react-router-native';

import Home from './Home';
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
                {/* TODO: eed to add an error screen*/}
                {user || isGuest ?
                    <Route path="/home" Component={Home} />
                    : null
                }
                
            </Routes>
        </View>
    );
};

export default Router;