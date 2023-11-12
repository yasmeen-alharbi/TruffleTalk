import React from 'react'
import { Image } from 'react-native'
import {
    Text,
    Container,
    Heading,
    Center,
    Column,
    View,
    Button,
    Link,
    Spacer
} from  'native-base'

const StartUp = () => {
    return (
        <View width="100%" height="100%" pt="20" alignItems="center">
            <Center mt="5">
                <Image style={{ width: 70, height: 70 }} source={require('./mushroom.png')} alt='Alt text'/>
                <Heading size="3xl" color="primary.400">
                    TruffleTalk
                </Heading>
                <Text fontWeight="medium" bold>
                    Where Myco-Minds Meet!
                </Text>
            </Center>
            <Center pt="20">
                <Button borderRadius="full"  shadow="5" variant="subtle" alignContent="center">
                    <Text ml="8" mr="8" fontWeight="medium">
                        SIGN UP
                    </Text>
                </Button>
                <Button mt="5" borderRadius="full"  shadow="5" alignContent="center">
                    <Text ml="10" mr="10" fontWeight="medium" color="white">
                        LOGIN
                    </Text>
                </Button>
                <Text mt="5"> 
                    Just browsing? <Link _text={{color: "primary.600"}}>Continue as guest</Link>
                </Text>
            </Center>
        </View>
    );
};

export default StartUp;