import { memo, useCallback, useContext, VFC } from "react";
import { Flex, Link, Box, HStack, Image, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import headerLogo from "../../images/logo.png";
import { AuthContext } from "../../App";
import HappyFace from "../../images/喜01.png";
import AngerFace from "../../images/怒01.png";
import SorrowFace from "../../images/哀01.png";
import FunFace from "../../images/楽01.png";
import { signOut } from "../../api/auth";

export const Header: VFC = memo(() => {
  const { currentUser, setIsSignedIn, loading, isSignedIn } =
    useContext<any>(AuthContext);
  const history = useHistory();

  // ログアウト関数
  const handleSignOut = async () => {
    try {
      const res = await signOut();

      // eslint-disable-next-line no-cond-assign
      if ((res.data.success = true)) {
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        history.push("/signin");
        console.log("succeeded in sign out");
      } else {
        console.log("failed in sign out");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // リンク遷移関数
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

  const onClickProfile = () => {
    history.push(`/profile/${currentUser.id}`);
  };

  // ログインユーザーのヘッダーFace
  const headerProfileFace = () => {
    if (currentUser.emotion === "happy") {
      return HappyFace;
    } else if (currentUser.emotion === "anger") {
      return AngerFace;
    } else if (currentUser.emotion === "sorrow") {
      return SorrowFace;
    } else if (currentUser.emotion === "fun") {
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
