import {
  Box,
  Text,
  Image,
  Flex,
  HStack,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Button,
  Input,
  ModalCloseButton,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { memo, useContext, useEffect, useState, VFC } from "react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import "../../../App.css";

import HappyFace from "../../../images/喜01.png";
import HappyCard from "../../../images/喜付箋.png";
import AngerFace from "../../../images/怒01.png";
import AngerCard from "../../../images/怒付箋.png";
import SorrowFace from "../../../images/哀01.png";
import SorrowCard from "../../../images/哀付箋.png";
import FunFace from "../../../images/楽01.png";
import FunCard from "../../../images/楽付箋.png";
import LikeButton from "../../../images/それなスタンプ.png";
import { Post } from "../../../types/post";
import { deletePost, getAllPosts, updatePost } from "../../../api/post";
import { AuthContext } from "../../../App";

export const Index: VFC = memo(() => {
  const [posts, setPosts] = useState<Post[]>([]);

  const { currentUser } = useContext<any>(AuthContext);

  const [value, setValue] = useState({
    id: 0,
    userId: 0,
    emotion: "",
    content: "",
    createdAt: "",
  });
  const [emotion, setEmotion] = useState("");

  const onClickAll = () => {
    setEmotion("");
  };

  const onClickHappy = () => {
    setEmotion("happy");
  };

  const onClickAnger = () => {
    setEmotion("anger");
  };

  const onClickSorrow = () => {
    setEmotion("sorrow");
  };

  const onClickFun = () => {
    setEmotion("fun");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickModalPost = (
    id: number,
    userId: number,
    emotion: string,
    content: string,
    createdAt: string
  ) => {
    setValue({
      id: id,
      userId: userId,
      emotion: emotion,
      content: content,
      createdAt: createdAt,
    });
    onOpen();
  };

  const handleGetAllPosts = async () => {
    try {
      const res = await getAllPosts();
      console.log(res);
      setPosts(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetAllPosts();
  }, []);

  const cardColor = (emotion: string) => {
    if (emotion === "happy") {
      return "#FFF7D4";
    } else if (emotion === "anger") {
      return "#FFD6D7";
    } else if (emotion === "sorrow") {
      return "#DCE3FF";
    } else if (emotion === "fun") {
      return "#E2FFEB";
    }
  };

  const textareaColor = (emotion: string) => {
    if (emotion === "happy") {
      return "textarea note happy index";
    } else if (emotion === "anger") {
      return "textarea note anger index";
    } else if (emotion === "sorrow") {
      return "textarea note sorrow index";
    } else if (emotion === "fun") {
      return "textarea note fun index";
    }
  };

  const generateParams = () => {
    const updateParams = {
      content: value.content,
      emotion: value.emotion,
    };
    return updateParams;
  };

  const handleChange = (e: any) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const params = generateParams();
    try {
      const res = await updatePost(value.id, params);
      console.log(res.data);
      handleGetAllPosts();
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (item: any) => {
    console.log("click", item.id);
    try {
      const res = await deletePost(item.id);
      console.log(res.data);
      handleGetAllPosts();
      onClose();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box pt="80px" width="100%" height="100%" minHeight="100vh">
      <Box width="80%" mx="auto" mt="80px">
        <Box width="500px" mx="auto">
          <Flex justify="center" mx="40px" mb="40px">
            <HStack spacing="24px">
              <Flex
                bg="red"
                color="white"
                width="44px"
                height="44px"
                borderRadius="50%"
                mt="12px"
                mb="2px"
                mr="12px"
                border="3px solid yellow"
                justify="center"
                align="center"
                fontWeight="bold"
                onClick={onClickAll}
                cursor="pointer"
              >
                All
              </Flex>
              <Image
                width="64px"
                height="64px"
                src={HappyFace}
                alt="HappyFace"
                cursor="pointer"
                onClick={onClickHappy}
              />
              <Image
                width="64px"
                height="64px"
                src={AngerFace}
                alt="AngerFace"
                cursor="pointer"
                onClick={onClickAnger}
              />
              <Image
                width="64px"
                height="64px"
                src={SorrowFace}
                alt="SorrowFace"
                cursor="pointer"
                onClick={onClickSorrow}
              />
              <Image
                width="64px"
                height="64px"
                src={FunFace}
                alt="FunFace"
                cursor="pointer"
                onClick={onClickFun}
              />
            </HStack>
          </Flex>
        </Box>
        <Wrap spacing="40px">
          {posts.map((post) => (
            <React.Fragment key={post.id}>
              {post.emotion === emotion && (
                <WrapItem
                  width="200px"
                  height="200px"
                  bg={cardColor(post.emotion)}
                  borderRadius="md"
                  justifyContent="center"
                  cursor="pointer"
                  onClick={() =>
                    onClickModalPost(
                      post.id,
                      post.user.id,
                      post.emotion,
                      post.content,
                      post.createdAt
                    )
                  }
                >
                  <Box textAlign="center">
                    <Textarea
                      cursor="pointer"
                      isReadOnly
                      mt="24px"
                      resize="none"
                      variant="unstyled"
                      className={textareaColor(post.emotion)}
                      width="100%"
                      height="140px"
                      fontSize="12px"
                      defaultValue={post.content}
                    ></Textarea>
                    <Flex justify="space-between" align="center">
                      <Text fontSize="12px">
                        {dayjs(post.createdAt).format("YYYY/MM/DD")}
                      </Text>
                      <Flex align="center">
                        <HStack spacing={1}>
                          <Image
                            src={LikeButton}
                            alt="LikeButton"
                            width="24px"
                            height="24px"
                          />
                          <Text fontSize="12px">12</Text>
                        </HStack>
                      </Flex>
                    </Flex>
                  </Box>
                </WrapItem>
              )}
              {emotion === "" && (
                <WrapItem
                  width="200px"
                  height="200px"
                  bg={cardColor(post.emotion)}
                  borderRadius="md"
                  justifyContent="center"
                  onClick={() =>
                    onClickModalPost(
                      post.id,
                      post.user.id,
                      post.emotion,
                      post.content,
                      post.createdAt
                    )
                  }
                  cursor="pointer"
                >
                  <Box textAlign="center">
                    <Textarea
                      cursor="pointer"
                      isReadOnly
                      mt="24px"
                      resize="none"
                      variant="unstyled"
                      className={textareaColor(post.emotion)}
                      width="100%"
                      height="140px"
                      fontSize="12px"
                      defaultValue={post.content}
                    ></Textarea>
                    <Flex justify="space-between" align="center">
                      <Text fontSize="12px">
                        {dayjs(post.createdAt).format("YYYY/MM/DD")}
                      </Text>
                      <Flex align="center">
                        <HStack spacing={1}>
                          <Image
                            src={LikeButton}
                            alt="LikeButton"
                            width="24px"
                            height="24px"
                          />
                          <Text fontSize="12px">12</Text>
                        </HStack>
                      </Flex>
                    </Flex>
                  </Box>
                </WrapItem>
              )}
            </React.Fragment>
          ))}
        </Wrap>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="none" border="none" shadow="none">
          <ModalCloseButton mr="64px" mt="100px" />
          {currentUser.id === value.userId ? (
            <form>
              {value.emotion === "happy" && (
                <Box
                  bgImage={HappyCard}
                  bgPosition="center"
                  bgSize="cover"
                  bgRepeat="no-repeat"
                  width="400px"
                  height="400px"
                  cursor="pointer"
                >
                  <Box textAlign="center" pt="150px">
                    <Input
                      type="hidden"
                      name="emotion"
                      onChange={handleChange}
                    />
                    <Textarea
                      resize="none"
                      variant="unstyled"
                      className="textarea note happy"
                      width="60%"
                      height="200px"
                      onChange={handleChange}
                      value={value.content}
                      name="content"
                    ></Textarea>
                    <Flex
                      justify="space-between"
                      align="center"
                      width="100%"
                      px="80px"
                    >
                      <Text fontSize="14px">
                        {dayjs(value.createdAt).format("YYYY/MM/DD")}
                      </Text>
                      <Flex align="center">
                        <HStack spacing={1}>
                          <Image
                            src={LikeButton}
                            alt="LikeButton"
                            width="32px"
                            height="32px"
                          />
                          <Text fontSize="14px">12</Text>
                        </HStack>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              )}
              {value.emotion === "anger" && (
                <Box
                  bgImage={AngerCard}
                  bgPosition="center"
                  bgSize="cover"
                  bgRepeat="no-repeat"
                  width="400px"
                  height="400px"
                  cursor="pointer"
                >
                  <Box textAlign="center" pt="150px">
                    <Input
                      type="hidden"
                      name="emotion"
                      onChange={handleChange}
                    />
                    <Textarea
                      resize="none"
                      variant="unstyled"
                      className="textarea note anger"
                      width="60%"
                      height="200px"
                      onChange={handleChange}
                      value={value.content}
                      name="content"
                    ></Textarea>
                    <Flex
                      justify="space-between"
                      align="center"
                      width="100%"
                      px="80px"
                    >
                      <Text fontSize="14px">
                        {dayjs(value.createdAt).format("YYYY/MM/DD")}
                      </Text>
                      <Flex align="center">
                        <HStack spacing={1}>
                          <Image
                            src={LikeButton}
                            alt="LikeButton"
                            width="32px"
                            height="32px"
                          />
                          <Text fontSize="14px">12</Text>
                        </HStack>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              )}
              {value.emotion === "sorrow" && (
                <Box
                  bgImage={SorrowCard}
                  bgPosition="center"
                  bgSize="cover"
                  bgRepeat="no-repeat"
                  width="400px"
                  height="400px"
                  cursor="pointer"
                >
                  <Box textAlign="center" pt="150px">
                    <Input
                      type="hidden"
                      name="emotion"
                      onChange={handleChange}
                    />
                    <Textarea
                      resize="none"
                      variant="unstyled"
                      className="textarea note sorrow"
                      width="60%"
                      height="200px"
                      onChange={handleChange}
                      value={value.content}
                      name="content"
                    ></Textarea>
                    <Flex
                      justify="space-between"
                      align="center"
                      width="100%"
                      px="80px"
                    >
                      <Text fontSize="14px">
                        {dayjs(value.createdAt).format("YYYY/MM/DD")}
                      </Text>
                      <Flex align="center">
                        <HStack spacing={1}>
                          <Image
                            src={LikeButton}
                            alt="LikeButton"
                            width="32px"
                            height="32px"
                          />
                          <Text fontSize="14px">12</Text>
                        </HStack>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              )}
              {value.emotion === "fun" && (
                <Box
                  bgImage={FunCard}
                  bgPosition="center"
                  bgSize="cover"
                  bgRepeat="no-repeat"
                  width="400px"
                  height="400px"
                  cursor="pointer"
                >
                  <Box textAlign="center" pt="150px">
                    <Input
                      type="hidden"
                      name="emotion"
                      onChange={handleChange}
                    />
                    <Textarea
                      resize="none"
                      variant="unstyled"
                      className="textarea note fun"
                      width="60%"
                      height="200px"
                      onChange={handleChange}
                      value={value.content}
                      name="content"
                    ></Textarea>
                    <Flex
                      justify="space-between"
                      align="center"
                      width="100%"
                      px="80px"
                    >
                      <Text fontSize="14px">
                        {dayjs(value.createdAt).format("YYYY/MM/DD")}
                      </Text>
                      <Flex align="center">
                        <HStack spacing={1}>
                          <Image
                            src={LikeButton}
                            alt="LikeButton"
                            width="32px"
                            height="32px"
                          />
                          <Text fontSize="14px">12</Text>
                        </HStack>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              )}
              <Flex justify="center" mt="16px">
                <HStack spacing="16px">
                  <Button
                    _hover={{ opacity: 0.8 }}
                    bg="#47789F"
                    color="white"
                    width="80px"
                    onClick={(e) => handleSubmit(e)}
                  >
                    編集
                  </Button>
                  <Button
                    border="3px solid #47789F"
                    color="#47789F"
                    width="80px"
                    onClick={() => handleDelete(value)}
                  >
                    削除
                  </Button>
                </HStack>
              </Flex>
            </form>
          ) : (
            <>
              {value.emotion === "happy" && (
                <Box
                  bgImage={HappyCard}
                  bgPosition="center"
                  bgSize="cover"
                  bgRepeat="no-repeat"
                  width="400px"
                  height="400px"
                  onClick={onClose}
                  cursor="pointer"
                >
                  <Box textAlign="center" pt="150px">
                    <Textarea
                      cursor="pointer"
                      resize="none"
                      variant="unstyled"
                      className="textarea note happy"
                      width="60%"
                      height="200px"
                      readOnly
                      defaultValue={value.content}
                    ></Textarea>
                    <Flex
                      justify="space-between"
                      align="center"
                      width="100%"
                      px="80px"
                    >
                      <Text fontSize="14px">
                        {dayjs(value.createdAt).format("YYYY/MM/DD")}
                      </Text>
                      <Flex align="center">
                        <HStack spacing={1}>
                          <Image
                            src={LikeButton}
                            alt="LikeButton"
                            width="32px"
                            height="32px"
                          />
                          <Text fontSize="14px">12</Text>
                        </HStack>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              )}
              {value.emotion === "anger" && (
                <Box
                  bgImage={AngerCard}
                  bgPosition="center"
                  bgSize="cover"
                  bgRepeat="no-repeat"
                  width="400px"
                  height="400px"
                  onClick={onClose}
                  cursor="pointer"
                >
                  <Box textAlign="center" pt="150px">
                    <Textarea
                      cursor="pointer"
                      resize="none"
                      variant="unstyled"
                      className="textarea note anger"
                      width="60%"
                      height="200px"
                      readOnly
                      defaultValue={value.content}
                    ></Textarea>
                    <Flex
                      justify="space-between"
                      align="center"
                      width="100%"
                      px="80px"
                    >
                      <Text fontSize="14px">
                        {dayjs(value.createdAt).format("YYYY/MM/DD")}
                      </Text>
                      <Flex align="center">
                        <HStack spacing={1}>
                          <Image
                            src={LikeButton}
                            alt="LikeButton"
                            width="32px"
                            height="32px"
                          />
                          <Text fontSize="14px">12</Text>
                        </HStack>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              )}
              {value.emotion === "sorrow" && (
                <Box
                  bgImage={SorrowCard}
                  bgPosition="center"
                  bgSize="cover"
                  bgRepeat="no-repeat"
                  width="400px"
                  height="400px"
                  onClick={onClose}
                  cursor="pointer"
                >
                  <Box textAlign="center" pt="150px">
                    <Textarea
                      cursor="pointer"
                      resize="none"
                      variant="unstyled"
                      className="textarea note sorrow"
                      width="60%"
                      height="200px"
                      readOnly
                      defaultValue={value.content}
                    ></Textarea>
                    <Flex
                      justify="space-between"
                      align="center"
                      width="100%"
                      px="80px"
                    >
                      <Text fontSize="14px">
                        {dayjs(value.createdAt).format("YYYY/MM/DD")}
                      </Text>
                      <Flex align="center">
                        <HStack spacing={1}>
                          <Image
                            src={LikeButton}
                            alt="LikeButton"
                            width="32px"
                            height="32px"
                          />
                          <Text fontSize="14px">12</Text>
                        </HStack>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              )}
              {value.emotion === "fun" && (
                <Box
                  bgImage={FunCard}
                  bgPosition="center"
                  bgSize="cover"
                  bgRepeat="no-repeat"
                  width="400px"
                  height="400px"
                  onClick={onClose}
                  cursor="pointer"
                >
                  <Box textAlign="center" pt="150px">
                    <Textarea
                      cursor="pointer"
                      resize="none"
                      variant="unstyled"
                      className="textarea note fun"
                      width="60%"
                      height="200px"
                      readOnly
                      defaultValue={value.content}
                    ></Textarea>
                    <Flex
                      justify="space-between"
                      align="center"
                      width="100%"
                      px="80px"
                    >
                      <Text fontSize="14px">
                        {dayjs(value.createdAt).format("YYYY/MM/DD")}
                      </Text>
                      <Flex align="center">
                        <HStack spacing={1}>
                          <Image
                            src={LikeButton}
                            alt="LikeButton"
                            width="32px"
                            height="32px"
                          />
                          <Text fontSize="14px">12</Text>
                        </HStack>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
});
