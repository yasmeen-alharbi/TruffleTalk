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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import api from './util/api';
import { AuthContext } from './AuthProvider';

const Register = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const [formData, setData] = useState({
        name: null,
        username: null,
        email: null,
        password: null,
        confirm: null,
    });
    const [error, setError] = useState({
        name: null,
        username: null,
        email: null,
        password: null,
        confirm: null,
    });

    const goBack = () => { navigate('/'); };

    const goLogin = () => { navigate('/login'); };

    const onChange = (field, value) => {
        if (field === 'name') {
            setError({ ...error, name: null });
            setData({ ...formData, name: value });
        }
        else if (field === 'username') {
            setError({ ...error, username: null });
            setData({ ...formData, username: value });
        }
        else if (field === 'email') {
            setError({ ...error, email: null });
            setData({ ...formData, email: value });
        }
        else if (field === 'password') {
            setError({ ...error, password: null });
            setData({ ...formData, password: value });
        }
        else if (field === 'password_confirmation') {
            setError({ ...error, password_confirmation: null });
            setData({ ...formData, password_confirmation: value });
        }
    };

    const submit = useCallback(async () => {
        api().post('/register', formData)
        .then(() => {
            setError(null);
            
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
    
                setUser(userResponse);
                SecureStore.setItemAsync('user', JSON.stringify(userResponse));
    
                navigate('/home');
            })
            .catch((errors) => {
                console.error(errors);
            });
        })
        .catch(({ errors }) => {
            setError(errors);
        });
    });

    return (
        <View h="100%">
            <KeyboardAwareScrollView h="100%">
                <Center pt="24">
                    <Heading size="lg" color="primary.400">
                        Create a TruffleTalk Account
                    </Heading>
                    <Text fontWeight="medium" fontSize="sm" bold pt="3.5">
                        Ready to Share Your Adventures?
                    </Text>
                    <Text fontWeight="medium" fontSize="sm">Register for Full Access!</Text>
                    <Center maxW="70%" pt="3.5">
                        <FormControl isInvalid={ error?.name }>
                            <FormControl.Label>
                                Name
                            </FormControl.Label>
                            <Input w="64" onChangeText={value => onChange('name', value)}/>
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                { error?.name }
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={ error?.username }>
                            <FormControl.Label>
                                Username
                            </FormControl.Label>
                            <Input w="64" onChangeText={value => onChange('username', value)}/>
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                { error?.username }
                            </FormControl.ErrorMessage>
                        </FormControl>
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
                        <FormControl>
                            <FormControl.Label>
                                Confirm Password
                            </FormControl.Label>
                            <Input w="64" type='password' onChangeText={value => onChange('password_confirmation', value)}/>
                        </FormControl>
                        <Button _text={{fontWeight:"medium"}} borderRadius="full" mt="10" w="40" shadow="5" onPress={submit}>
                            SIGNUP
                        </Button>
                        <Button mt="5" borderRadius="full" shadow="5" w="40" variant="subtle" onPress={goBack}>
                            BACK
                        </Button>
                        <Text mt="5"> 
                            Already have an account? <Text underline color="primary.600" onPress={goLogin}>Login here</Text>
                        </Text>
                    </Center>
                </Center>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default Register;