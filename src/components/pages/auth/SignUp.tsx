import { memo, useCallback, useState, VFC } from "react";
import {
  Box,
  Heading,
  Image,
  Flex,
  Stack,
  Link,
  InputGroup,
  Button,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";

import HappyFace from "../../../images/喜01.png";
import AngerFace from "../../../images/怒01.png";
import SorrowFace from "../../../images/哀01.png";
import FunFace from "../../../images/楽01.png";
import { useHistory } from "react-router-dom";
import { signUp } from "../../../api/auth";

export const SignUp: VFC = memo(() => {
  const [isSendEmail, setIsSendEmail] = useState<boolean>(false);
  const confirmSuccessUrl = "http://localhost:3000/signin";
  const history = useHistory();
  const onClickSignIn = useCallback(() => {
    history.push("/signin");
  }, [history]);
  const [value, setValue] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    confirmSuccessUrl: confirmSuccessUrl,
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
      const res = await signUp(value);
      console.log(res);
      setIsSendEmail(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box pt="80px" width="100%" height="100vh" position="relative">
      {/* フォームエリア */}
      <Box
        width="480px"
        height="640px"
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
          {!isSendEmail ? (
            <>
              <Heading
                as="h1"
                fontSize="32px"
                textAlign="center"
                mt="20px"
                mb="32px"
              >
                新規登録
              </Heading>
              <form>
                <InputGroup display="block" position="relative">
                  <Stack spacing="40px">
                    <Input
                      placeholder="名前"
                      value={value.name}
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="name"
                      variant="flushed"
                      focusBorderColor="#47789F"
                    />
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
                    <Input
                      placeholder="パスワード確認"
                      value={value.passwordConfirmation}
                      onChange={(e) => handleChange(e)}
                      type="password"
                      name="passwordConfirmation"
                      variant="flushed"
                      focusBorderColor="#47789F"
                    />
                    <Text fontSize="12px">
                      新規登録すると、利用規約および プライバシーポリシーに
                      同意したとみなされます。
                    </Text>
                    <Flex justify="center">
                      <HStack spacing="32px">
                        <Button
                          bg="#47789F"
                          color="white"
                          _hover={{ opacity: 0.8 }}
                          onClick={(e) => handleSubmit(e)}
                        >
                          新規登録
                        </Button>
                        <Button border="3px solid #47789F" color="#47789F">
                          リセット
                        </Button>
                      </HStack>
                    </Flex>
                  </Stack>
                  <Link
                    textAlign="right"
                    fontSize="12px"
                    fontWeight="bold"
                    color="#47789F"
                    display="block"
                    mt="24px"
                    onClick={onClickSignIn}
                  >
                    ログインへ
                  </Link>
                </InputGroup>
                <Input
                  value={value.confirmSuccessUrl}
                  type="hidden"
                  name="confirmSuccessUrl"
                />
              </form>
            </>
          ) : (
            <>
              <Heading
                as="h1"
                fontSize="32px"
                textAlign="center"
                mt="20px"
                mb="32px"
              >
                仮登録完了
              </Heading>
              <Stack spacing="16px">
                <Text>
                  下記メールアドレス宛に本登録のご案内を送信しました。
                  認証用のURLをクリックしたらログイン画面に遷移してログインできるようになります。
                </Text>
                <Text textAlign="center" fontWeight="bold" fontSize="20px">
                  {value.email}
                </Text>
                <Box
                  width="100%"
                  height="100%"
                  bg="#EDF2F6"
                  borderRadius="md"
                  p="16px"
                >
                  <Heading as="h2" fontSize="16px" mb="16px">
                    メールが届かない場合
                  </Heading>
                  <Text fontSize="12px">
                    ・迷惑メールフォルダに振り分けられていないかご確認ください。
                    <br />
                    ・メールアドレスが間違っていた場合は、正しいメールアドレスで新規登録を行ってください。
                  </Text>
                </Box>
              </Stack>
            </>
          )}
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
  );
});
