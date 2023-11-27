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
    Modal,
    Input,
    VStack,
    HStack,
    Button,
    Center,
    Spinner,
    Heading,
    Divider,
    ScrollView,
    FormControl,
    WarningOutlineIcon,
} from 'native-base';

import api from './util/api';
import Post from './Components/Post';
import Comment from './Components/Comment';
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

    const [modalVisible, setModalVisible] = useState(false);
    const [commentData, setCommentData] = useState({postID: null, comments: []});
    const [comment, setComment] = useState('');
    const [commentErrors, setCommentErrors] = useState(null);

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

    const showComments = (postID, comments) => {
        setModalVisible(true);
        setComment('');
        setCommentErrors(null);
        setCommentData({postID: postID, comments: comments});
    };

    const likePost = (postID) => {
        let post = feedData.filter(obj => {
            return obj.id === postID;
        });

        if (post.length === 0) { // if the post is a recommended one
            post = recommendedData.filter(obj => {
                return obj.id === postID;
            });
        }

        if (!post[0].liked_by_current_user) {
            api({ token: user.token }).post(`/posts/${postID}/likes`)
                .then(() => {
                    setFeedData(feedData.map((prevData) =>
                        prevData.id === postID
                        ? {...prevData, liked_by_current_user: true, likes_count: prevData.likes_count + 1}
                        : prevData
                    ));
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
                    setFeedData(feedData.map((prevData) =>
                        prevData.id === postID
                            ? {...prevData, liked_by_current_user: false, likes_count: prevData.likes_count - 1}
                            : prevData
                    ));
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

    const followUser = (userId) => {
        let posts = feedData.filter(post => {
            return post.user_id === userId;
        });

        if (posts.length === 0) { // if the post is a recommended one
            posts = recommendedData.filter(post => {
                return post.user_id === userId;
            });
        }

        if (!posts[0].followed_by_current_user) {
            api({ token: user.token }).post(`/users/${userId}/follow`)
                .then(() => {
                    setFeedData(feedData.map((prevData) =>
                        prevData.user_id === userId
                            ? {...prevData, followed_by_current_user: true}
                            : prevData
                    ));
                    setRecommendedData(recommendedData.map((prevData) =>
                        prevData.user_id === userId
                            ? {...prevData, followed_by_current_user: true}
                            : prevData
                    ));
                })
                .catch(error => {
                    console.error(error);
                });
        }
        else {
            api({ token: user.token }).delete(`/users/${userId}/unfollow`)
                .then(() => {
                    setFeedData(feedData.map((prevData) =>
                        prevData.user_id === userId
                            ? {...prevData, followed_by_current_user: false}
                            : prevData
                    ));
                    setRecommendedData(recommendedData.map((prevData) =>
                        prevData.user_id === userId
                            ? {...prevData, followed_by_current_user: false}
                            : prevData
                    ));
                })
                .catch(error => {
                    console.error(error);
                });
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

    const onCommentChange = (value) => {
        setComment(value);
        setCommentErrors(null);
    }

    const submitComment = () => {
        api({ token: user.token })
            .post(`/posts/${commentData.postID}/comments`, { content: comment })
            .then(({ data }) => {
                setComment('');
                setRecommendedData(recommendedData.map((prevData) =>
                    prevData.id === commentData.postID
                        ? {...prevData, comments: data.post.comments}
                        : prevData
                ));
                setFeedData(feedData.map((prevData) =>
                    prevData.id === commentData.postID
                        ? {...prevData, comments: data.post.comments}
                        : prevData
                ));

                setCommentData({ postID: commentData.postID, comments: data.post.comments });
            })
            .catch(({ errors }) => {
                setCommentErrors(errors.content);
            })
    };

    return (
        <View h="100%">
            { loading ? (
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
                        { feedData.length !== 0 ? (
                            feedData.map((data) => (
                                <Post
                                    key={ data.id }
                                    data={ data }
                                    likePost={ () => likePost(data.id) }
                                    showComments={ showComments }
                                    followUser={ () => followUser(data.user_id)}
                                />
                            ))
                        ) : null }
                        { showRecommended && user ? (
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
                                { recommendedLoading ? (
                                    <Spinner pb="2" pt="2"/>
                                ) : (
                                    <>
                                        { recommendedData.length !== 0 ? (
                                            recommendedData.map((data) => (
                                                <Post
                                                    key={ data.id }
                                                    data={ data }
                                                    likePost={ () => likePost(data.id) }
                                                    showComments={ showComments }
                                                    followUser={ () => followUser(data.user_id) }
                                                />
                                            ))
                                        ) : null }
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                { feedData.length === 0 && recommendedData.length === 0 ? (
                                    <Center justifyContent="space-between" pb="3" pt="2">
                                        <Text fontSize="md" color="primary.700" bold>
                                            { user ? "Start following people to see cool posts!" : "No posts yet. Create an account to contribute!" }
                                        </Text>
                                    </Center>
                                ) : null }
                            </>
                        )}
                        <Modal pt="40" isOpen={ modalVisible } size="xl" onClose={ () => setModalVisible(!modalVisible) } animationPreset="slide" height="70%" avoidKeyboard>
                            <Modal.Content>
                                <Modal.CloseButton />
                                <Modal.Header>Comments</Modal.Header>
                                <Modal.Body pt="1">
                                    {
                                        commentData.comments.length !== 0 ? (
                                            commentData.comments.map((comment) => (
                                                <Comment key={ comment.id } data={ comment }/>
                                            ))
                                        ) : (
                                            <Text pt="2.5" color="primary.900">Woah, there's so mush-room in here!</Text>
                                        )
                                    }
                                </Modal.Body>
                                <Modal.Footer justifyContent="space-between">
                                    { user ? (
                                        <>
                                            <FormControl w="80%" h="100%" isInvalid={ commentErrors !== null }>
                                                <Input value={ comment } h={10} placeholder="Add a comment..." onChangeText={ onCommentChange }/>
                                                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                                    { commentErrors }
                                                </FormControl.ErrorMessage>
                                            </FormControl>
                                            <Button h={10} onPress={ submitComment }>
                                                Save
                                            </Button>
                                        </>
                                    ) : (
                                        <Text color="primary.900">
                                            Create an account to share a comment.
                                        </Text>
                                    )}
                                </Modal.Footer>
                            </Modal.Content>
                        </Modal>
                    </ScrollView>
                    <AppFooter />
                </>
            )}
        </View>
    );
};

export default Home;