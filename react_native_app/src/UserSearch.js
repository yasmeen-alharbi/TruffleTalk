import {
    Center,
    Heading,
    HStack,
    Icon,
    Image,
    Input,
    ScrollView,
    Spinner,
    Text,
    View,
    VStack,
} from 'native-base';
import { debounce } from 'lodash';
import { Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';

import api from './util/api';
import { AuthContext } from './AuthProvider';
import UserCard from './Components/UserCard';
import AppFooter from './Components/AppFooter';
import AppHeader from './Components/AppHeader';

const UserSearch = () => {
    const { user } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [usersLoading, setUsersLoading] = useState(false);

    const searchUser = debounce((term) => {
        setUsersLoading(true);

        api({token: user.token}).get('/users?search=' + term)
            .then(({data}) => {
                setUsers(data.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setUsersLoading(false);
            });
    }, 250);

    useEffect(() => {
        searchTerm.length >= 2 ? searchUser(searchTerm) : setUsers([]);
    }, [searchTerm]);

    return (
        <View h="100%">
            <AppHeader />
                <ScrollView w="100%" h="100%">
                    <Center justifyContent="space-between" pt="5" pl="3" pr="3" pb="5">
                        <Heading fontSize="lg" color="primary.700" pb="3">Find Fellow Fungal Friends</Heading>
                        <VStack w="100%" space={5}>
                            <Input
                                placeholder="Search for Users"
                                width="100%"
                                borderRadius="4"
                                py="3" px="1"
                                fontSize="14"
                                onChangeText={value => setSearchTerm(value.trim())}
                                InputLeftElement={
                                    <Icon m="2" ml="3" size="6" as={
                                        <AntDesign name="search1" size={24} color="black"/>}
                                    />}
                            />

                            { usersLoading ? (
                                <HStack space={2} justifyContent="center">
                                    <Spinner />
                                    <Heading color="primary.500" fontSize="md">
                                        Loading
                                    </Heading>
                                </HStack>
                            ) : null }

                            { !usersLoading && searchTerm.length >= 2 ? (
                                <>
                                    { users.length > 0 ? (
                                        <>
                                            { users.map((user) => (
                                                <UserCard key={ user.id } userData={ user } />
                                            ))}
                                        </>
                                    ) : (
                                        <Center>
                                            <Text color="primary.500">No search results.</Text>
                                            <Text color="primary.500">Start following people to see cool posts!</Text>
                                        </Center>
                                    )}
                                </>
                            ) : null }

                            { !usersLoading && searchTerm.length <= 1 ? (
                                <>
                                    { searchTerm.length === 0 ? (
                                        <Center bottom="0">
                                            <Image style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width }} source={require('./mushroom-muted.png')} alt="app logo"/>
                                        </Center>
                                    ) : (
                                        <Center>
                                            <Text color="primary.500">No search results.</Text>
                                            <Text color="primary.500">Start following people to see cool posts!</Text>
                                        </Center>
                                    )}
                                </>
                            ) : null }

                        </VStack>
                    </Center>
                </ScrollView>
            <AppFooter />
        </View>
    )
};

export default UserSearch;