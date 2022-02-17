import { useCallback, useContext, VFC } from "react";
import { Flex, Link, Box, HStack, Image } from "@chakra-ui/react";

import headerLogo from "../../images/logo.png";
import { AuthContext } from "../../App";
import { useHistory } from "react-router-dom";

export const Header: VFC = () => {
  const history = useHistory();
  // ログイン状態によってメニュー切り替え
  const { loading, isSignedIn } = useContext<any>(AuthContext);

  const onClickSignUp = useCallback(() => {
    history.push("/signup");
  }, [history]);
  const onClickSignIn = useCallback(() => {
    history.push("/signin");
  }, [history]);

  const HeaderMenus = () => {
    if (!loading) {
      if (isSignedIn) {
        return (
          <>
            <Box>
              <Link>新規投稿</Link>
            </Box>
            <Box>
              <Link>投稿一覧</Link>
            </Box>
            <Box>
              <Link>プロフィール</Link>
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
        color="#3F3F3F"
        fontWeight="bold"
        align="center"
        justify="space-between"
        height="80px"
        width="100%"
        px="80px"
        position="fixed"
      >
        <Flex align="center" as="a" _hover={{ cursor: "pointer" }}>
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
};
