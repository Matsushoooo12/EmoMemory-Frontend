import {
  Button,
  Flex,
  HStack,
  Image,
  Text,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
import React, { memo, useContext, useState, VFC } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import HappyFace from '../../../images/喜01.png';
import AngerFace from '../../../images/怒01.png';
import SorrowFace from '../../../images/哀01.png';
import FunFace from '../../../images/楽01.png';
import { AuthContext } from '../../../App';
import { updateUser } from '../../../api/user';
import { UserEditModal } from '../../molecules/user/UserEditModal';

export const Profile: VFC = memo(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useContext<any>(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [emotionFace, setEmotionFace] = useState(currentUser.emotion);
  const [name, setName] = useState(currentUser.name);

  const generateParams = () => {
    const userEditParams = {
      name: name,
      emotion: emotionFace,
    };
    return userEditParams;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmotionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmotionFace(e.target.value);
  };

  const handleUpdateUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const params = generateParams();
    try {
      const res = await updateUser(currentUser.id, params);
      console.log(res);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const onClickHappyFace = () => {
    setEmotionFace('happy');
  };
  const onClickAngerFace = () => {
    setEmotionFace('anger');
  };
  const onClickSorrowFace = () => {
    setEmotionFace('sorrow');
  };
  const onClickFunFace = () => {
    setEmotionFace('fun');
  };

  const handleReset = () => {
    setName('');
  };

  return (
    <>
      <Flex justify="space-between" align="center">
        <Text fontSize="32px" fontWeight="bold">
          Name : {currentUser.name}
        </Text>
        <Flex>
          <HStack spacing="8px">
            <Image
              src={HappyFace}
              width="60px"
              height="60px"
              border={
                currentUser.emotion === 'happy' ? '5px solid yellow' : 'none'
              }
              shadow={currentUser.emotion === 'happy' ? 'md' : 'none'}
            />
            <Image
              src={AngerFace}
              width="60px"
              height="60px"
              border={
                currentUser.emotion === 'anger' ? '5px solid red' : 'none'
              }
              shadow={currentUser.emotion === 'anger' ? 'md' : 'none'}
            />
            <Image
              src={SorrowFace}
              width="60px"
              height="60px"
              border={
                currentUser.emotion === 'sorrow' ? '5px solid blue' : 'none'
              }
              shadow={currentUser.emotion === 'sorrow' ? 'md' : 'none'}
            />
            <Image
              src={FunFace}
              width="60px"
              height="60px"
              border={
                currentUser.emotion === 'fun' ? '5px solid green' : 'none'
              }
              shadow={currentUser.emotion === 'fun' ? 'md' : 'none'}
            />
          </HStack>
        </Flex>
      </Flex>
      <Text fontSize="32px" fontWeight="bold">
        Email : {currentUser.email}
      </Text>
      <Flex mt="16px" mb="40px" justify="space-between" align="center">
        <Flex fontSize="16px" fontWeight="bold">
          <HStack spacing="16px">
            <Text>post : {currentUser.posts.length}</Text>
            <Text>like : {currentUser.likes}</Text>
          </HStack>
        </Flex>
        <Button
          onClick={onOpen}
          _hover={{ opacity: 0.8 }}
          bg="white"
          width="160px"
          shadow="md"
        >
          Edit Profile
        </Button>
      </Flex>
      <Box bg="white" shadow="md" p="24px" borderRadius="md">
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
      </Box>
      {/* プロフィール編集モーダル */}
      <UserEditModal
        isOpen={isOpen}
        onClose={onClose}
        handleEmotionChange={handleEmotionChange}
        emotionFace={emotionFace}
        name={name}
        handleNameChange={handleNameChange}
        onClickHappyFace={onClickHappyFace}
        onClickAngerFace={onClickAngerFace}
        onClickSorrowFace={onClickSorrowFace}
        onClickFunFace={onClickFunFace}
        handleUpdateUser={handleUpdateUser}
        handleReset={handleReset}
      />
    </>
  );
});
