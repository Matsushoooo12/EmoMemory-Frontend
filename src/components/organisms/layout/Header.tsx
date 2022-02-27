import { memo, useCallback, useContext, VFC } from 'react';
import {
  Flex,
  Link,
  Box,
  HStack,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import { AuthContext } from '../../../App';
import headerLogo from '../../../images/logo.png';
import HappyFace from '../../../images/HappyFace.png';
import AngerFace from '../../../images/AngerFace.png';
import SorrowFace from '../../../images/SorrowFace.png';
import FunFace from '../../../images/FunFace.png';
import { signOut } from '../../../api/auth';
import { MenuIconButton } from '../../atoms/button/MenuIconButton';
import { MenuDrawer } from '../../molecules/MenuDrawer';

export const Header: VFC = memo(() => {
  const { currentUser, setIsSignedIn, loading, isSignedIn } =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useContext<any>(AuthContext);
  const history = useHistory();

  // ログアウト関数
  const handleSignOut = async () => {
    try {
      const res = await signOut();

      if (res.data.success) {
        Cookies.remove('_access_token');
        Cookies.remove('_client');
        Cookies.remove('_uid');

        setIsSignedIn(false);
        history.push('/signin');
        console.log('succeeded in sign out');
      } else {
        console.log('failed in sign out');
      }
    } catch (e) {
      console.log(e);
    }
  };

  // リンク遷移関数
  const onClickSignUp = useCallback(() => {
    history.push('/signup');
  }, [history]);
  const onClickSignIn = useCallback(() => {
    history.push('/signin');
  }, [history]);

  const onClickHome = useCallback(() => {
    history.push('/');
  }, [history]);

  const onClickIndex = useCallback(() => {
    history.push('/index');
  }, [history]);

  const onClickProfile = useCallback(() => {
    history.push(`/profile/${currentUser?.id}`);
  }, [history]);

  // ログインユーザーのヘッダーFace
  const headerProfileFace = () => {
    if (currentUser?.emotion === 'happy') {
      return HappyFace;
    } else if (currentUser?.emotion === 'anger') {
      return AngerFace;
    } else if (currentUser?.emotion === 'sorrow') {
      return SorrowFace;
    } else if (currentUser?.emotion === 'fun') {
      return FunFace;
    }
  };

  // ログイン状態でメニュー切り替え
  const HeaderMenus = () => {
    if (!loading) {
      if (isSignedIn) {
        return (
          <>
            <Box>
              <Link onClick={onClickHome}>新規投稿</Link>
            </Box>
            <Box>
              <Link onClick={onClickIndex}>投稿一覧</Link>
            </Box>
            <Box>
              <Link onClick={onClickProfile}>
                <Flex align="center">
                  <Image
                    src={headerProfileFace()}
                    alt="HappyFace"
                    width="40px"
                    height="40px"
                    mb="4px"
                  />
                  <Text>{currentUser.name}</Text>
                </Flex>
              </Link>
            </Box>
            <Box>
              <Link onClick={handleSignOut}>ログアウト</Link>
            </Box>
          </>
        );
      } else {
        return (
          <>
            <Box>
              <Link>emoメモリーについて</Link>
            </Box>
            <Box>
              <Link>投稿一覧</Link>
            </Box>
            <Box>
              <Link onClick={onClickSignIn}>ログイン</Link>
            </Box>
            <Box>
              <Link onClick={onClickSignUp}>新規登録</Link>
            </Box>
          </>
        );
      }
    } else {
      return <></>;
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        as="nav"
        bg="white"
        fontWeight="bold"
        align="center"
        justify="space-between"
        height="80px"
        width="100%"
        px={{ base: '40px', md: '80px' }}
        position="fixed"
        zIndex="100"
      >
        <Flex
          align="center"
          as="a"
          _hover={{ cursor: 'pointer' }}
          onClick={onClickHome}
        >
          <Image width="140px" src={headerLogo} alt="HeaderLogo" />
        </Flex>
        <Flex
          align="center"
          fontSize="16px"
          display={{ base: 'none', md: 'flex' }}
        >
          <HStack spacing="40px">
            <HeaderMenus />
          </HStack>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        onClose={onClose}
        isOpen={isOpen}
        headerLogo={headerLogo}
        onClickHome={onClickHome}
        onClickIndex={onClickIndex}
        onClickProfile={onClickProfile}
        handleSignOut={handleSignOut}
        headerProfileFace={headerProfileFace}
      />
    </>
  );
});
