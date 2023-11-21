import React, { 
    useState,
    useContext,
    useCallback,
} from 'react';
import {
    View,
    Text,
    Input,
    Button,
    Center,
    Heading,
    FormControl,
    WarningOutlineIcon,
} from  'native-base';
import { useNavigate } from 'react-router-dom';
import * as SecureStore from 'expo-secure-store';

import api from './util/api';
import { AuthContext } from './AuthProvider';

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const [formData, setData] = useState({
        email: null,
        password: null,
    });
    const [error, setError] = useState({
        email: null,
        password: null,
    });

    const goBack = () => { navigate('/'); };

    const onChange = (field, value) => {
        if (field === 'email') {
            setError({ ...error, email: null });
            setData({ ...formData, email: value });
        }
        else if (field === 'password') {
            setError({ ...error, password: null });
            setData({ ...formData, password: value });
        }
    };

    const submit = useCallback(async () => {
        api().post('/auth/token', {
            email: formData.email,
            password: formData.password,
            device_name: 'mobile',
        })
        .then(response => {

            const userResponse = {
                email: response.data.user.email,
                name: response.data.user.name,
                token: response.data.token,
            };

            setError(null);
            setUser(userResponse);
            SecureStore.setItemAsync('user', JSON.stringify(userResponse));

            navigate('/home');
        })
        .catch(({ errors }) => {
            setError(errors);
        });
    });

    return (
        <View>
            <Center pt="20">
                <Heading size="3xl" color="primary.400">
                    Welcome!
                </Heading>
                <Text fontWeight="medium" bold pt="3.5">
                    Login to continue
                </Text>
                <Center maxW="60%" pt="3.5">
                    <FormControl isInvalid={ error?.email }>
                        <FormControl.Label>
                            Email
                        </FormControl.Label>
                        <Input w="64" onChangeText={value => onChange('email', value)}/>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            { error?.email }
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={ error?.password }>
                        <FormControl.Label>
                            Password
                        </FormControl.Label>
                        <Input w="64" type='password' onChangeText={value => onChange('password', value)}/>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            { error?.password }
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <Button _text={{fontWeight:"medium"}} borderRadius="full" mt="10" w="40" shadow="5" onPress={submit}>
                        LOGIN
                    </Button>
                    <Button mt="5" borderRadius="full" shadow="5" w="40" variant="subtle" onPress={goBack}>
                        BACK
                    </Button>
                </Center>
            </Center>
        </View>
    );
};

export default Login;