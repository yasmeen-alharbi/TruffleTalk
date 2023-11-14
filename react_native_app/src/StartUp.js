import React, {
    useContext,
} from 'react';
import {
    Text,
    Heading,
    Center,
    View,
    Button
} from  'native-base';
import { Image } from 'react-native';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from './AuthProvider';

const StartUp = () => {
    const { setIsGuest } = useContext(AuthContext);
    const navigate = useNavigate();

    const setGuest = () => {
        navigate('/home');
        setIsGuest(true);
    };

    const login = () => {
        navigate('/login');
    };

    return (
        <View>
            <Center pt="20">
                <Center>
                    <Image style={{ width: 70, height: 70 }} source={require('./mushroom.png')} alt='Alt text'/>
                    <Heading size="3xl" color="primary.400">
                        TruffleTalk
                    </Heading>
                    <Text fontWeight="medium" bold>
                        Where Myco-Minds Meet!
                    </Text>
                </Center>
                <Button mt="20" _text={{fontWeight:"medium"}} borderRadius="full" w="40%" shadow="5" variant="subtle">
                    SIGN UP
                </Button>
                <Button mt="5" borderRadius="full"  w="40%" shadow="5" onPress={login}>
                    LOGIN
                </Button>
                <Text mt="5"> 
                    Just browsing? <Text underline color="primary.600" onPress={setGuest}>Continue as guest</Text>
                </Text>
            </Center>
        </View>
    );
};

export default StartUp;