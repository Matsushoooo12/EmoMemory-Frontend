import {
  Button,
  Flex,
  HStack,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  useDisclosure,
  Box,
  Heading,
  InputGroup,
  Stack,
  Input,
} from "@chakra-ui/react";
import React, { memo, useContext, useState, VFC } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import HappyFace from "../../../images/喜01.png";
import AngerFace from "../../../images/怒01.png";
import SorrowFace from "../../../images/哀01.png";
import FunFace from "../../../images/楽01.png";
import { AuthContext } from "../../../App";
import { updateUser } from "../../../api/user";

export const Profile: VFC = memo(() => {
  // const { currentUser } = useContext<any>(AuthContext);
  const { currentUser } = useContext<any>(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [emotionFace, setEmotionFace] = useState(currentUser.emotion);
  const [name, setName] = useState("");

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
    setEmotionFace("happy");
  };
  const onClickAngerFace = () => {
    setEmotionFace("anger");
  };
  const onClickSorrowFace = () => {
    setEmotionFace("sorrow");
  };
  const onClickFunFace = () => {
    setEmotionFace("fun");
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
                currentUser.emotion === "happy" ? "5px solid yellow" : "none"
              }
              shadow={currentUser.emotion === "happy" ? "md" : "none"}
            />
            <Image
              src={AngerFace}
              width="60px"
              height="60px"
              border={
                currentUser.emotion === "anger" ? "5px solid red" : "none"
              }
              shadow={currentUser.emotion === "anger" ? "md" : "none"}
            />
            <Image
              src={SorrowFace}
              width="60px"
              height="60px"
              border={
                currentUser.emotion === "sorrow" ? "5px solid blue" : "none"
              }
              shadow={currentUser.emotion === "sorrow" ? "md" : "none"}
            />
            <Image
              src={FunFace}
              width="60px"
              height="60px"
              border={
                currentUser.emotion === "fun" ? "5px solid green" : "none"
              }
              shadow={currentUser.emotion === "fun" ? "md" : "none"}
            />
          </HStack>
        </Flex>
      </Flex>
      <Text fontSize="32px" fontWeight="bold">
        Email : {currentUser.email}
      </Text>
      <Flex mt="16px" mb="40px" justify="space-between" align="center">
        <Text fontSize="16px" fontWeight="bold">
          post : 27 ・ like : 23
        </Text>
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent shadow="md" width="480px" height="430px">
          <ModalBody textAlign="center">
            <Flex justify="space-between">
              <Image
                width="64px"
                height="64px"
                marginLeft="-56px"
                marginTop="-48px"
                src={HappyFace}
                alt="HappyFace"
              />
              <Image
                width="64px"
                height="64px"
                src={AngerFace}
                alt="AngerFace"
                marginRight="-56px"
                marginTop="-48px"
              />
            </Flex>
            <ModalCloseButton
              mt="16px"
              mr="16px"
              fontSize="16px"
              fontWeight="bold"
            />
            <Box width="320px" mx="auto">
              <Heading as="h1" fontSize="32px" mt="20px" mb="32px">
                プロフィール編集
              </Heading>
              <form>
                <InputGroup display="block" position="relative">
                  <Stack spacing="24px">
                    <Input
                      type="hidden"
                      name="emotion"
                      onChange={handleEmotionChange}
                      value={emotionFace}
                    />
                    <Input
                      placeholder="名前"
                      value={name}
                      onChange={handleNameChange}
                      type="text"
                      name="name"
                      variant="flushed"
                      focusBorderColor="#47789F"
                      mb="24px"
                    />
                    <Box>
                      <Heading as="h2" fontSize="24px" mb="16px">
                        あなたの今の感情は？
                      </Heading>
                      <Flex justify="center">
                        <HStack spacing="8px">
                          <Image
                            src={HappyFace}
                            width="60px"
                            height="60px"
                            border={
                              emotionFace === "happy"
                                ? "5px solid yellow"
                                : "none"
                            }
                            shadow={emotionFace === "happy" ? "md" : "none"}
                            onClick={onClickHappyFace}
                          />
                          <Image
                            src={AngerFace}
                            width="60px"
                            height="60px"
                            border={
                              emotionFace === "anger" ? "5px solid red" : "none"
                            }
                            shadow={emotionFace === "anger" ? "md" : "none"}
                            onClick={onClickAngerFace}
                          />
                          <Image
                            src={SorrowFace}
                            width="60px"
                            height="60px"
                            border={
                              emotionFace === "sorrow"
                                ? "5px solid blue"
                                : "none"
                            }
                            shadow={emotionFace === "sorrow" ? "md" : "none"}
                            onClick={onClickSorrowFace}
                          />
                          <Image
                            src={FunFace}
                            width="60px"
                            height="60px"
                            border={
                              emotionFace === "fun" ? "5px solid green" : "none"
                            }
                            shadow={emotionFace === "fun" ? "md" : "none"}
                            onClick={onClickFunFace}
                          />
                        </HStack>
                      </Flex>
                    </Box>
                    <Flex justify="center">
                      <HStack spacing="16px">
                        <Button
                          _hover={{ opacity: 0.8 }}
                          bg="#47789F"
                          color="white"
                          width="80px"
                          onClick={(e) => handleUpdateUser(e)}
                        >
                          投稿
                        </Button>
                        <Button
                          border="3px solid #47789F"
                          color="#47789F"
                          width="80px"
                        >
                          リセット
                        </Button>
                      </HStack>
                    </Flex>
                  </Stack>
                </InputGroup>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});
