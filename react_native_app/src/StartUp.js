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
    Link
} from  'native-base'

const StartUp = () => {
    return (
        <View width="100%" height="100%">
            <Column alignItems="center" mt="20">
                <Center>
                    <Image style={{ width: 51, height: 51 }} source={require('./mushroom.png')} alt='Alt text'/>
                    <Container mt="5">
                        <Heading>
                            Welcome to
                            <Text color="primary.400"> TruffleTalk </Text>
                        </Heading>
                    </Container>
                    <Container>
                        <Text mt="3" fontWeight="medium">
                            TruffleTalk is an app
                        </Text>
                    </Container>
                    <Button mt="20" borderRadius="full"  shadow="5" variant="subtle" alignContent="center">
                        <Text ml="7" mr="7" fontWeight="medium">
                            REGISTER
                        </Text>
                    </Button>
                    <Button  mt="5" borderRadius="full"  shadow="5" alignContent="center">
                        <Text ml="10" mr="10" fontWeight="medium" color="white">
                            LOGIN
                        </Text>
                    </Button>
                    <Text mt="5"> 
                    Just browsing? <Link>Continue as guest</Link>
                    </Text>
                </Center>
            </Column>
        </View>
    );
};

export default StartUp;