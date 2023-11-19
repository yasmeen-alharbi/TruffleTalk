import {
    Text,
    View,
    Center,
    Button,
    Heading,
    Container
} from 'native-base';
import { Image } from 'react-native';
import React, { useContext } from 'react';
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

    const signup = () => {
        navigate('/register');
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
                <Container maxW="60%">
                    <Button _text={{fontWeight:"medium"}} borderRadius="full" mt="10" w="40" shadow="5" variant="subtle" onPress={signup}>
                        SIGN UP
                    </Button>
                    <Button mt="5" borderRadius="full" shadow="5" w="40" onPress={login}>
                        LOGIN
                    </Button>
                </Container>
                <Text mt="5"> 
                    Just browsing? <Text underline color="primary.600" onPress={setGuest}>Continue as guest</Text>
                </Text>
            </Center>
        </View>
    );
};

export default StartUp;