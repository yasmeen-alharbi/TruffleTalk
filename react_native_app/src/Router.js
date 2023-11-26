import React from 'react';
import { View } from 'native-base';
import { Route, Routes } from 'react-router-native';

import Home from './Home';
import Login from './Login';
import StartUp from './StartUp';
import Register from './Register';
import CreatePost from './CreatePost';

const Router = () => {
    return (
        <View>
            <Routes>
                <Route path='/' Component={ StartUp } />
                <Route path='/login' Component={ Login } />
                <Route path='/register' Component={ Register } />
                <Route path='/home' Component={ Home } />
                <Route path='/create' Component={ CreatePost } />
            </Routes>
        </View>
    );
};

export default Router;