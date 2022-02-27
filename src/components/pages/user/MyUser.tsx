import { Box, Flex, HStack } from '@chakra-ui/react';
import { memo, useContext, useState, VFC } from 'react';

import { AuthContext } from '../../../App';
import { ProfileTabButton } from '../../atoms/button/ProfileTabButton';
import { MyPost } from './MyPost';
import { Profile } from './Profile';

type Props = {
  showLabel: string;
};

export const MyUser: VFC<Props> = memo((props) => {
  const [showLabel, setShowLabel] = useState(props.showLabel);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useContext<any>(AuthContext);

  const profileBg = () => {
    if (currentUser.emotion === 'happy') {
      return '#FFF7D4';
    } else if (currentUser.emotion === 'anger') {
      return '#FCB3B1';
    } else if (currentUser.emotion === 'sorrow') {
      return '#DCE3FF';
    } else if (currentUser.emotion === 'fun') {
      return '#E2FFEB';
    }
  };

  return (
    <Box pt="80px" width="100%" height="100%" bg={profileBg()} pb="80px">
      <Box
        width="100%"
        height="120px"
        zIndex="50"
        bg={profileBg()}
        position="fixed"
        top="80px"
        right="0"
        left="0"
        margin="auto"
      >
        <Flex justify="center" my="40px">
          <HStack spacing="24px">
            <ProfileTabButton
              showLabel={showLabel}
              setShowLabel={setShowLabel}
              labelText="MyProfile"
            >
              My Profile
            </ProfileTabButton>

            <ProfileTabButton
              showLabel={showLabel}
              setShowLabel={setShowLabel}
              labelText="MyPost"
            >
              My Post
            </ProfileTabButton>
          </HStack>
        </Flex>
      </Box>
      <Box
        mx="auto"
        width={{ base: '400px', md: '560px' }}
        height="100%"
        mt="120px"
      >
        {showLabel === 'MyProfile' && <Profile />}
        {showLabel === 'MyPost' && <MyPost />}
      </Box>
    </Box>
  );
});
