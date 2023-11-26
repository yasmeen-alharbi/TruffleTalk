import React from 'react';
import {
    Text,
    HStack,
    VStack,
    Divider,
} from 'native-base';
import moment from 'moment';

const Comment = ({ data }) => {
    const date = moment(data.created_at);
    const formattedDate = date.utc().format('DD/MM/YY');

    return (
        <VStack justifyContent="space-between" space={1} pt={"1"}>
            <HStack justifyContent="space-between">
                <Text fontSize="md" bold>
                    {`@${data.author}`}
                </Text>
                <Text fontSize="xs" color="muted.500">{ formattedDate }</Text>
            </HStack>
            <Text fontSize="xs" pb="3">
                { data.content }
            </Text>
            <Divider bg="muted.400"/>
        </VStack>
    );
};

export default Comment;