import {
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

    // warning very hacky solution for layout below
    return (
        <>
            <HStack bg="primary.600" h="32" shadow="3" pt="12">
                <HStack w="41%"></HStack>
                <HStack w="56%" h="100%" justifyContent="space-between" alignItems="center">
                    <Image style={{ width: 70, height: 50 }} source={require('../mushroom.png')} alt='Alt text'/>
                    {user ? (
                        <Button variant="subtle" borderRadius="full" shadow={3} size="12" onPress={goUserSearch}>
                            <Icon as={<Feather name="users"/>} color="primary.800" size="7"/>
                        </Button>
                    ) : null}
                </HStack>
            </HStack>
        </>
    );
};

export default AppHeader;