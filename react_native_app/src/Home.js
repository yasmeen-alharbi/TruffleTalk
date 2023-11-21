import {
    Box,
    Icon,
    View,
    Text,
    VStack,
    HStack,
    Button,
    Divider,
    Container,
    ScrollView,
} from  'native-base';
import React from 'react';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

import AppHeader from './Components/AppHeader';

const Home = () => {
    const showComments = () => {
        console.log("lol");
    }

    return (
        <View>
            <AppHeader />
            <ScrollView w="100%" h="100%">
                <VStack>
                    <HStack pl="3" pt="3" pb="1" justifyContent="space-between" pr="3">
                        <VStack>
                            <Text fontSize="lg" bold>
                                Username
                            </Text>
                            <Text fontSize="xs" italic>
                                mushroom
                            </Text>
                        </VStack>
                        <Button size={8} alignItems="center">
                            <Icon as={<Ionicons name="add"/>} color="primary.100"/>
                        </Button>
                    </HStack>
                    <Divider bg="blueGray.200" shadow="3"/>
                    <Box>
                        <Image style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width }} source={require('./mushroom.png')} alt='Alt text'/>
                    </Box>
                    <Divider bg="blueGray.200"/>
                    <VStack pl="3" pt="3" pb="1">
                        <HStack justifyContent="space-between" pr="3">
                            <Text fontSize="md">
                                Title
                            </Text>
                            <Text fontSize="sm" color="muted.500">
                                19/14/22
                            </Text>
                        </HStack>
                        <Container>
                            <Text>
                                this is my cool ass mushroom :3 whoah look at how ocook r oig  uerbigujnrgubiuvbiub
                            </Text>
                            <Text pt="2" fontSize="xs" color="muted.500" onPress={showComments}>
                                11 comments...
                            </Text>
                        </Container>
                    </VStack>
                    <Divider bg="blueGray.200"/>
                </VStack>
            </ScrollView>
        </View>
    );
};

export default Home;