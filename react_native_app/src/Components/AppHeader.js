import {
    Icon,
    Button,
    HStack,
} from 'native-base';
import React from 'react';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AppHeader = () => {
    // warning very hacky solution for layout below
    return (
        <>
            <HStack bg="primary.600" h="32" shadow="3" pt="12">
                <HStack w="41%"></HStack>
                <HStack w="56%" h="100%" justifyContent="space-between" alignItems="center">
                    <Image style={{ width: 70, height: 50 }} source={require('../mushroom.png')} alt='Alt text'/>
                    <Button variant="subtle" borderRadius="full" shadow={3} size="12">
                        <Icon as={<Ionicons name="people"/>} color="primary.700" size="7"/>
                    </Button>
                </HStack>
            </HStack>
        </>
    );
};

export default AppHeader;