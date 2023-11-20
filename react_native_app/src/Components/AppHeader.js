import React, {
    useContext
}from 'react';
import { 
    HStack,
    Icon,
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
            <HStack bg="primary.600" justifyContent="space-between" alignItems="center" h="32" shadow="3" pt="10" pl="7" pr="5">
                <HStack alignItems="center">
                    <Button variant="subtle" borderRadius="full" mr="3" size="12">
                        <Icon as={<AntDesign name="user"/>} size="5"/>
                    </Button>
                </HStack>
                <HStack>
                    <Image style={{ width: 40, height: 40 }} source={require('../mushroom.png')} alt='Alt text'/>
                </HStack>
                <HStack alignItems="center">
                    <Button>
                            <Icon as={<Entypo name="log-out"/>} size="7" color="primary.100" onPress={goBack}/>
                    </Button>
                </HStack>
            </HStack>
        </>
    );
};

export default AppHeader;