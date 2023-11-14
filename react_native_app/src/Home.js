import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    View,
    Center,
    Heading,
    Text,
    Button,
} from  'native-base';
import { AuthContext } from './AuthProvider';

const Home = () => {
    const { isGuest, setIsGuest, user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const setGuest = () => {
        navigate('/');
        setIsGuest(false);
    };

    return (
        <View>
            <Center pt="20">
                <Heading size="3xl" color="primary.400">
                    Home
                </Heading>
                <Text fontWeight="medium" bold>
                    You're in the home page!
                </Text>
                {/* Temp for testing. TODO: cleanup */}
                <Button onPress={setGuest}>
                    Back to Login
                </Button>
            </Center>
        </View>
    );
};

export default Home;