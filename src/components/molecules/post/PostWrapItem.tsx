import { Box, Flex, Text, Textarea, WrapItem } from '@chakra-ui/react';
import { memo, VFC, useContext } from 'react';
import dayjs from 'dayjs';

import { AuthContext } from '../../../App';
import { Post } from '../../../types/post';
import { LikeButtonItem } from '../../atoms/button/LikeButtonItem';

type Props = {
  post: Post;
  onClickModalPost: (id: number) => void;
  LikeButton: string;
  handleDeleteLike: (id: number) => Promise<void>;
  handleCreateLike: (id: number) => Promise<void>;
};

export const PostWrapItem: VFC<Props> = memo((props) => {
  const {
    onClickModalPost,
    LikeButton,
    handleDeleteLike,
    handleCreateLike,
    post,
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useContext<any>(AuthContext);

  const cardColor = (emotion: string) => {
    if (emotion === 'happy') {
      return '#FFF7D4';
    } else if (emotion === 'anger') {
      return '#FFD6D7';
    } else if (emotion === 'sorrow') {
      return '#DCE3FF';
    } else if (emotion === 'fun') {
      return '#E2FFEB';
    }
  };

  const cardBorderColor = (emotion: string, userId: number) => {
    if (currentUser.id === userId) {
      if (emotion === 'happy') {
        return '3px solid yellow';
      } else if (emotion === 'anger') {
        return '3px solid red';
      } else if (emotion === 'sorrow') {
        return '3px solid blue';
      } else if (emotion === 'fun') {
        return '3px solid green';
      }
    } else {
      return 'none';
    }
  };

  const textareaColor = (emotion: string) => {
    if (emotion === 'happy') {
      return 'textarea note happy index';
    } else if (emotion === 'anger') {
      return 'textarea note anger index';
    } else if (emotion === 'sorrow') {
      return 'textarea note sorrow index';
    } else if (emotion === 'fun') {
      return 'textarea note fun index';
    }
  };
  return (
    <WrapItem
      width="200px"
      height="200px"
      bg={cardColor(post.emotion)}
      border={cardBorderColor(post.emotion, post.user.id)}
      borderRadius="md"
      justifyContent="center"
      cursor="pointer"
    >
      <Box textAlign="center">
        <Textarea
          cursor="pointer"
          isReadOnly
          mt="24px"
          resize="none"
          variant="unstyled"
          className={textareaColor(post.emotion)}
          width="100%"
          height="140px"
          fontSize="12px"
          defaultValue={post.content}
          onClick={() => onClickModalPost(post.id)}
        />
        <Flex justify="space-between" align="center">
          <Text fontSize="12px">
            {dayjs(post.createdAt).format('YYYY/MM/DD')}
          </Text>
          <LikeButtonItem
            post={post}
            LikeButton={LikeButton}
            handleDeleteLike={() => handleDeleteLike(post.id)}
            handleCreateLike={() => handleCreateLike(post.id)}
          />
        </Flex>
      </Box>
    </WrapItem>
  );
});
