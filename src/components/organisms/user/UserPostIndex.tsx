import { Box, Flex, Image, Text, Textarea } from '@chakra-ui/react';
import { memo, VFC } from 'react';
import dayjs from 'dayjs';

import { Post } from '../../../types/post';
import HappyLongCard from '../../../images/喜付箋横長.png';
import AngerLongCard from '../../../images/怒付箋横長.png';
import SorrowLongCard from '../../../images/哀付箋横長.png';
import FunLongCard from '../../../images/楽付箋横長.png';

type Props = {
  post: Omit<Post, 'updatedAt' | 'user'>;
  LikeButton: string;
  onOpen: () => void;
  handleGetDetailPost: (id: number) => Promise<void>;
};

export const UserPostIndex: VFC<Props> = memo((props) => {
  const { post, LikeButton, onOpen, handleGetDetailPost } = props;

  // 感情ごとにカードの切り替え
  const textareaColor = (emotion: string) => {
    if (emotion === 'happy') {
      return 'textarea note happy';
    } else if (emotion === 'anger') {
      return 'textarea note anger';
    } else if (emotion === 'sorrow') {
      return 'textarea note sorrow';
    } else if (emotion === 'fun') {
      return 'textarea note fun';
    }
  };

  const cardColor = (emotion: string) => {
    if (emotion === 'happy') {
      return HappyLongCard;
    } else if (emotion === 'anger') {
      return AngerLongCard;
    } else if (emotion === 'sorrow') {
      return SorrowLongCard;
    } else if (emotion === 'fun') {
      return FunLongCard;
    }
  };

  const emotionWidth = (emotion: string) => {
    if (emotion === 'happy') {
      return '548px';
    } else if (emotion === 'anger') {
      return '548px';
    } else if (emotion === 'sorrow') {
      return '548px';
    } else if (emotion === 'fun') {
      return '548px';
    }
  };

  const emotionHeight = (emotion: string) => {
    if (emotion === 'happy') {
      return '278px';
    } else if (emotion === 'anger') {
      return '278px';
    } else if (emotion === 'sorrow') {
      return '252px';
    } else if (emotion === 'fun') {
      return '272px';
    }
  };

  const likeButtonTop = (emotion: string) => {
    if (emotion === 'happy') {
      return '40px';
    } else if (emotion === 'anger') {
      return '40px';
    } else if (emotion === 'sorrow') {
      return '12px';
    } else if (emotion === 'fun') {
      return '32px';
    }
  };

  const textareaTop = (emotion: string) => {
    if (emotion === 'happy') {
      return '120px';
    } else if (emotion === 'anger') {
      return '120px';
    } else if (emotion === 'sorrow') {
      return '96px';
    } else if (emotion === 'fun') {
      return '116px';
    }
  };

  const onClickModalPost = (id: number) => {
    handleGetDetailPost(id);
    onOpen();
  };
  return (
    <Box
      bgImage={cardColor(post.emotion)}
      bgPosition="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      width={emotionWidth(post.emotion)}
      height={emotionHeight(post.emotion)}
      mx="auto"
      mb="24px"
      position="relative"
      cursor="pointer"
    >
      <Flex
        position="absolute"
        right="40px"
        top={likeButtonTop(post.emotion)}
        align="center"
      >
        <Image src={LikeButton} width="40px" height="40px" mr="8px" />
        <Text fontSize="24px" fontWeight="bold">
          {post.likes.length}
        </Text>
      </Flex>
      <Textarea
        onClick={() => onClickModalPost(post.id)}
        resize="none"
        variant="unstyled"
        className={textareaColor(post.emotion)}
        width="80%"
        height="128px"
        position="absolute"
        top={textareaTop(post.emotion)}
        left="0"
        right="0"
        margin="auto"
        readOnly
        cursor="pointer"
        defaultValue={post.content}
      />
      <Text position="absolute" bottom="10px" right="56px" fontSize="12px">
        {dayjs(post.createdAt).format('YYYY/MM/DD')}
      </Text>
    </Box>
  );
});
