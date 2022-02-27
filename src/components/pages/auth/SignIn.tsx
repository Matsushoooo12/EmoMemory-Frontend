import {
  Box,
  Flex,
  Heading,
  HStack,
  InputGroup,
  Stack,
  Link,
} from '@chakra-ui/react';
import React, { memo, useCallback, useContext, useState, VFC } from 'react';
import Cookies from 'js-cookie';

import HappyFace from '../../../images/HappyFace.png';
import AngerFace from '../../../images/AngerFace.png';
import SorrowFace from '../../../images/SorrowFace.png';
import FunFace from '../../../images/FunFace.png';
import { useHistory } from 'react-router-dom';
import { signIn } from '../../../api/auth';
import { AuthContext } from '../../../App';
import '../../../App.css';
import { SubmitButton } from '../../atoms/button/SubmitButton';
import { ResetButton } from '../../atoms/button/ResetButton';
import { PrimaryInput } from '../../atoms/form/PrimaryInput';
import { AuthEmotionFaceIcon } from '../../atoms/icon/AuthEmotionFaceIcon';

export const SignIn: VFC = memo(() => {
  const history = useHistory();
  const onClickSignUp = useCallback(() => {
    history.push('/signup');
  }, [history]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setIsSignedIn, setCurrentUser } = useContext<any>(AuthContext);
  const [value, setValue] = useState({
    email: '',
    password: '',
  });

  const handleReset = () => {
    setValue({
      email: '',
      password: '',
    });
  };

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
            <Heading as="h1" fontSize="32px" mt="20px" mb="32px">
              ログイン
            </Heading>
            <form>
              <InputGroup display="block" position="relative">
                <Stack spacing="40px">
                  <PrimaryInput
                    placeholder="メールアドレス"
                    value={value.email}
                    onChange={(e) => handleChange(e)}
                    type="email"
                    name="email"
                  />
                  <PrimaryInput
                    placeholder="パスワード"
                    value={value.password}
                    onChange={(e) => handleChange(e)}
                    type="password"
                    name="password"
                  />
                  <Flex justify="center">
                    <HStack spacing="32px">
                      <SubmitButton handleSubmit={handleSubmit} width="80px">
                        ログイン
                      </SubmitButton>
                      <ResetButton handleReset={handleReset} width="80px">
                        リセット
                      </ResetButton>
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
    </Box>
  );
});
