import { Box, Flex, Input, Text, Textarea } from '@chakra-ui/react';
import { memo, VFC } from 'react';
import dayjs from 'dayjs';

import { Post } from '../../../types/post';
import { LikeButtonItem } from '../../atoms/button/LikeButtonItem';

type Props = {
  EmotionCard: string;
  setPost: (value: React.SetStateAction<Post | undefined>) => void;
  post: Post;
  LikeButton: string;
  handleDeleteLike: (id: number) => Promise<void>;
  handleCreateLike: (id: number) => Promise<void>;
  textareaStyle: string;
};

export const PostDetailFormCard: VFC<Props> = memo((props) => {
  const {
    EmotionCard,
    setPost,
    post,
    LikeButton,
    handleDeleteLike,
    handleCreateLike,
    textareaStyle,
  } = props;
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
          className={textareaStyle}
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
          <LikeButtonItem
            post={post}
            LikeButton={LikeButton}
            handleDeleteLike={() => handleDeleteLike(post.id)}
            handleCreateLike={() => handleCreateLike(post.id)}
          />
        </Flex>
      </Box>
    </Box>
  );
});
