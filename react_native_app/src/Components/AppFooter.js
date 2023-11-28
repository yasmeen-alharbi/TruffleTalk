import {
    Icon,
    Button,
    HStack,
} from 'native-base';
import {
    Ionicons,
    AntDesign,
    MaterialIcons,
} from '@expo/vector-icons';
import React, { useContext } from 'react';
import  {useNavigate } from 'react-router-dom';

import { AuthContext } from '../AuthProvider';

const AppFooter = ({ handleRefresh = null }) => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const goBack = () => {
        if (user) {
            logOut(); // TODO: bring api call here
        }
        navigate('/');
    };

    const goHome = () => {
        handleRefresh? handleRefresh() : null;
        navigate('/home');
    };

    const goCreate = () => {
        navigate('/create');
    };

    return (
        <>
            <HStack bg="primary.600" justifyContent="space-between" alignItems="center" shadow="3" pl="7" pr="5" height={user ? null : "8%"}>
                <Button onPress={goHome}>
                    <Icon as={<AntDesign name="home"/>} size="8" color="primary.50"/>
                </Button>
                { user ?  (
                    <Button onPress={goCreate}>
                        <Icon as={<Ionicons name="add"/>} size="12" color="primary.50"/>
                    </Button>
                ) : null }
                <Button onPress={goBack}>
                    <Icon as={<MaterialIcons name="logout"/>} size="8" color="primary.50"/>
                </Button>
            </HStack>
        </>
    );
};

export default AppFooter;