import {
    Text,
    Icon,
    Button,
    HStack,
} from 'native-base';
import { Image } from 'react-native';
import React, { useContext } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../AuthProvider';

const AppHeader = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const goUserSearch = () => {
        navigate('/users');
    };

    return (
        <>
            <HStack bg="primary.600" h="32" shadow="3" pt="12">
                <HStack w="100%" h="100%" alignItems="center" pl="3" pr="3">
                    <HStack w="40%">
                        {user ? (
                            <Text isTruncated fontSize="lg" color="primary.50" bold>
                                {`@${user.username}`}
                            </Text>
                        ) : null}
                    </HStack>
                    <HStack w="45%">
                        <Image style={{ width: 70, height: 50 }} source={require('../mushroom.png')} alt='Alt text'/>
                    </HStack>
                    <HStack w="45%">
                        {user ? (
                            <Button variant="subtle" borderRadius="full" shadow={3} size="12" onPress={goUserSearch}>
                                <Icon as={<Feather name="users"/>} color="primary.800" size="7"/>
                            </Button>
                        ) : null}
                    </HStack>
                </HStack>
            </HStack>
        </>
    );
};

export default AppHeader;