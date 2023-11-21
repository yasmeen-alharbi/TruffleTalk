import {
    Box,
    Icon,
    View,
    Text,
    VStack,
    HStack,
    Button,
    Spinner,
    Heading,
    Divider,
    ScrollView,
} from  'native-base';
import { Image } from 'react-native';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppHeader from './Components/AppHeader';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [like, setLike] = useState(false);
    
    const showComments = () => {
        console.log("lol");
    };

    const likePost = () => {
        setLike(!like);
    };

    return (
        <View>
            {loading ? (
                <VStack justifyContent="center" h="100%">
                    <HStack space={2} justifyContent="center">
                        <Spinner />
                        <Heading color="primary.500" fontSize="md">
                            Loading
                        </Heading>
                    </HStack>
                </VStack>
            ) : (
                <>
                    <AppHeader />
                    <ScrollView w="100%" h="100%">
                        <VStack>
                            <HStack pl="3" pt="3" pb="1" justifyContent="space-between" pr="3">
                                <VStack>
                                    <Text fontSize="lg" bold>
                                        @username
                                    </Text>
                                    <Text fontSize="xs" italic>
                                        mushroom
                                    </Text>
                                </VStack>
                                <Button size={8} alignItems="center">
                                    <Icon as={<Ionicons name="add"/>} size="5" color="primary.50"/>
                                </Button>
                            </HStack>
                            <Divider bg="blueGray.200" shadow="3"/>
                            <Box>
                                <Image style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width }} source={require('./mushroom.png')} alt='Alt text'/>
                            </Box>
                            <Divider bg="blueGray.200"/>
                            <VStack pl="3" pt="3" pb="1">
                                <HStack justifyContent="space-between" pr="3">
                                    <Text fontSize="md" bold>
                                        Title
                                    </Text>
                                    <Text fontSize="sm" color="muted.500">
                                        19/14/22
                                    </Text>
                                </HStack>
                                <VStack>
                                    <Text>
                                        this is my cool ass mushroom :3 whoah look at how ocook r oig  uerbigujnrgubiuvbiub
                                    </Text>
                                    <HStack justifyContent="space-between" pr="3">
                                        <Text pt="2" fontSize="xs" color="muted.500" onPress={showComments}>
                                            11 comments...
                                        </Text>
                                        <Ionicons name={`${like ? "heart-outline" : "heart-sharp"}`} size={24} color={`${like ? "black" : "red"}`} onPress={likePost}/>
                                    </HStack>
                                </VStack>
                            </VStack>
                            <Divider bg="blueGray.200"/>
                        </VStack>
                    </ScrollView>
                </>
            )}
        </View>
    );
};

export default Home;