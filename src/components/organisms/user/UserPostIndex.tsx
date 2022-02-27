import { Box, Flex, Image, Text, Textarea } from '@chakra-ui/react';
import { memo, VFC } from 'react';
import dayjs from 'dayjs';

import { Post } from '../../../types/post';
import HappyLongCard from '../../../images/HappyLongCard.png';
import AngerLongCard from '../../../images/AngerLongCard.png';
import SorrowLongCard from '../../../images/SorrowLongCard.png';
import FunLongCard from '../../../images/FunLongCard.png';

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

  const spEmotionWidth = (emotion: string) => {
    if (emotion === 'happy') {
      return '380px';
    } else if (emotion === 'anger') {
      return '380px';
    } else if (emotion === 'sorrow') {
      return '380px';
    } else if (emotion === 'fun') {
      return '380px';
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

  const spEmotionHeight = (emotion: string) => {
    if (emotion === 'happy') {
      return '195px';
    } else if (emotion === 'anger') {
      return '195px';
    } else if (emotion === 'sorrow') {
      return '175px';
    } else if (emotion === 'fun') {
      return '186px';
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

  const spLikeButtonTop = (emotion: string) => {
    if (emotion === 'happy') {
      return '16px';
    } else if (emotion === 'anger') {
      return '16px';
    } else if (emotion === 'sorrow') {
      return '3px';
    } else if (emotion === 'fun') {
      return '13px';
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

  const spTextareaTop = (emotion: string) => {
    if (emotion === 'happy') {
      return '80px';
    } else if (emotion === 'anger') {
      return '80px';
    } else if (emotion === 'sorrow') {
      return '60px';
    } else if (emotion === 'fun') {
      return '75px';
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
      width={{
        base: spEmotionWidth(post.emotion),
        md: emotionWidth(post.emotion),
      }}
      height={{
        base: spEmotionHeight(post.emotion),
        md: emotionHeight(post.emotion),
      }}
      mx="auto"
      mb="24px"
      position="relative"
      cursor="pointer"
    >
      <Flex
        position="absolute"
        right="40px"
        top={{
          base: spLikeButtonTop(post.emotion),
          md: likeButtonTop(post.emotion),
        }}
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
        height={{ base: '80px', md: '128px' }}
        position="absolute"
        top={{
          base: spTextareaTop(post.emotion),
          md: textareaTop(post.emotion),
        }}
        left="0"
        right="0"
        margin="auto"
        readOnly
        cursor="pointer"
        defaultValue={post.content}
        fontSize={{ base: '12px', md: '16px' }}
      />
      <Text
        position="absolute"
        bottom="10px"
        right={{ base: '42px', md: '56px' }}
        fontSize="12px"
      >
        {dayjs(post.createdAt).format('YYYY/MM/DD')}
      </Text>
    </Box>
  );
});
