import {
    Icon,
    Button,
    HStack,
} from 'native-base';
import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import  {useNavigate } from 'react-router-dom';

import { AuthContext } from '../AuthProvider';

const AppFooter = () => {
    const { setIsGuest, user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const goBack = () => {
        if (user) {
            logOut(); // TODO: bring api call here
        } else {
            setIsGuest(false);
        }
        navigate('/');
    };

    return (
        <>
            <HStack bg="primary.600" justifyContent="space-between" alignItems="center" shadow="3" pl="7" pr="5">
                <Button>
                    <Icon as={<AntDesign name="home"/>} size="8" color="primary.50"/>
                </Button>
                <Button>
                    <Icon as={<Ionicons name="add"/>} size="12" color="primary.50"/>
                </Button>
                <Button onPress={goBack}>
                    <Icon as={<AntDesign name="user"/>} size="8" color="primary.50"/>
                </Button>
            </HStack>
        </>
    );
};

export default AppFooter;