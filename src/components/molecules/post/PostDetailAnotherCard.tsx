import { Box, Flex, Text, Textarea } from '@chakra-ui/react';
import { memo, VFC } from 'react';
import dayjs from 'dayjs';

import { Post } from '../../../types/post';
import { LikeButtonItem } from '../../atoms/button/LikeButtonItem';

type Props = {
  EmotionCard: string;
  onClose: () => void;
  post: Post;
  LikeButton: string;
  handleDeleteLike: (id: number) => Promise<void>;
  handleCreateLike: (id: number) => Promise<void>;
  textareaStyle: string;
};

export const PostDetailAnotherCard: VFC<Props> = memo((props) => {
  const {
    EmotionCard,
    onClose,
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
        <Textarea
          onClick={onClose}
          cursor="pointer"
          resize="none"
          variant="unstyled"
          className={textareaStyle}
          width="60%"
          height="200px"
          readOnly
          defaultValue={post?.content}
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
