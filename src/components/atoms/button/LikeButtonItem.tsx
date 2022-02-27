import { Flex, HStack, Image, Text } from '@chakra-ui/react';
import { memo, useContext, VFC } from 'react';

import { AuthContext } from '../../../App';
import { Post } from '../../../types/post';

type Props = {
  post: Post;
  LikeButton: string;
  handleDeleteLike: (id: number) => Promise<void>;
  handleCreateLike: (id: number) => Promise<void>;
};

export const LikeButtonItem: VFC<Props> = memo((props) => {
  const { post, LikeButton, handleDeleteLike, handleCreateLike } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useContext<any>(AuthContext);
  return (
    <Flex align="center">
      <HStack spacing={1}>
        {post.likes?.find((like) => like.userId === currentUser.id) ? (
          <Image
            src={LikeButton}
            alt="LikeButton"
            width="24px"
            height="24px"
            onClick={() => handleDeleteLike(post.id)}
          />
        ) : (
          <Image
            src={LikeButton}
            alt="LikeButton"
            width="24px"
            height="24px"
            opacity={0.3}
            onClick={() => handleCreateLike(post.id)}
          />
        )}
        <Text fontSize="12px">{post.likes.length}</Text>
      </HStack>
    </Flex>
  );
});
