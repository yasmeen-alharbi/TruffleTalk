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
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

const StartUp = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const setGuest = () => {
        setUser(null);
        navigate('/home');
    };

    const login = () => {
        navigate('/login');
    };

    const register = () => {
        navigate('/register');
    };

    return (
        <View>
            <Center pt="20">
                <Center>
                    <Image style={{ width: 110, height: 80 }} source={require('./mushroom.png')} alt='logo'/>
                    <Heading size="3xl" color="primary.700" pt="3.5">
                        TruffleTalk
                    </Heading>
                    <Text fontWeight="medium" bold pt="3.5">
                        Where Myco-Minds Meet!
                    </Text>
                </Center>
                <Container maxW="60%">
                    <Button _text={{fontWeight:"medium"}} borderRadius="full" mt="10" w="40" shadow="5" onPress={login}>
                        LOGIN
                    </Button>
                    <Button mt="5" borderRadius="full" shadow="5" w="40" variant="subtle" onPress={register}>
                        SIGNUP
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