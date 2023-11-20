import {
    Box,
    View,
    Text,
    VStack,
    HStack,
    Divider,
    Container,
    ScrollView,
} from  'native-base';
import React from 'react';
import { Image } from 'react-native';

import AppHeader from './Components/AppHeader';

const Home = () => {
    return (
        <View>
            <AppHeader />
            <ScrollView w="100%" h="100%" pt="3">
                <VStack>
                    <Container ml="3" mb="3">
                        <HStack alignItems="center" space={56}>
                            <Text fontSize="xl">
                                title here
                            </Text>
                            <Text color="muted.500" >
                                19/14/22
                            </Text>
                        </HStack>
                        <Text fontSize="xs">
                            mushroom
                        </Text>
                        <HStack justifyContent="space-between" space={10}>
                            <Text mt="3" w="80%">
                                LOOK AT THIS COOL MUSHROOM I FOUND!!!!! :3
                            </Text>
                            <Box pt="3" w="70" h="70" alignItems="center" borderColor="coolGray.600" rounded="lg" overflow="hidden" shadow={2} borderWidth="1">
                                <Image style={{ width: 40, height: 40 }} source={require('./mushroom.png')} alt='Alt text'/>
                            </Box>
                        </HStack>
                    </Container>
                    <Divider bg="blueGray.200"/>
                </VStack>
            </ScrollView>
        </View>
    );
};

export default Home;