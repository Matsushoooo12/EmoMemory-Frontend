import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  Stack,
  Link,
} from "@chakra-ui/react";
import React, { memo, useCallback, useContext, useState, VFC } from "react";
import Cookies from "js-cookie";

import HappyFace from "../../../images/喜01.png";
import AngerFace from "../../../images/怒01.png";
import SorrowFace from "../../../images/哀01.png";
import FunFace from "../../../images/楽01.png";
import { useHistory } from "react-router-dom";
import { signIn } from "../../../api/auth";
import { AuthContext } from "../../../App";
import "../../../App.css";

export const SignIn: VFC = memo(() => {
  const history = useHistory();
  const onClickSignUp = useCallback(() => {
    history.push("/signup");
  }, [history]);
  const { setIsSignedIn, setCurrentUser } = useContext<any>(AuthContext);
  const [value, setValue] = useState({
    id: 0,
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await signIn(value);
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        history.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box pt="80px" width="100%" height="100vh" position="relative">
      {/* フォームエリア */}
      <Box
        width="480px"
        height="430px"
        bg="white"
        borderRadius="md"
        shadow="md"
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        margin="auto"
      >
        <Box textAlign="center">
          <Flex justify="space-between">
            <Image
              width="64px"
              height="64px"
              marginLeft="-32px"
              marginTop="-32px"
              src={HappyFace}
              alt="HappyFace"
            />
            <Image
              width="64px"
              height="64px"
              src={AngerFace}
              alt="AngerFace"
              marginRight="-32px"
              marginTop="-32px"
            />
          </Flex>
          <Box width="320px" mx="auto">
            <Heading as="h1" fontSize="32px" mt="20px" mb="32px">
              ログイン
            </Heading>
            <form>
              <InputGroup display="block" position="relative">
                <Stack spacing="40px">
                  <Input
                    placeholder="メールアドレス"
                    value={value.email}
                    onChange={(e) => handleChange(e)}
                    type="email"
                    name="email"
                    variant="flushed"
                    focusBorderColor="#47789F"
                  />
                  <Input
                    placeholder="パスワード"
                    value={value.password}
                    onChange={(e) => handleChange(e)}
                    type="password"
                    name="password"
                    variant="flushed"
                    focusBorderColor="#47789F"
                  />
                  <Flex justify="center">
                    <HStack spacing="32px">
                      <Button
                        bg="#47789F"
                        color="white"
                        _hover={{ opacity: 0.8 }}
                        onClick={(e) => handleSubmit(e)}
                      >
                        ログイン
                      </Button>
                      <Button border="3px solid #47789F" color="#47789F">
                        リセット
                      </Button>
                    </HStack>
                  </Flex>
                </Stack>
                <Stack spacing="16px" mt="24px">
                  <Link
                    textAlign="right"
                    fontSize="12px"
                    fontWeight="bold"
                    color="#47789F"
                    display="block"
                  >
                    パスワードを忘れた場合
                  </Link>
                  <Link
                    textAlign="right"
                    fontSize="12px"
                    fontWeight="bold"
                    color="#47789F"
                    display="block"
                    onClick={onClickSignUp}
                  >
                    新規登録へ
                  </Link>
                </Stack>
              </InputGroup>
            </form>
          </Box>
          <Flex justify="space-between">
            <Image
              width="64px"
              height="64px"
              marginLeft="-32px"
              marginBottom="-32px"
              src={SorrowFace}
              alt="SorrowFace"
            />
            <Image
              width="64px"
              height="64px"
              src={FunFace}
              alt="FunFace"
              marginRight="-32px"
              marginBottom="-32px"
            />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
});
