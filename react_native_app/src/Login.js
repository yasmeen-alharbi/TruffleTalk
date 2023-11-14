import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    View,
    Center,
    Heading,
    Text,
    Button,
    VStack,
    FormControl,
    Input,
    WarningOutlineIcon
} from  'native-base';

import { AuthContext } from './AuthProvider';

const Login = () => {
    // TODO: clear errors if inputs changed.
    const {logIn, error} = useContext(AuthContext)
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const navigate = useNavigate();

    const goStartUp = () => {
        navigate('/');
    };

    const submit = () => {
        logIn(email, password);
        navigate('/home');
    }

    return (
        <View>
            <Center pt="20">
                <Heading size="3xl" color="primary.400">
                    Welcome!
                </Heading>
                <Text fontWeight="medium" bold>
                    Login to continue
                </Text>
                <VStack space={3} mt="5" w="50%">
                    <FormControl isInvalid={error}>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input onChangeText={value => setEmail(value)}/>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            {error}
                        </FormControl.ErrorMessage>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input type='password' onChangeText={value => setPassword(value)}/>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            {error}
                        </FormControl.ErrorMessage>
                    </FormControl>
                </VStack>
                <Button mt="5" _text={{fontWeight:"medium"}} borderRadius="full" w="40%" shadow="5" variant="subtle" onPress={submit}>
                    LOGIN
                </Button>
                {/* Temp for testing. TODO: cleanup */}
                <Button mt="5" borderRadius="full"  w="40%" shadow="5" onPress={goStartUp}>
                    BACK
                </Button>
            </Center>
        </View>
    );
};

export default Login;