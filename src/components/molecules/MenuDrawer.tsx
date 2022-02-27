import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { memo, useContext, VFC } from 'react';

import { AuthContext } from '../../App';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  headerLogo: string;
  onClickHome: () => void;
  onClickIndex: () => void;
  onClickProfile: () => void;
  handleSignOut: () => void;
  headerProfileFace: () => string | undefined;
};

export const MenuDrawer: VFC<Props> = memo((props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useContext<any>(AuthContext);

  const {
    onClose,
    isOpen,
    headerLogo,
    onClickHome,
    onClickIndex,
    onClickProfile,
    handleSignOut,
    headerProfileFace,
  } = props;

  const headerDrawerBg = () => {
    if (currentUser?.emotion === 'happy') {
      return '#FFF7D4';
    } else if (currentUser?.emotion === 'anger') {
      return '#FFD6D7';
    } else if (currentUser?.emotion === 'sorrow') {
      return '#EDF2F6';
    } else if (currentUser?.emotion === 'fun') {
      return '#E2FFEB';
    }
  };
  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent bg={headerDrawerBg()}>
          <DrawerBody textAlign="center" fontWeight="bold" mt="24px">
            <Stack spacing="24px">
              <Image
                width="140px"
                src={headerLogo}
                alt="HeaderLogo"
                display="block"
                mx="auto"
                onClick={onClickHome}
                cursor="pointer"
              />
              <Box>
                <Link onClick={onClickHome}>新規投稿</Link>
              </Box>
              <Box>
                <Link onClick={onClickIndex}>投稿一覧</Link>
              </Box>
              <Box>
                <Link onClick={onClickProfile}>
                  <Flex align="center" justify="center">
                    <Image
                      src={headerProfileFace()}
                      alt="HappyFace"
                      width="40px"
                      height="40px"
                      mb="4px"
                    />
                    <Text>{currentUser?.name}</Text>
                  </Flex>
                </Link>
              </Box>
              <Box>
                <Link onClick={handleSignOut}>ログアウト</Link>
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
