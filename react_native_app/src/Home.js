import React, { useContext } from 'react'
import {
    View,
    Center,
    Heading,
    Text,
    Button,
} from  'native-base'
import { AuthContext } from './AuthProvider'

const Home = () => {
    const { isGuest, setIsGuest } = useContext(AuthContext);
    
    const setGuest = () => {
        setIsGuest(false);
    };

    return (
        <View>
            <Center mt="5">
                <Heading size="3xl" color="primary.400">
                    Home
                </Heading>
                <Text fontWeight="medium" bold>
                    You're in the home page!
                </Text>
                {/* Temp for testing. TODO: cleanup */}
                {isGuest ? 
                    <Button onPress={setGuest}>
                        Back to Login
                    </Button>
                : null }
            </Center>
        </View>
    );
};

export default Home;