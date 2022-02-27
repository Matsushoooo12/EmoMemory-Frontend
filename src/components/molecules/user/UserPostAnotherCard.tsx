import { Box, Flex, HStack, Image, Text, Textarea } from '@chakra-ui/react';
import { memo, useContext, VFC } from 'react';
import dayjs from 'dayjs';

import { AuthContext } from '../../../App';
import { Post } from '../../../types/post';

type Props = {
  EmotionCard: string;
  onClose: () => void;
  post: Post;
  LikeButton: string;
};

export const UserPostAnotherCard: VFC<Props> = memo((props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useContext<any>(AuthContext);
  const { EmotionCard, onClose, post, LikeButton } = props;
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
        <Textarea
          onClick={onClose}
          cursor="pointer"
          resize="none"
          variant="unstyled"
          className="textarea note happy"
          width="60%"
          height="200px"
          readOnly
          defaultValue={post?.content}
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
