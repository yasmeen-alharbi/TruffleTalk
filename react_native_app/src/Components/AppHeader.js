import React, {
    useContext,
} from 'react';
import {
    Icon,
    HStack,
    Button,
} from  'native-base';
import { Image } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { AntDesign, Entypo } from '@expo/vector-icons';

import { AuthContext } from '../AuthProvider';

const AppHeader = () => {
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
            <HStack bg="primary.600" justifyContent="space-between" alignItems="center" h="32" shadow="3" pt="12" pl="7" pr="5">
                <Button variant="subtle" borderRadius="full" size="12">
                    <Icon as={<AntDesign name="user"/>} size="5"/>
                </Button>
                <Image style={{ width: 70, height: 50 }} source={require('../mushroom.png')} alt='Alt text'/>
                <Button>
                        <Icon as={<Entypo name="log-out"/>} size="7" color="primary.100" onPress={goBack}/>
                </Button>
            </HStack>
        </>
    );
};

export default AppHeader;