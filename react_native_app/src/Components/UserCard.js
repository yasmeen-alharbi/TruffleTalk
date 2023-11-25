import React, { useContext, useState } from 'react';
import { Button, HStack, Icon, Text, VStack } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../AuthProvider';
import api from '../util/api';

const UserCard = ({ userData }) => {
    const { user } = useContext(AuthContext);
    const [following, setFollowing] = useState(userData.followed_by_current_user);

    const followUser = () => {
        if (!following) {
            api({ token: user.token }).post(`/users/${userData.id}/follow`)
                .then(() => {
                    setFollowing(true);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            api({ token: user.token }).delete(`/users/${userData.id}/unfollow`)
                .then(() => {
                    setFollowing(false);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <HStack pl="3" pr="3" pt="2" pb="2" justifyContent="space-between" alignItems="center" borderWidth="1" borderRadius="5" borderColor="primary.400" bg="blueGray.100">
            <VStack>
                <Text fontSize="lg" bold>
                    {`@${userData.username}`}
                </Text>
                <Text fontSize="sm" italic>
                    { userData.name }
                </Text>
            </VStack>
            <Button alignItems="center" onPress={followUser} borderWidth="1" borderColor="primary.500" bg={`${following ? "primary.500" : "white"}`} size={10}>
                <Icon as={<Feather name={`${following ? "user-check" : "user-plus"}`}/>} size="5" color={`${following ? "white" : "primary.500"}`}/>
            </Button>
        </HStack>
    );
};

export default UserCard;