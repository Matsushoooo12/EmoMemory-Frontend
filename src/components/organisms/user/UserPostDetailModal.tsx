import {
  Button,
  Flex,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { memo, useContext, VFC } from 'react';

import HappyCard from '../../../images/HappyCard.png';
import AngerCard from '../../../images/AngerCard.png';
import SorrowCard from '../../../images/SorrowCard.png';
import FunCard from '../../../images/FunCard.png';
import { Post } from '../../../types/post';
import { AuthContext } from '../../../App';
import { UserPostFormCard } from '../../molecules/user/UserPostFormCard';
import { UserPostAnotherCard } from '../../molecules/user/UserPostAnotherCard';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post | undefined>>;
  LikeButton: string;
  handleSubmit: (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
    content: string,
    emotion: string
  ) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
};

export const UserPostDetailModal: VFC<Props> = memo((props) => {
  const {
    isOpen,
    onClose,
    post,
    LikeButton,
    setPost,
    handleSubmit,
    handleDelete,
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useContext<any>(AuthContext);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="none" border="none" shadow="none">
        <ModalCloseButton mr="64px" mt="100px" />
        {currentUser.id === post?.user.id ? (
          <form>
            {post?.emotion === 'happy' && (
              <UserPostFormCard
                EmotionCard={HappyCard}
                post={post}
                LikeButton={LikeButton}
                setPost={setPost}
              />
            )}
            {post?.emotion === 'anger' && (
              <UserPostFormCard
                EmotionCard={AngerCard}
                post={post}
                LikeButton={LikeButton}
                setPost={setPost}
              />
            )}
            {post?.emotion === 'sorrow' && (
              <UserPostFormCard
                EmotionCard={SorrowCard}
                post={post}
                LikeButton={LikeButton}
                setPost={setPost}
              />
            )}
            {post?.emotion === 'fun' && (
              <UserPostFormCard
                EmotionCard={FunCard}
                post={post}
                LikeButton={LikeButton}
                setPost={setPost}
              />
            )}
            <Flex justify="center" mt="16px">
              {post && (
                <HStack spacing="16px">
                  <Button
                    _hover={{ opacity: 0.8 }}
                    bg="#47789F"
                    color="white"
                    width="80px"
                    onClick={(e) =>
                      handleSubmit(e, post?.id, post?.content, post?.emotion)
                    }
                  >
                    編集
                  </Button>
                  <Button
                    border="3px solid #47789F"
                    color="#47789F"
                    width="80px"
                    onClick={() => handleDelete(post?.id)}
                  >
                    削除
                  </Button>
                </HStack>
              )}
            </Flex>
          </form>
        ) : (
          <>
            {post?.emotion === 'happy' && (
              <UserPostAnotherCard
                EmotionCard={HappyCard}
                post={post}
                LikeButton={LikeButton}
                onClose={onClose}
              />
            )}
            {post?.emotion === 'anger' && (
              <UserPostAnotherCard
                EmotionCard={AngerCard}
                post={post}
                LikeButton={LikeButton}
                onClose={onClose}
              />
            )}
            {post?.emotion === 'sorrow' && (
              <UserPostAnotherCard
                EmotionCard={SorrowCard}
                post={post}
                LikeButton={LikeButton}
                onClose={onClose}
              />
            )}
            {post?.emotion === 'fun' && (
              <UserPostAnotherCard
                EmotionCard={FunCard}
                post={post}
                LikeButton={LikeButton}
                onClose={onClose}
              />
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
});
