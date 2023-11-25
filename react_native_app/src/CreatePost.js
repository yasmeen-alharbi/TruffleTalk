import React, {
    useState,
    useContext,
    useCallback,
} from 'react';
import {
    Box,
    Text,
    View,
    Input,
    Center,
    Button,
    Select,
    HStack,
    VStack,
    Heading,
    TextArea,
    CheckIcon,
    FormControl,
    WarningOutlineIcon,
} from 'native-base';
import { Image } from 'react-native';
import { useNavigate } from 'react-router-dom';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import api from './util/api';
import { AuthContext } from './AuthProvider';
import AppHeader from './Components/AppHeader';
import AppFooter from './Components/AppFooter';

const CreatePost = () => {
    const MUSHROOMS = ['mushroom1', 'mushroom2', 'mushroom3']; // TODO: might be temporary

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    // Form data transforms null into "null" so empty string initial values are required for BE validation.
    const [data, setData] = useState({
        title: '',
        mushroom: '',
        description: '',
        image: '',
    });
    const [error, setError] = useState({
        title: null,
        mushroom: null,
        description: null,
        image: '',
    });

    const goBack = () => { navigate('/home'); };

    const openPhotos = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setError({ ...error, image: '' });
        }
    }

    const onChange = (field, value) => {
        if (field === 'title') {
            setError({ ...error, title: null });
            setData({ ...data, title: value });
        }
        else if (field === 'mushroom') {
            setError({ ...error, mushroom: null });
            setData({ ...data, mushroom: value });
        }
        else if (field === 'description') {
            setError({ ...error, description: null });
            setData({ ...data, description: value });
        }
    };

    const submit = useCallback(async () => {
        if (!image) { // FormData() throws an error so this is needed.
            setError({ ...error, image: "An image is required."});
        }
        else {
            const formData = new FormData();

            const fileName = image.split('/').pop();
            const fileExtension = fileName.split('.').pop();
            formData.append("image", {
                uri: image,
                name: fileName,
                type: `image/${fileExtension}`,
            });
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("mushroom", data.mushroom)

            api({
                token: user.token,
                contentType: 'multipart/form-data'
            }).post('/posts', formData)
                .then(({ data }) => {
                    navigate('/home');
                })
                .catch(({ errors }) => {
                    setError(errors);
                });
        }
    });

    return (
      <View h="100%">
          <AppHeader />
          <KeyboardAwareScrollView h="100%">
              <Center pt="5">
                  <Heading size="lg" color="primary.700">
                      Show off your fun-guy!
                  </Heading>
                  <Center maxW="70%">
                      <FormControl pt="3" isInvalid={ error?.title }>
                          <FormControl.Label>
                              Title
                          </FormControl.Label>
                          <Input w="64" onChangeText={value => onChange('title', value)}/>
                          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                              { error?.title }
                          </FormControl.ErrorMessage>
                      </FormControl>
                      <FormControl pt="3" isInvalid={ error?.mushroom }>
                          <FormControl.Label>
                              Mushroom
                          </FormControl.Label>
                          <Select w="64" selectedValue={data.mushroom} placeholder="Choose a Mushroom" _selectedItem={{
                              endIcon: <CheckIcon />
                          }} onValueChange={value => onChange('mushroom', value)} _actionSheetBody={{ scrollEnabled: false }}>
                              {MUSHROOMS.map((mushroom, index) => (
                                  <Select.Item key={index} label={mushroom} value={mushroom} />
                              ))}
                          </Select>
                          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                              { error?.mushroom }
                          </FormControl.ErrorMessage>
                      </FormControl>
                      <FormControl pt="3" isInvalid={ error?.description }>
                          <FormControl.Label>
                              Description
                          </FormControl.Label>
                          <TextArea w="64" onChangeText={value => onChange('description', value)}/>
                          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                              { error?.description }
                          </FormControl.ErrorMessage>
                      </FormControl>
                      <HStack justifyContent="space-between" alignContent="center" w="64" pt="3">
                          <FormControl.Label>
                              { !image ? "Upload an Image" : "Choose a different image "}
                          </FormControl.Label>
                          <Button _text={{fontWeight:"medium"}} borderRadius="full" shadow="5" onPress={openPhotos}>
                              Upload
                          </Button>
                      </HStack>
                      <FormControl isInvalid={ error?.image !== '' }>
                          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                              { error?.image }
                          </FormControl.ErrorMessage>
                      </FormControl>
                  </Center>
              </Center>
              <HStack justifyContent="center" alignContent="center">
                  <VStack justifyContent="space-between" alignContent="center" pt="3" space="3">
                      { image ? (
                          <>
                              <HStack justifyContent="center" alignContent="center">
                                  <Text>
                                      Image Preview
                                  </Text>
                              </HStack>
                              <Box w="40" h="40" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" bg="gray.50" mb="3">
                                  <Image width="100%" height="100%" resizeMode="contain" source={{ uri: image }} alt='Alt text'/>
                              </Box>
                          </>
                      ) : null }
                      <Button _text={{fontWeight:"medium"}} borderRadius="full" w="40" shadow="5" onPress={submit} mb="3">
                          SUBMIT
                      </Button>
                      <Button  borderRadius="full" shadow="5" w="40" variant="subtle" onPress={goBack} mb="5">
                          CANCEL
                      </Button>
                  </VStack>
              </HStack>
          </KeyboardAwareScrollView>
          <AppFooter />
      </View>
    );
};

export default CreatePost;