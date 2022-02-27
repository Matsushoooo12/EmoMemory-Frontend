import {
  Box,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { memo, useContext, VFC } from 'react';
import dayjs from 'dayjs';

import { Post } from '../../../types/post';
import { AuthContext } from '../../../App';

type Props = {
  EmotionCard: string;
  post: Post;
  LikeButton: string;
  setPost: React.Dispatch<React.SetStateAction<Post | undefined>>;
};

export const UserPostFormCard: VFC<Props> = memo((props) => {
  const { EmotionCard, post, LikeButton, setPost } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useContext<any>(AuthContext);
  return (
    <Box
      bgImage={EmotionCard}
      bgPosition="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      width="400px"
      height="400px"
      cursor="pointer"
    >
      <Box textAlign="center" pt="150px">
        <Input
          type="hidden"
          name="emotion"
          onChange={(e) => setPost({ ...post, emotion: e.target.value })}
        />
        <Textarea
          resize="none"
          variant="unstyled"
          className="textarea note happy"
          width="60%"
          height="200px"
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          value={post?.content}
          name="content"
        />
        <Flex justify="space-between" align="center" width="100%" px="80px">
          <Text fontSize="14px">
            {dayjs(post?.createdAt).format('YYYY/MM/DD')}
          </Text>
          <Flex align="center">
            <HStack spacing={1}>
              {post.likes?.find((like) => like.userId === currentUser.id) ? (
                <Image
                  src={LikeButton}
                  alt="LikeButton"
                  width="24px"
                  height="24px"
                />
              ) : (
                <Image
                  src={LikeButton}
                  alt="LikeButton"
                  width="24px"
                  height="24px"
                  opacity={0.3}
                />
              )}
              <Text fontSize="14px">{post?.likes.length}</Text>
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
});
