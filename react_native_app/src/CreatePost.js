import React, {
    useState,
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
} from 'native-base';
import { Image } from 'react-native';
import { useNavigate } from 'react-router-dom';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AppHeader from './Components/AppHeader';
import AppFooter from './Components/AppFooter';

const CreatePost = () => {

    const MUSHROOMS = ['mushroom1', 'mushroom2', 'mushroom3']; // TODO: might be temporary

    const navigate = useNavigate();

    const [formData, setData] = useState({
        title: null,
        mushroom: '',
        description: null,
        image: '',
    });
    const [error, setError] = useState({
        title: null,
        mushroom: null,
        description: null,
        image: null,
    });

    const goBack = () => { navigate('/home'); };

    const openPhotos = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setData({ ...formData, image: result.assets[0].uri });
        }
    }

    const onChange = (field, value) => {
        if (field === 'title') {
            setError({ ...error, title: null });
            setData({ ...formData, title: value });
        }
        else if (field === 'mushroom') {
            setError({ ...error, mushroom: null });
            setData({ ...formData, mushroom: value });
        }
        else if (field === 'description') {
            setError({ ...error, description: null });
            setData({ ...formData, description: value });
        }
        else if (field === 'image') {
            setError({ ...error, image: null });
            setData({ ...formData, image: value });
        }
    };

    const submit = useCallback(async () => {
        console.log(formData);
    });

    return (
      <View h="100%">
          <AppHeader />
          <KeyboardAwareScrollView h="100%">
              <Center pt="5">
                  <Heading size="lg" color="primary.700">
                      Show off your fun-guy ;3 {/* i hate myself */}
                  </Heading>
                  <Center maxW="70%">
                      <FormControl pt="3">
                          <FormControl.Label>
                              Title
                          </FormControl.Label>
                          <Input w="64" onChangeText={value => onChange('title', value)}/>
                      </FormControl>
                      <FormControl pt="3">
                          <FormControl.Label>
                              Mushroom
                          </FormControl.Label>
                          {/* TODO: make dropdown scrollable using a different component */}
                          <Select w="64" selectedValue={formData.mushroom} placeholder="Choose a Mushroom" _selectedItem={{
                              endIcon: <CheckIcon />
                          }} onValueChange={value => onChange('mushroom', value)} _actionSheetBody={{ scrollEnabled: false }}>
                              {MUSHROOMS.map((mushroom, index) => (
                                  <Select.Item key={index} label={mushroom} value={mushroom} />
                              ))}
                          </Select>
                      </FormControl>
                      <FormControl pt="3">
                          <FormControl.Label>
                              Description
                          </FormControl.Label>
                          <TextArea w="64" onChangeText={value => onChange('description', value)}/>
                      </FormControl>
                      <HStack justifyContent="space-between" alignContent="center" w="64" pt="3">
                          <FormControl.Label>
                              { formData.image === '' ? "Upload an Image" : "Choose a different image "}
                          </FormControl.Label>
                          <Button _text={{fontWeight:"medium"}} borderRadius="full" shadow="5" onPress={openPhotos}>
                              Upload
                          </Button>
                      </HStack>
                  </Center>
              </Center>
              <HStack justifyContent="center" alignContent="center">
                  <VStack justifyContent="space-between" alignContent="center" pt="3" space="3">
                      { formData.image !== '' ? (
                          <>
                              <HStack justifyContent="center" alignContent="center">
                                  <Text>
                                      Image Preview
                                  </Text>
                              </HStack>
                              <Box w="40" h="40" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" bg="gray.50" mb="3">
                                  <Image width="100%" height="100%" resizeMode="contain" source={{ uri: formData.image }} alt='Alt text'/>
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