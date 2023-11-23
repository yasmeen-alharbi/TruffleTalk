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
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions, Image } from 'react-native';

import { AuthContext } from '../AuthProvider';

const Post = ({ data, likePost, showComments }) => {
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
                            <Button size={10} alignItems="center">
                                <Icon as={<Feather name={`${data.followed_by_current_user ? "user-check" : "user-plus"}`}/>} size="5" color="primary.50"/>
                            </Button>
                        </>
                    ) : null}
                </HStack>
                <Divider bg="blueGray.200"/>
                <Box>
                    <Image style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width }} source={{ uri: data.image }} alt='Alt text'/>
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
                            <Text pt="2" fontSize="xs" color="muted.500" onPress={showComments}>
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