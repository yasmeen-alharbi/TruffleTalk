import React, {
    useContext,
    useEffect,
    useState,
} from 'react';
import {
    View,
    VStack,
    HStack,
    Spinner,
    Heading,
    ScrollView,
} from  'native-base';

import api from './util/api';
import Post from './Components/Post';
import { AuthContext } from './AuthProvider';
import AppHeader from './Components/AppHeader';

const Home = () => {
    const { user } = useContext(AuthContext);

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api({ token: user.token }).get('/posts')
        .then(({ data }) => {
            setData(data.data);
            setLoading(false);
        }).catch((errors) => {
            console.error(errors);
            setLoading(false);
        });

    }, []);
    
    const showComments = () => {
        console.log("show comments");
    };

    const likePost = () => {
        console.log('like/unlike');
    };

    // TODO: add pb={10} to the last post displayed
    return (
        <View h="100%">
            {loading ? (
                <VStack justifyContent="center" h="100%">
                    <HStack space={2} justifyContent="center">
                        <Spinner />
                        <Heading color="primary.500" fontSize="md">
                            Loading
                        </Heading>
                    </HStack>
                </VStack>
            ) : (
                <>
                    <AppHeader />
                    <ScrollView w="100%" h="100%">
                        {data.map((data, id) => (
                            <Post key={ id } data={ data } likePost={ likePost } showComments={ showComments } />
                        ))}
                        <VStack h="8"></VStack>
                    </ScrollView>
                </>
            )}
        </View>
    );
};

export default Home;