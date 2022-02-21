import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import { memo, useContext, useState, VFC } from "react";
import { AuthContext } from "../../../App";
import { MyPost } from "./MyPost";
import { Profile } from "./Profile";

type Props = {
  showLabel: string;
};

export const MyUser: VFC<Props> = memo((props) => {
  const [showLabel, setShowLabel] = useState(props.showLabel);

  const { currentUser } = useContext<any>(AuthContext);

  const profileBg = () => {
    if (currentUser.emotion === "happy") {
      return "#FFF7D4";
    } else if (currentUser.emotion === "anger") {
      return "#FCB3B1";
    } else if (currentUser.emotion === "sorrow") {
      return "#DCE3FF";
    } else if (currentUser.emotion === "fun") {
      return "#E2FFEB";
    }
  };

  return (
    <Box pt="80px" width="100%" height="100%" bg={profileBg()}>
      <Flex justify="center" my="40px">
        <HStack spacing="24px">
          <Button
            width="100px"
            onClick={() => setShowLabel("MyProfile")}
            bg={showLabel === "MyProfile" ? "#47789F" : "white"}
            color={showLabel === "MyProfile" ? "white" : "#47789F"}
            border={showLabel === "MyProfile" ? "none" : "3px solid #47789F"}
            _hover={{ opacity: 0.8 }}
          >
            My Profile
          </Button>
          <Button
            width="100px"
            onClick={() => setShowLabel("MyPost")}
            bg={showLabel === "MyPost" ? "#47789F" : "white"}
            color={showLabel === "MyPost" ? "white" : "#47789F"}
            border={showLabel === "MyPost" ? "none" : "3px solid #47789F"}
            _hover={{ opacity: 0.8 }}
          >
            My Post
          </Button>
        </HStack>
      </Flex>
      <Box mx="auto" width="560px" height="100%">
        <>
          {showLabel === "MyProfile" && <Profile />}
          {showLabel === "MyPost" && <MyPost />}
        </>
      </Box>
    </Box>
  );
});
