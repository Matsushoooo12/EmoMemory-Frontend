import {
  Text,
  Box,
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
import React, { memo, useContext, useState, VFC } from "react";

import HappyFace from "../../../images/喜01.png";
import HappyCard from "../../../images/喜付箋.png";
import HappyLongCard from "../../../images/喜付箋横長.png";
import AngerFace from "../../../images/怒01.png";
import AngerCard from "../../../images/怒付箋.png";
import AngerLongCard from "../../../images/怒付箋横長.png";
import SorrowFace from "../../../images/哀01.png";
import SorrowCard from "../../../images/哀付箋.png";
import SorrowLongCard from "../../../images/哀付箋横長.png";
import FunFace from "../../../images/楽01.png";
import FunCard from "../../../images/楽付箋.png";
import FunLongCard from "../../../images/楽付箋横長.png";
import LikeButton from "../../../images/それなスタンプ.png";
import "../../../App.css";
import { AuthContext } from "../../../App";
import { Like } from "../../../types/like";
import { Post } from "../../../types/post";
import { deletePost, getAPost, updatePost } from "../../../api/post";

export const MyPost: VFC = memo(() => {
  const { currentUser, handleGetCurrentUser } = useContext<any>(AuthContext);

  // カードの色変更
  const [emotion, setEmotion] = useState("");
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
  const onClickAll = () => {
    setEmotion("");
  };

  // 感情ごとにカードの切り替え
  const textareaColor = (emotion: string) => {
    if (emotion === "happy") {
      return "textarea note happy";
    } else if (emotion === "anger") {
      return "textarea note anger";
    } else if (emotion === "sorrow") {
      return "textarea note sorrow";
    } else if (emotion === "fun") {
      return "textarea note fun";
    }
  };

  const cardColor = (emotion: string) => {
    if (emotion === "happy") {
      return HappyLongCard;
    } else if (emotion === "anger") {
      return AngerLongCard;
    } else if (emotion === "sorrow") {
      return SorrowLongCard;
    } else if (emotion === "fun") {
      return FunLongCard;
    }
  };

  const emotionWidth = (emotion: string) => {
    if (emotion === "happy") {
      return "548px";
    } else if (emotion === "anger") {
      return "548px";
    } else if (emotion === "sorrow") {
      return "548px";
    } else if (emotion === "fun") {
      return "548px";
    }
  };

  const emotionHeight = (emotion: string) => {
    if (emotion === "happy") {
      return "278px";
    } else if (emotion === "anger") {
      return "278px";
    } else if (emotion === "sorrow") {
      return "252px";
    } else if (emotion === "fun") {
      return "272px";
    }
  };

  const likeButtonTop = (emotion: string) => {
    if (emotion === "happy") {
      return "40px";
    } else if (emotion === "anger") {
      return "40px";
    } else if (emotion === "sorrow") {
      return "12px";
    } else if (emotion === "fun") {
      return "32px";
    }
  };

  const textareaTop = (emotion: string) => {
    if (emotion === "happy") {
      return "120px";
    } else if (emotion === "anger") {
      return "120px";
    } else if (emotion === "sorrow") {
      return "96px";
    } else if (emotion === "fun") {
      return "116px";
    }
  };

  // 投稿詳細
  const [post, setPost] = useState<Post>();

  const handleGetDetailPost = async (id: number) => {
    try {
      const res = await getAPost(id);
      console.log(res.data);
      setPost(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  // 投稿編集モーダル
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickModalPost = (id: number) => {
    handleGetDetailPost(id);
    onOpen();
  };

  // 投稿編集
  const generateParams = (content: string, emotion: string) => {
    const updateParams = {
      content: content,
      emotion: emotion,
    };
    return updateParams;
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: any,
    content: any,
    emotion: any
  ) => {
    e.preventDefault();
    const params = generateParams(content, emotion);
    try {
      const res = await updatePost(id, params);
      console.log(res.data);
      handleGetCurrentUser();
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  // 投稿削除
  const handleDelete = async (id: any) => {
    console.log("click", id);
    try {
      const res = await deletePost(id);
      console.log(res.data);
      handleGetCurrentUser();
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Box position="fixed" left="0" right="0" margin="auto" zIndex="50">
        <Flex justify="center" mx="40px" mb="40px" mt="16px">
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
      <Box
        pt="100px"
        width="100%"
        height="100%"
        bg="#EDF2F6"
        pb="80px"
        borderRadius="md"
        shadow="md"
      >
        {currentUser.posts.map(
          (post: {
            emotion: string;
            likes: Like[];
            content: string;
            id: number;
            createdAt: string;
          }) => (
            <React.Fragment key={post.id}>
              {post.emotion === emotion && (
                <Box
                  bgImage={cardColor(post.emotion)}
                  bgPosition="center"
                  bgSize="cover"
                  bgRepeat="no-repeat"
                  width={emotionWidth(post.emotion)}
                  height={emotionHeight(post.emotion)}
                  mx="auto"
                  mb="24px"
                  position="relative"
                  cursor="pointer"
                >
                  <Flex
                    position="absolute"
                    right="40px"
                    top={likeButtonTop(post.emotion)}
                    align="center"
                  >
                    <Image
                      src={LikeButton}
                      width="40px"
                      height="40px"
                      mr="8px"
                    />
                    <Text fontSize="24px" fontWeight="bold">
                      {post.likes.length}
                    </Text>
                  </Flex>
                  <Textarea
                    onClick={() => onClickModalPost(post.id)}
                    resize="none"
                    variant="unstyled"
                    className={textareaColor(post.emotion)}
                    width="80%"
                    height="128px"
                    position="absolute"
                    top={textareaTop(post.emotion)}
                    left="0"
                    right="0"
                    margin="auto"
                    readOnly
                    cursor="pointer"
                    defaultValue={post.content}
                  ></Textarea>
                  <Text
                    position="absolute"
                    bottom="10px"
                    right="56px"
                    fontSize="12px"
                  >
                    {dayjs(post.createdAt).format("YYYY/MM/DD")}
                  </Text>
                </Box>
              )}
              {emotion === "" && (
                <Box
                  key={post.id}
                  bgImage={cardColor(post.emotion)}
                  bgPosition="center"
                  bgSize="cover"
                  bgRepeat="no-repeat"
                  width={emotionWidth(post.emotion)}
                  height={emotionHeight(post.emotion)}
                  mx="auto"
                  mb="24px"
                  position="relative"
                  cursor="pointer"
                >
                  <Flex
                    position="absolute"
                    right="40px"
                    top={likeButtonTop(post.emotion)}
                    align="center"
                  >
                    <Image
                      src={LikeButton}
                      width="40px"
                      height="40px"
                      mr="8px"
                    />
                    <Text fontSize="24px" fontWeight="bold">
                      {post.likes.length}
                    </Text>
                  </Flex>
                  <Textarea
                    onClick={() => onClickModalPost(post.id)}
                    resize="none"
                    variant="unstyled"
                    className={textareaColor(post.emotion)}
                    width="80%"
                    height="128px"
                    position="absolute"
                    top={textareaTop(post.emotion)}
                    left="0"
                    right="0"
                    margin="auto"
                    readOnly
                    cursor="pointer"
                    defaultValue={post.content}
                  ></Textarea>
                  <Text
                    position="absolute"
                    bottom="10px"
                    right="56px"
                    fontSize="12px"
                  >
                    {dayjs(post.createdAt).format("YYYY/MM/DD")}
                  </Text>
                </Box>
              )}
            </React.Fragment>
          )
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="none" border="none" shadow="none">
          <ModalCloseButton mr="64px" mt="100px" />
          {currentUser.id === post?.user.id ? (
            <form>
              {post?.emotion === "happy" && (
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
                      onChange={(e) =>
                        setPost({ ...post, emotion: e.target.value })
                      }
                    />
                    <Textarea
                      resize="none"
                      variant="unstyled"
                      className="textarea note happy"
                      width="60%"
                      height="200px"
                      onChange={(e) =>
                        setPost({ ...post, content: e.target.value })
                      }
                      value={post?.content}
                      name="content"
                    ></Textarea>
                    <Flex
                      justify="space-between"
                      align="center"
                      width="100%"
                      px="80px"
                    >
                      <Text fontSize="14px">
                        {dayjs(post?.createdAt).format("YYYY/MM/DD")}
                      </Text>
                      <Flex align="center">
                        <HStack spacing={1}>
                          {post.likes?.find(
                            (like) => like.userId === currentUser.id
                          ) ? (
                            <Image
                              src={LikeButton}
                              alt="LikeButton"
                              width="24px"
                              height="24px"
                            />
                          ) : (
                            <Image
                              src={LikeButton}
                              alt="LikeButton"
                              width="24px"
                              height="24px"
                              opacity={0.3}
                            />
                          )}
                          <Text fontSize="14px">{post?.likes.length}</Text>
                        </HStack>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              )}
              {post?.emotion === "anger" && (
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
                      onChange={(e) =>
                        setPost({ ...post, emotion: e.target.value })
                      }
                    />
                    <Textarea
                      resize="none"
                      variant="unstyled"
                      className="textarea note anger"
                      width="60%"
                      height="200px"
                      onChange={(e) =>
                        setPost({ ...post, content: e.target.value })
                      }
                      value={post?.content}
                      name="content"
                    ></Textarea>
                    <Flex
                      justify="space-between"
                      align="center"
                      width="100%"
                      px="80px"
                    >
                      <Text fontSize="14px">
                        {dayjs(post?.createdAt).format("YYYY/MM/DD")}
                      </Text>
                      <Flex align="center">
                        <HStack spacing={1}>
                          {post.likes?.find(
                            (like) => like.userId === currentUser.id
                          ) ? (
                            <Image
                              src={LikeButton}
                              alt="LikeButton"
                              width="24px"
                              height="24px"
                            />
                          ) : (
                            <Image
                              src={LikeButton}
                              alt="LikeButton"
                              width="24px"
                              height="24px"
                              opacity={0.3}
                            />
                          )}
                          <Text fontSize="14px">{post?.likes.length}</Text>
                        </HStack>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              )}
              {post?.emotion === "sorrow" && (
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
                      onChange={(e) =>
                        setPost({ ...post, emotion: e.target.value })
                      }
                    />
                    <Textarea
                      resize="none"
                      variant="unstyled"
                      className="textarea note sorrow"
                      width="60%"
                      height="200px"
                      onChange={(e) =>
                        setPost({ ...post, content: e.target.value })
                      }
                      value={post?.content}
                      name="content"
                    ></Textarea>
                    <Flex
                      justify="space-between"
                      align="center"
                      width="100%"
                      px="80px"
                    >
                      <Text fontSize="14px">
                        {dayjs(post?.createdAt).format("YYYY/MM/DD")}
                      </Text>
                      <Flex align="center">
                        <HStack spacing={1}>
                          {post.likes?.find(
                            (like) => like.userId === currentUser.id
                          ) ? (
                            <Image
                              src={LikeButton}
                              alt="LikeButton"
                              width="24px"
                              height="24px"
                            />
                          ) : (
                            <Image
                              src={LikeButton}
                              alt="LikeButton"
                              width="24px"
                              height="24px"
                              opacity={0.3}
                            />
                          )}
                          <Text fontSize="14px">{post?.likes.length}</Text>
                        </HStack>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              )}
              {post?.emotion === "fun" && (
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
                      onChange={(e) =>
                        setPost({ ...post, emotion: e.target.value })
                      }
                    />
                    <Textarea
                      resize="none"
                      variant="unstyled"
                      className="textarea note fun"
                      width="60%"
                      height="200px"
                      onChange={(e) =>
                        setPost({ ...post, content: e.target.value })
                      }
                      value={post?.content}
                      name="content"
                    ></Textarea>
                    <Flex
                      justify="space-between"
                      align="center"
                      width="100%"
                      px="80px"
                    >
                      <Text fontSize="14px">
                        {dayjs(post?.createdAt).format("YYYY/MM/DD")}
                      </Text>
                      <Flex align="center">
                        <HStack spacing={1}>
                          {post.likes?.find(
                            (like) => like.userId === currentUser.id
                          ) ? (
                            <Image
                              src={LikeButton}
                              alt="LikeButton"
                              width="24px"
                              height="24px"
                            />
                          ) : (
                            <Image
                              src={LikeButton}
                              alt="LikeButton"
                              width="24px"
                              height="24px"
                              opacity={0.3}
                            />
                          )}
                          <Text fontSize="14px">{post?.likes.length}</Text>
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
                    onClick={(e) =>
                      handleSubmit(e, post?.id, post?.content, post?.emotion)
                    }
                  >
                    編集
                  </Button>
                  <Button
                    border="3px solid #47789F"
                    color="#47789F"
                    width="80px"
                    onClick={() => handleDelete(post?.id)}
                  >
                    削除
                  </Button>
                </HStack>
              </Flex>
            </form>
          ) : (
            <>
              {post?.emotion === "happy" && (
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
                    <Textarea
                      onClick={onClose}
                      cursor="pointer"
                      resize="none"
                      variant="unstyled"
                      className="textarea note happy"
                      width="60%"
                      height="200px"
                      readOnly
                      defaultValue={post?.content}
                    ></Textarea>
                    <Flex
                      justify="space-between"
                      align="center"
                      width="100%"
                      px="80px"
                    >
                      <Text fontSize="14px">
                        {dayjs(post?.createdAt).format("YYYY/MM/DD")}
                      </Text>
                      <Flex align="center">
                        <HStack spacing={1}>
                          {post.likes?.find(
                            (like) => like.userId === currentUser.id
                          ) ? (
                            <Image
                              src={LikeButton}
                              alt="LikeButton"
                              width="24px"
                              height="24px"
                            />
                          ) : (
                            <Image
                              src={LikeButton}
                              alt="LikeButton"
                              width="24px"
                              height="24px"
                              opacity={0.3}
                            />
                          )}
                          <Text fontSize="14px">{post?.likes.length}</Text>
                        </HStack>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              )}
              {post?.emotion === "anger" && (
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
                    <Textarea
                      onClick={onClose}
                      cursor="pointer"
                      resize="none"
                      variant="unstyled"
                      className="textarea note anger"
                      width="60%"
                      height="200px"
                      readOnly
                      defaultValue={post?.content}
                    ></Textarea>
                    <Flex
                      justify="space-between"
                      align="center"
                      width="100%"
                      px="80px"
                    >
                      <Text fontSize="14px">
                        {dayjs(post?.createdAt).format("YYYY/MM/DD")}
                      </Text>
                      <Flex align="center">
                        <HStack spacing={1}>
                          {post.likes?.find(
                            (like) => like.userId === currentUser.id
                          ) ? (
                            <Image
                              src={LikeButton}
                              alt="LikeButton"
                              width="24px"
                              height="24px"
                            />
                          ) : (
                            <Image
                              src={LikeButton}
                              alt="LikeButton"
                              width="24px"
                              height="24px"
                              opacity={0.3}
                            />
                          )}
                          <Text fontSize="14px">{post?.likes.length}</Text>
                        </HStack>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              )}
              {post?.emotion === "sorrow" && (
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
                    <Textarea
                      onClick={onClose}
                      cursor="pointer"
                      resize="none"
                      variant="unstyled"
                      className="textarea note sorrow"
                      width="60%"
                      height="200px"
                      readOnly
                      defaultValue={post?.content}
                    ></Textarea>
                    <Flex
                      justify="space-between"
                      align="center"
                      width="100%"
                      px="80px"
                    >
                      <Text fontSize="14px">
                        {dayjs(post?.createdAt).format("YYYY/MM/DD")}
                      </Text>
                      <Flex align="center">
                        <HStack spacing={1}>
                          {post.likes?.find(
                            (like) => like.userId === currentUser.id
                          ) ? (
                            <Image
                              src={LikeButton}
                              alt="LikeButton"
                              width="24px"
                              height="24px"
                            />
                          ) : (
                            <Image
                              src={LikeButton}
                              alt="LikeButton"
                              width="24px"
                              height="24px"
                              opacity={0.3}
                            />
                          )}
                          <Text fontSize="14px">{post?.likes.length}</Text>
                        </HStack>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              )}
              {post?.emotion === "fun" && (
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
                    <Textarea
                      onClick={onClose}
                      cursor="pointer"
                      resize="none"
                      variant="unstyled"
                      className="textarea note fun"
                      width="60%"
                      height="200px"
                      readOnly
                      defaultValue={post?.content}
                    ></Textarea>
                    <Flex
                      justify="space-between"
                      align="center"
                      width="100%"
                      px="80px"
                    >
                      <Text fontSize="14px">
                        {dayjs(post?.createdAt).format("YYYY/MM/DD")}
                      </Text>
                      <Flex align="center">
                        <HStack spacing={1}>
                          {post.likes?.find(
                            (like) => like.userId === currentUser.id
                          ) ? (
                            <Image
                              src={LikeButton}
                              alt="LikeButton"
                              width="24px"
                              height="24px"
                            />
                          ) : (
                            <Image
                              src={LikeButton}
                              alt="LikeButton"
                              width="24px"
                              height="24px"
                              opacity={0.3}
                            />
                          )}
                          <Text fontSize="14px">{post?.likes.length}</Text>
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
    </>
  );
});
