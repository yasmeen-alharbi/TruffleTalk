import React, {
    useEffect,
    useContext
} from 'react'
import { View } from 'native-base'
import * as SecureStore from 'expo-secure-store'

import { AuthContext } from './AuthProvider'
import StartUp from './StartUp'

const Router = () => {
    const {user, setUser} = useContext(AuthContext);

    useEffect(() => {
        SecureStore.getItemAsync('user').then(userString => {
            setUser(JSON.parse(userString));
        }).catch(err => {
            console.log(err);
        });

    }, []);

    return (
        <View>
            {user ? <Home />: <StartUp />}
        </View>
    );
};

export default Router;