import {
  Button,
  Flex,
  HStack,
  Text,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
import React, { memo, useContext, useState, VFC } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import HappyFace from '../../../images/HappyFace.png';
import AngerFace from '../../../images/AngerFace.png';
import SorrowFace from '../../../images/SorrowFace.png';
import FunFace from '../../../images/FunFace.png';
import { AuthContext } from '../../../App';
import { updateUser } from '../../../api/user';
import { UserEditModal } from '../../molecules/user/UserEditModal';
import { ProfileEmotionFaceIcon } from '../../atoms/icon/ProfileEmotionFaceIcon';

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
      <Flex
        justify="space-between"
        align="center"
        display={{ base: 'block', md: 'flex' }}
      >
        <Text fontSize={{ base: '24px', md: '32px' }} fontWeight="bold">
          Name : {currentUser.name}
        </Text>
        <Flex>
          <HStack spacing="8px">
            <ProfileEmotionFaceIcon EmotionFace={HappyFace} emotion="happy" />
            <ProfileEmotionFaceIcon EmotionFace={AngerFace} emotion="anger" />
            <ProfileEmotionFaceIcon EmotionFace={SorrowFace} emotion="sorrow" />
            <ProfileEmotionFaceIcon EmotionFace={FunFace} emotion="fun" />
          </HStack>
        </Flex>
      </Flex>
      <Text fontSize={{ base: '24px', md: '32px' }} fontWeight="bold">
        Email : {currentUser.email}
      </Text>
      <Flex
        mt="16px"
        mb="40px"
        justify={{ base: 'flex-start', md: 'space-between' }}
        align="center"
      >
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
          ml={{ base: '16px' }}
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
