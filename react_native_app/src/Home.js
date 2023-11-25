import React, {
    useRef,
    useState,
    useEffect,
    useContext,
    useCallback,
} from 'react';
import {
    View,
    Text,
    VStack,
    HStack,
    Center,
    Spinner,
    Heading,
    Divider,
    ScrollView,
} from 'native-base';

import api from './util/api';
import Post from './Components/Post';
import { AuthContext } from './AuthProvider';
import AppHeader from './Components/AppHeader';
import AppFooter from './Components/AppFooter';

const Home = () => {
    const { user } = useContext(AuthContext);

    const [feedData, setFeedData] = useState([]);
    const [loading, setLoading] = useState(true);

    const scrollRef = useRef(true);
    const [showRecommended, setShowRecommended] = useState(false);
    const [recommendedData, setRecommendedData] = useState([]);
    const [recommendedLoading, setRecommendedLoading] = useState(true);

    useEffect(() => {
        if (user) {
            api({ token: user.token }).get('/followed/posts')
                .then(({ data }) => {
                    if (data.data.length <= 1) { // 1 or 0 posts fetched, so immediately load recommended data.
                        handleScroll();
                    }
                    setFeedData(data.data);
                    setLoading(false);
                })
                .catch((errors) => {
                    console.error(errors);
                    setLoading(false);
                });
        } else {
            api().get('/posts')
                .then(({ data }) => {
                    setFeedData(data.data);
                    setLoading(false);
                })
                .catch((errors) => {
                    console.error(errors);
                    setLoading(false);
                })
        }
    }, []);
    
    const showComments = () => {
        console.log("show comments"); // TODO
    };

    /**
     * Used with '/followed' data.
     */
    const likePost = (postID) => {
        const post = feedData.filter(obj => {
            return obj.id === postID;
        });

        if (!post[0].liked_by_current_user) {
            api({ token: user.token }).post(`/posts/${postID}/likes`)
                .then(() => {
                    setFeedData(feedData.map((prevData) =>
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
                    setFeedData(feedData.map((prevData) =>
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

    /**
     * Used with '/recommended' data.
     * Need this because we store total page data into two different states for followed and recommended posts.
     * Without this, states for recommended data won't update and thus like buttons won't update.
     */
    const likeRecommendedPost = (postID) => {
        const post = recommendedData.filter(obj => {
            return obj.id === postID;
        });

        if (!post[0].liked_by_current_user) {
            api({ token: user.token }).post(`/posts/${postID}/likes`)
                .then(() => {
                    setRecommendedData(recommendedData.map((prevData) =>
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
                    setRecommendedData(recommendedData.map((prevData) =>
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

    /**
     * Checks whether scroll position is close to the bottom of the view.
     * Used to determine the state of the recommended feed.
     */
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom
        );
    };

    const handleScroll = useCallback(async () => {
        if (user) {
            scrollRef.current = false; // Fetch recommended posts once.
            setShowRecommended(true);

            api({token: user.token}).get('/recommended/posts')
                .then(({ data }) => {
                    setRecommendedData(data.data);
                    setRecommendedLoading(false);

                    // If there are absolutely no posts to display, whether authenticated or not, don't show recommended
                    // state. This will display a message to the authenticated user to start following people or informs
                    // the unauthenticated user that there are no posts.
                    if (data.data.length === 0 && feedData.length === 0) {
                        setShowRecommended(false);
                    }
                })
                .catch((error) => {
                    setRecommendedLoading(false);
                    console.error(error);
                });
        }
    });

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
                    <ScrollView w="100%" h="100%" onScroll={({ nativeEvent}) => {
                        if (isCloseToBottom(nativeEvent) && scrollRef.current) {
                            handleScroll();
                        }
                    }} scrollEventThrottle={2}>
                        {feedData.length !== 0 ? (
                            feedData.map((data) => (
                                <Post key={ data.id } data={ data } likePost={ () => likePost(data.id) } showComments={ showComments } />
                            ))
                        ) : null}
                        {showRecommended && user ? (
                            <>
                                <Center justifyContent="space-between" pb="3" pt="2">
                                    <Text fontSize="md" color="primary.700" bold>
                                        You're all caught up!
                                    </Text>
                                    <Text fontSize="sm" color="primary.700" bold>
                                        Here are some posts we think you'll like :)
                                    </Text>
                                </Center>
                                <Divider bg="blueGray.200"/>
                                {recommendedLoading ? (
                                    <Spinner pb="2" pt="2"/>
                                ) : (
                                    <>
                                        {recommendedData.length !== 0? (
                                            recommendedData.map((data) => (
                                                <Post key={ data.id } data={ data } likePost={ () => likeRecommendedPost(data.id) } showComments={ showComments } />
                                            ))
                                        ) : null}
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                {feedData.length === 0 && recommendedData.length === 0 ? (
                                    <Center justifyContent="space-between" pb="3" pt="2">
                                        <Text fontSize="md" color="primary.700" bold>
                                            { user ? "Start following people to see cool posts!" : "No posts yet. Create an account to contribute!"}
                                        </Text>
                                    </Center>
                                ) : null }
                            </>
                        )}
                    </ScrollView>
                    <AppFooter />
                </>
            )}
        </View>
    );
};

export default Home;