import React, {
    useState,
    useEffect,
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

import api from './util/api';

const Register = () => {
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const [confirmError, setConfirmError] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    };

    const goLogin = () => {
        navigate('/login');
    };

    const confirmPassword = (value) => {
        if (password && password != value) {
            setConfirmError("Passwords do not match");
        } else {
            setConfirm(value);
            setConfirmError(null);
        }
    };

    useEffect(() => {
        if (error || confirmError) {
            const timer = setTimeout(() => {
                setError(null);
                setConfirmError(null);
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [error, confirmError]);

    const submit = useCallback(async () => {
        api().post('/register', {
            name,
            username,
            email,
            password,
            password_confirmation: confirm,
        })
        .then(response => {
            setError(null);

            navigate('/login');
        })
        .catch(({ errors }) => {
            setError(errors);
        });
    });

    return (
        <View>
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
                        <Input w="64" onChangeText={value => setName(value)}/>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            { error?.name }
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={ error?.username }>
                        <FormControl.Label>
                            Username
                        </FormControl.Label>
                        <Input w="64" onChangeText={value => setUsername(value)}/>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            { error?.username }
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={ error?.email }>
                        <FormControl.Label>
                            Email
                        </FormControl.Label>
                        <Input w="64" onChangeText={value => setEmail(value)}/>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            { error?.email }
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={ error?.password }>
                        <FormControl.Label>
                            Password
                        </FormControl.Label>
                        <Input w="64" type='password' onChangeText={value => setPassword(value)}/>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            { error?.password }
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={ confirmError }>
                        <FormControl.Label>
                            Confirm Password
                        </FormControl.Label>
                        <Input w="64" type='password' onChangeText={value => confirmPassword(value)}/>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            { confirmError }
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <Button _text={{fontWeight:"medium"}} borderRadius="full" mt="10" w="40" shadow="5" variant="subtle" onPress={submit}>
                        SIGNUP
                    </Button>
                    <Button mt="5" borderRadius="full" shadow="5" w="40" onPress={goBack}>
                        BACK
                    </Button>
                    <Text mt="5"> 
                        Already have an account? <Text underline color="primary.600" onPress={goLogin}>Login here</Text>
                    </Text>
                </Center>
            </Center>
        </View>
    );
};

export default Register;