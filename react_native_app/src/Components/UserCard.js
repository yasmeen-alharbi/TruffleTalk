import React from 'react';
import { Button, HStack, Icon, Text, VStack } from 'native-base';
import { Feather } from '@expo/vector-icons';

const UserCard = ({ user }) => {
    return (
        <HStack pl="3" pr="3" pt="2" pb="2" justifyContent="space-between" alignItems="center" borderWidth="1" borderRadius="5" borderColor="primary.400" bg="blueGray.100">
            <VStack>
                <Text fontSize="lg" bold>
                    {`@${user.username}`}
                </Text>
                <Text fontSize="sm" italic>
                    { user.name }
                </Text>
            </VStack>
            <Button size={10} alignItems="center">
                <Icon as={<Feather name={`${user.followed_by_current_user ? "user-check" : "user-plus"}`}/>} size="5" color="primary.50"/>
            </Button>
        </HStack>
    );
};

export default UserCard;