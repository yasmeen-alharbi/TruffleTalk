import {
    View,
    Input,
    Center,
    Button,
    Select,
    Heading,
    TextArea,
    CheckIcon,
    FormControl,
} from 'native-base';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AppHeader from './Components/AppHeader';
import AppFooter from './Components/AppFooter';

const CreatePost = () => {
    const navigate = useNavigate();

    const MUSHROOMS = ['mushroom1', 'mushroom2', 'mushroom3'];
    const [selectedMushroom, setSelectedMushroom] = useState('');

    const goBack = () => { navigate('/home'); };

    return (
      <View h="100%">
          <AppHeader />
          <KeyboardAwareScrollView h="100%">
              <Center pt="5">
                  <Heading size="lg" color="primary.700">
                      Show off your fun-guy ;) {/* i hate myself */}
                  </Heading>
                  <Center maxW="70%" pt="3.5">
                      <FormControl>
                          <FormControl.Label>
                              Title
                          </FormControl.Label>
                          <Input w="64"/>
                      </FormControl>
                      <FormControl>
                          <FormControl.Label>
                              Mushroom
                          </FormControl.Label>
                          {/* TODO: make dropdown scrollable with another component */}
                          <Select w="64" selectedValue={selectedMushroom} placeholder="Choose a Mushroom" _selectedItem={{
                              endIcon: <CheckIcon />
                          }} onValueChange={value => setSelectedMushroom(value)} _actionSheetBody={{ scrollEnabled: false }}>
                              {MUSHROOMS.map((mushroom, index) => (
                                  <Select.Item key={index} label={mushroom} value={mushroom} />
                              ))}
                          </Select>
                      </FormControl>
                      <FormControl>
                          <FormControl.Label>
                              Description
                          </FormControl.Label>
                          <TextArea w="64"/>
                      </FormControl>
                      <FormControl>
                          <FormControl.Label>
                              Upload an Image
                          </FormControl.Label>
                          <Input w="64"/>
                      </FormControl>
                      <Button _text={{fontWeight:"medium"}} borderRadius="full" mt="10" w="40" shadow="5">
                          SUBMIT
                      </Button>
                      <Button mt="5" borderRadius="full" shadow="5" w="40" variant="subtle" onPress={goBack}>
                          CANCEL
                      </Button>
                  </Center>
              </Center>
          </KeyboardAwareScrollView>
          <AppFooter />
      </View>
    );
};

export default CreatePost;