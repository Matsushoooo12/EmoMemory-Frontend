import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import { memo, useState, VFC } from "react";
import { MyPost } from "./MyPost";
import { Profile } from "./Profile";

type Props = {
  showLabel: string;
};

export const MyUser: VFC<Props> = memo((props) => {
  const [showLabel, setShowLabel] = useState(props.showLabel);

  return (
    <Box pt="80px" width="100%" height="100%">
      <Flex justify="center" mt="40px">
        <HStack spacing="24px">
          <Button
            width="100px"
            onClick={() => setShowLabel("MyProfile")}
            bg={showLabel === "MyProfile" ? "#47789F" : "white"}
            color={showLabel === "MyProfile" ? "white" : "#47789F"}
            border={showLabel === "MyProfile" ? "none" : "3px solid #47789F"}
          >
            My Profile
          </Button>
          <Button
            width="100px"
            onClick={() => setShowLabel("MyPost")}
            bg={showLabel === "MyPost" ? "#47789F" : "white"}
            color={showLabel === "MyPost" ? "white" : "#47789F"}
            border={showLabel === "MyPost" ? "none" : "3px solid #47789F"}
          >
            My Post
          </Button>
        </HStack>
      </Flex>
      <Box textAlign="center">
        <>
          {showLabel === "MyProfile" && <Profile />}
          {showLabel === "MyPost" && <MyPost />}
        </>
      </Box>
    </Box>
  );
});
