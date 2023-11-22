import React, {
    useState,
    useEffect,
    useContext,
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
import AppFooter from './Components/AppFooter';

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

    const likePost = (postID) => {
        const post = data.filter(obj => {
            return obj.id === postID;
        });

        if (!post[0].liked_by_current_user) {
            api({ token: user.token }).post(`/posts/${postID}/likes`)
                .then(() => {
                    setData(data.map((prevData) =>
                        prevData.id === postID
                        ? {...prevData, liked_by_current_user: true, likes_count: prevData.likes_count + 1}
                        : prevData
                    ));
                })
                .catch(error => {
                    console.error(error);
                })
        }
        else {
            api({ token: user.token }).delete(`/posts/${postID}/likes`)
                .then(() => {
                    setData(data.map((prevData) =>
                        prevData.id === postID
                            ? {...prevData, liked_by_current_user: false, likes_count: prevData.likes_count - 1}
                            : prevData
                    ));
                })
                .catch(error => {
                    console.error(error);
                })
        }
    };

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
                        {data.map((data) => (
                            <Post key={ data.id } data={ data } likePost={ () => likePost(data.id) } showComments={ showComments } />
                        ))}
                    </ScrollView>
                    <AppFooter />
                </>
            )}
        </View>
    );
};

export default Home;