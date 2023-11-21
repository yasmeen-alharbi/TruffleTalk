import {
    View,
    Text,
    Button,
    Center,
    Heading,
} from  'native-base';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from './AuthProvider';

const Home = () => {
    const { isGuest, setIsGuest, user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const goBack = () => {
        if (user) {
            logOut(); // TODO: bring api call here
        } else {
            setIsGuest(false);
        }

        navigate('/');
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
                <Button onPress={goBack}>
                    Back to Login
                </Button>
            </Center>
        </View>
    );
};

export default Home;