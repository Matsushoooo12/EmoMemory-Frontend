import { memo, useCallback, useContext, VFC } from "react";
import { Flex, Link, Box, HStack, Image, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import headerLogo from "../../images/logo.png";
import { AuthContext } from "../../App";
import HappyFace from "../../images/喜01.png";

export const Header: VFC = memo(() => {
  const { currentUser } = useContext<any>(AuthContext);
  const history = useHistory();
  // ログイン状態によってメニュー切り替え
  const { loading, isSignedIn } = useContext<any>(AuthContext);

  const onClickSignUp = useCallback(() => {
    history.push("/signup");
  }, [history]);
  const onClickSignIn = useCallback(() => {
    history.push("/signin");
  }, [history]);

  const onClickHome = useCallback(() => {
    history.push("/");
  }, [history]);

  const onClickIndex = useCallback(() => {
    history.push("/index");
  }, [history]);

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
              <Link>
                <Flex align="center">
                  <Image
                    src={HappyFace}
                    alt="HappyFace"
                    width="40px"
                    height="40px"
                    mb="4px"
                  />
                  <Text>{currentUser.name}</Text>
                </Flex>
              </Link>
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
        minWidth="800px"
        px="80px"
        position="fixed"
        zIndex="100"
      >
        <Flex
          align="center"
          as="a"
          _hover={{ cursor: "pointer" }}
          onClick={onClickHome}
        >
          <Image width="140px" src={headerLogo} alt="HeaderLogo" />
        </Flex>
        <Flex align="center" fontSize="16px">
          <HStack spacing="40px">
            <HeaderMenus />
          </HStack>
        </Flex>
      </Flex>
    </>
  );
});
