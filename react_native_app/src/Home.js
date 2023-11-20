import {
    View,
    Text,
    Center,
    Heading,
} from  'native-base';
import React from 'react';

import AppHeader from './Components/AppHeader';

const Home = () => {
    return (
        <View>
            <AppHeader />
            <Center pt="20">
                <Heading size="3xl" color="primary.400">
                    Home
                </Heading>
                <Text fontWeight="medium" bold>
                    You're in the home page!
                </Text>
            </Center>
        </View>
    );
};

export default Home;