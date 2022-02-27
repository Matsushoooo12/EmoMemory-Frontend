import { memo, useCallback, useContext, useState, VFC } from 'react';
import {
  Box,
  Heading,
  Flex,
  Stack,
  Link,
  InputGroup,
  HStack,
  Input,
  Text,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';

import HappyFace from '../../../images/HappyFace.png';
import AngerFace from '../../../images/AngerFace.png';
import SorrowFace from '../../../images/SorrowFace.png';
import FunFace from '../../../images/FunFace.png';
import { useHistory } from 'react-router-dom';
import { signUp } from '../../../api/auth';
import { AuthContext } from '../../../App';
import { SubmitButton } from '../../atoms/button/SubmitButton';
import { ResetButton } from '../../atoms/button/ResetButton';
import { PrimaryInput } from '../../atoms/form/PrimaryInput';
import { AuthEmotionFaceIcon } from '../../atoms/icon/AuthEmotionFaceIcon';

export const SignUp: VFC = memo(() => {
  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setIsSignedIn, setCurrentUser } = useContext<any>(AuthContext);
  const onClickSignIn = useCallback(() => {
    history.push('/signin');
  }, [history]);
  const [value, setValue] = useState({
    name: '',
    emotion: 'happy',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const handleReset = () => [
    setValue({
      name: '',
      emotion: 'happy',
      email: '',
      password: '',
      passwordConfirmation: '',
    }),
  ];

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
      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token']);
        Cookies.set('_client', res.headers['client']);
        Cookies.set('_uid', res.headers['uid']);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        history.push('/');
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
          <AuthEmotionFaceIcon
            EmotionFace={HappyFace}
            emotionText="HappyFace"
            marginLeft="-32px"
            marginTop="-32px"
            marginRight="0"
            marginBottom="0"
          />
          <AuthEmotionFaceIcon
            EmotionFace={AngerFace}
            emotionText="AngerFace"
            marginLeft="0"
            marginTop="-32px"
            marginRight="-32px"
            marginBottom="0"
          />
        </Flex>
        <Box width="320px" mx="auto">
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
              <Stack spacing="28px">
                <PrimaryInput
                  placeholder="名前"
                  value={value.name}
                  onChange={(e) => handleChange(e)}
                  type="name"
                  name="name"
                />
                <PrimaryInput
                  placeholder="メールアドレス"
                  value={value.email}
                  onChange={(e) => handleChange(e)}
                  type="email"
                  name="email"
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
                <PrimaryInput
                  placeholder="パスワード"
                  value={value.password}
                  onChange={(e) => handleChange(e)}
                  type="password"
                  name="password"
                />
                <PrimaryInput
                  placeholder="パスワード確認"
                  value={value.passwordConfirmation}
                  onChange={(e) => handleChange(e)}
                  type="password"
                  name="passwordConfirmation"
                />
                <Input
                  type="hidden"
                  name="emotion"
                  onChange={(e) => handleChange(e)}
                  value={value.emotion}
                />
                <PrimaryInput
                  placeholder=""
                  value={value.emotion}
                  onChange={(e) => handleChange(e)}
                  type="hidden"
                  name="emotion"
                />
                <Text fontSize="12px">
                  新規登録すると、利用規約および プライバシーポリシーに
                  同意したとみなされます。
                </Text>
                <Flex justify="center">
                  <HStack spacing="32px">
                    <SubmitButton handleSubmit={handleSubmit} width="80px">
                      新規登録
                    </SubmitButton>
                    <ResetButton handleReset={handleReset} width="80px">
                      リセット
                    </ResetButton>
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
          </form>
        </Box>
        <Flex justify="space-between">
          <AuthEmotionFaceIcon
            EmotionFace={SorrowFace}
            emotionText="SorrowFace"
            marginLeft="-32px"
            marginTop="0"
            marginRight="0"
            marginBottom="-32px"
          />
          <AuthEmotionFaceIcon
            EmotionFace={FunFace}
            emotionText="FunFace"
            marginLeft="0"
            marginTop="0"
            marginRight="-32px"
            marginBottom="-32px"
          />
        </Flex>
      </Box>
    </Box>
  );
});
