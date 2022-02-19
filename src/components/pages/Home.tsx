import { Box, Button, Flex, HStack, Image, Textarea } from "@chakra-ui/react";
import { useState, VFC } from "react";

import HappyFace from "../../images/喜01.png";
import HappyCard from "../../images/喜付箋.png";
import AngerFace from "../../images/怒01.png";
import AngerCard from "../../images/怒付箋.png";
import SorrowFace from "../../images/哀01.png";
import SorrowCard from "../../images/哀付箋.png";
import FunFace from "../../images/楽01.png";
import FunCard from "../../images/楽付箋.png";
import "../../App.css";

export const Home: VFC = () => {
  const [emotion, setEmotion] = useState("happy");
  const handleHappy = () => {
    setEmotion("happy");
  };

  const handleAnger = () => {
    setEmotion("anger");
  };

  const handleSorrow = () => {
    setEmotion("sorrow");
  };

  const handleFun = () => {
    setEmotion("fun");
  };
  return (
    <Box pt="80px" width="100%" height="100vh" position="relative">
      <Box
        width="400px"
        height="560"
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        margin="auto"
      >
        <Flex justify="space-around" mx="40px" mb="24px">
          <Image
            width="64px"
            height="64px"
            src={HappyFace}
            alt="HappyFace"
            cursor="pointer"
            onClick={handleHappy}
          />
          <Image
            width="64px"
            height="64px"
            src={AngerFace}
            alt="AngerFace"
            cursor="pointer"
            onClick={handleAnger}
          />
          <Image
            width="64px"
            height="64px"
            src={SorrowFace}
            alt="SorrowFace"
            cursor="pointer"
            onClick={handleSorrow}
          />
          <Image
            width="64px"
            height="64px"
            src={FunFace}
            alt="FunFace"
            cursor="pointer"
            onClick={handleFun}
          />
        </Flex>
        {emotion === "happy" && (
          <Box
            bgImage={HappyCard}
            bgPosition="center"
            bgSize="cover"
            bgRepeat="no-repeat"
            width="400px"
            height="400px"
          >
            <Box textAlign="center" pt="150px">
              <form>
                <Textarea
                  variant="unstyled"
                  className="textarea note happy"
                  width="60%"
                  height="210px"
                ></Textarea>
                <Flex justify="center" mt="56px">
                  <HStack spacing="16px">
                    <Button
                      _hover={{ opacity: 0.8 }}
                      bg="#47789F"
                      color="white"
                      width="80px"
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
              </form>
            </Box>
          </Box>
        )}
        {emotion === "anger" && (
          <Box
            bgImage={AngerCard}
            bgPosition="center"
            bgSize="cover"
            bgRepeat="no-repeat"
            width="400px"
            height="400px"
          >
            <Box textAlign="center" pt="150px">
              <form>
                <Textarea
                  variant="unstyled"
                  className="textarea note anger"
                  width="60%"
                  height="210px"
                ></Textarea>
                <Flex justify="center" mt="56px">
                  <HStack spacing="16px">
                    <Button
                      _hover={{ opacity: 0.8 }}
                      bg="#47789F"
                      color="white"
                      width="80px"
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
              </form>
            </Box>
          </Box>
        )}
        {emotion === "sorrow" && (
          <Box
            bgImage={SorrowCard}
            bgPosition="center"
            bgSize="cover"
            bgRepeat="no-repeat"
            width="400px"
            height="400px"
          >
            <Box textAlign="center" pt="150px">
              <form>
                <Textarea
                  variant="unstyled"
                  className="textarea note sorrow"
                  width="60%"
                  height="210px"
                ></Textarea>
                <Flex justify="center" mt="56px">
                  <HStack spacing="16px">
                    <Button
                      _hover={{ opacity: 0.8 }}
                      bg="#47789F"
                      color="white"
                      width="80px"
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
              </form>
            </Box>
          </Box>
        )}
        {emotion === "fun" && (
          <Box
            bgImage={FunCard}
            bgPosition="center"
            bgSize="cover"
            bgRepeat="no-repeat"
            width="400px"
            height="400px"
          >
            <Box textAlign="center" pt="150px">
              <form>
                <Textarea
                  variant="unstyled"
                  className="textarea note fun"
                  width="60%"
                  height="210px"
                ></Textarea>
                <Flex justify="center" mt="56px">
                  <HStack spacing="16px">
                    <Button
                      _hover={{ opacity: 0.8 }}
                      bg="#47789F"
                      color="white"
                      width="80px"
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
              </form>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
