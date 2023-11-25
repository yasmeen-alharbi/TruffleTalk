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
import React, { useContext, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions, Image } from 'react-native';

import { AuthContext } from '../AuthProvider';
import api from '../util/api';

const Post = ({ data, likePost, showComments }) => {
    const { user } = useContext(AuthContext);
    const [following, setFollowing] = useState(data.followed_by_current_user);
    const date = moment(data.created_at);
    const formattedDate = date.utc().format('DD/MM/YY');

    const followUser = () => {
        if (!following) {
            api({ token: user.token }).post(`/users/${data.user_id}/follow`)
                .then(() => {
                    setFollowing(true);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            api({ token: user.token }).delete(`/users/${data.user_id}/unfollow`)
                .then(() => {
                    setFollowing(false);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

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
                            <Button alignItems="center" onPress={followUser} borderWidth="1" borderColor="primary.500" bg={`${following ? "primary.500" : "white"}`} size={10}>
                                <Icon as={<Feather name={`${following ? "user-check" : "user-plus"}`}/>} size="5" color={`${following ? "white" : "primary.500"}`}/>
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