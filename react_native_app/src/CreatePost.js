import React, {
    useState,
    useContext,
    useCallback,
    useMemo,
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
import {
    Image,
    Keyboard,
    LogBox,
    TouchableWithoutFeedback
} from 'react-native';
import { useNavigate } from 'react-router-dom';
import * as ImagePicker from 'expo-image-picker';

import api from './util/api';
import MUSHROOMS from './Mushrooms';
import { AuthContext } from './AuthProvider';
import AppHeader from './Components/AppHeader';
import AppFooter from './Components/AppFooter';

const CreatePost = () => {
    LogBox.ignoreLogs([ // ignores warning for demo
        'Warning: Each child in a list should have a unique "key" prop.',
    ]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    // Form data transforms null into "null" so empty string initial values are required for BE validation.
    const [data, setData] = useState({
        title: '',
        mushroom: '',
        description: '',
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
            formData.append("mushroom", data.mushroom);

            api({
                token: user.token,
                contentType: 'multipart/form-data'
            }).post('/posts', formData)
                .then(() => {
                    navigate('/home');
                })
                .catch(({ errors }) => {
                    setError(errors);
                });
        }
    });

    const MushroomSelect = useMemo(() => [
        <Select
            w="64"
            placeholder="Choose a Mushroom"
            selectedValue={ data.mushroom }
            _selectedItem={{ endIcon: <CheckIcon/> }}
            onValueChange={ value => onChange('mushroom', value) }
            _actionSheetBody={{ scrollEnabled: true }}
        >
            {MUSHROOMS.map((mushroom ) => (
                <Select.Item key={ mushroom } label={ mushroom } value={ mushroom }/>
            ))}
        </Select>
    ], [MUSHROOMS, data]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View h="100%">
              <AppHeader />
              <View h="77%">
                  <Center pt="5">
                      <Heading size="lg" color="primary.700">
                          Share your mushroom find!
                      </Heading>
                      <Center maxW="70%">
                          <FormControl pt="1" isInvalid={ error?.title }>
                              <FormControl.Label>
                                  Title
                              </FormControl.Label>
                              <Input w="64" onChangeText={value => onChange('title', value)}/>
                              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                  { error?.title }
                              </FormControl.ErrorMessage>
                          </FormControl>
                          <FormControl pt="1" isInvalid={ error?.mushroom }>
                              <FormControl.Label>
                                  Mushroom
                              </FormControl.Label>
                              {MushroomSelect}
                              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                  { error?.mushroom }
                              </FormControl.ErrorMessage>
                          </FormControl>
                          <FormControl pt="1" isInvalid={ error?.description }>
                              <FormControl.Label>
                                  Description
                              </FormControl.Label>
                              <TextArea w="64" h="12" onChangeText={value => onChange('description', value)}/>
                              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                  { error?.description }
                              </FormControl.ErrorMessage>
                          </FormControl>
                          <HStack justifyContent="space-between" alignContent="center" w="64" pt="1">
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
                      <VStack justifyContent="space-between" alignContent="center" pt="1" space="1">
                          { image ? (
                              <>
                                  <HStack justifyContent="center" alignContent="center">
                                      <Text>
                                          Image Preview
                                      </Text>
                                  </HStack>
                                  <Box w="40" h="40" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" bg="gray.50" mb="1">
                                      <Image style={{ width: "100%", height: "100%"}} resizeMode="contain" source={{ uri: image }} alt='preview image'/>
                                  </Box>
                              </>
                          ) : null }
                          <Button _text={{fontWeight:"medium"}} borderRadius="full" w="40" shadow="5" onPress={submit} mb="3">
                              SUBMIT
                          </Button>
                          <Button  borderRadius="full" shadow="5" w="40" variant="subtle" onPress={goBack}>
                              CANCEL
                          </Button>
                      </VStack>
                  </HStack>
              </View>
          </View>
        </TouchableWithoutFeedback>
    );
};

export default CreatePost;