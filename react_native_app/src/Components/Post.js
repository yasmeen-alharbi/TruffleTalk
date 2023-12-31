import {
    Box,
    Icon,
    Text,
    VStack,
    Button,
    HStack,
    Divider,
} from 'native-base';
import moment from 'moment/moment';
import React, { useContext } from 'react';
import { Dimensions, Image } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

import { AuthContext } from '../AuthProvider';

const Post = ({ data, likePost, showComments, followUser }) => {
    const { user } = useContext(AuthContext);
    const date = moment(data.created_at);
    const formattedDate = date.utc().format('DD/MM/YY');

    return (
        <>
            <VStack>
                <HStack pl="3" pt="3" pb="1" justifyContent="space-between" pr="3">
                    <VStack>
                        <Text fontSize="lg" bold>
                            {`@${data.author}`}
                        </Text>
                        <Text fontSize="xs" italic>
                            { data.mushroom }
                        </Text>
                    </VStack>
                    { user && user.id !== data.user_id ? (
                        <>
                            <Button alignItems="center" onPress={followUser} borderWidth="1" borderColor="primary.500" bg={`${data.followed_by_current_user ? "primary.500" : "white"}`} size={10}>
                                <Icon as={<Feather name={`${data.followed_by_current_user ? "user-check" : "user-plus"}`}/>} size="5" color={`${data.followed_by_current_user ? "white" : "primary.500"}`}/>
                            </Button>
                        </>
                    ) : null}
                </HStack>
                <Divider bg="blueGray.200"/>
                <Box w={ Dimensions.get('window').width } h={ Dimensions.get('window').width } bg="gray.100">
                    <Image style={{ width: "100%", height: "100%"}} resizeMode="contain" source={{ uri: data.image }} alt='mushroom post image'/>
                </Box>
                <Divider bg="blueGray.200"/>
                <VStack pl="3" pt="3" pb="2" pr="3">
                    <HStack justifyContent="space-between">
                        <Text fontSize="md" bold>
                            { data.title }
                        </Text>
                        <Text fontSize="sm" color="muted.500">
                            { formattedDate }
                        </Text>
                    </HStack>
                    <VStack>
                        <Text>
                            { data.description }
                        </Text>
                        <HStack justifyContent="space-between">
                            <Text pt="2" fontSize="xs" color="muted.500" onPress={() => showComments(data.id, data.comments)}>
                                {`${data.comments.length} ${data.comments.length === 1 ? "comment" : "comments"}...`}
                            </Text>
                            <HStack justifyContent="space-between" space={1}>
                                <Text fontSize="md" color="muted.500">{ data.likes_count }</Text>
                                { !user || user.id === data.user_id ? (
                                    <Text fontSize="md" color="muted.500"> {`${data.likes_count === 1 ? 'Like' : 'Likes'}`} </Text>
                                ) : (
                                    <Ionicons name={`${data.liked_by_current_user ? "heart-sharp" : "heart-outline"}`} size={24} color={`${data.liked_by_current_user ? "red" : "grey"}`} onPress={likePost}/>
                                )}
                            </HStack>
                        </HStack>
                    </VStack>
                </VStack>
                <Divider bg="blueGray.200"/>
            </VStack>
        </>
    );
};

export default Post;