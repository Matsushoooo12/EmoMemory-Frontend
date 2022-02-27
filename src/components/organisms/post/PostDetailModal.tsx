import {
  Flex,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  ModalCloseButton,
} from '@chakra-ui/react';
import { memo, useContext, VFC } from 'react';

import { AuthContext } from '../../../App';
import { Post } from '../../../types/post';
import HappyCard from '../../../images/HappyCard.png';
import AngerCard from '../../../images/AngerCard.png';
import SorrowCard from '../../../images/SorrowCard.png';
import FunCard from '../../../images/FunCard.png';
import { PostDetailFormCard } from '../../molecules/post/PostDetailFormCard';
import { PostDetailAnotherCard } from '../../molecules/post/PostDetailAnotherCard';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  LikeButton: string;
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post | undefined>>;
  handleSubmit: (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
    content: string,
    emotion: string
  ) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
  handleGetDetailPost: (id: number) => Promise<void>;
  handleGetAllPosts: () => Promise<void> | undefined;
  handleDeleteLike: (id: number) => Promise<void>;
  handleCreateLike: (id: number) => Promise<void>;
};

export const PostDetailModal: VFC<Props> = memo((props) => {
  const {
    isOpen,
    onClose,
    post,
    setPost,
    LikeButton,
    handleSubmit,
    handleDelete,
    handleDeleteLike,
    handleCreateLike,
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
              <PostDetailFormCard
                EmotionCard={HappyCard}
                setPost={setPost}
                post={post}
                LikeButton={LikeButton}
                handleDeleteLike={handleDeleteLike}
                handleCreateLike={handleCreateLike}
                textareaStyle="textarea note happy"
              />
            )}
            {post?.emotion === 'anger' && (
              <PostDetailFormCard
                EmotionCard={AngerCard}
                setPost={setPost}
                post={post}
                LikeButton={LikeButton}
                handleDeleteLike={handleDeleteLike}
                handleCreateLike={handleCreateLike}
                textareaStyle="textarea note anger"
              />
            )}
            {post?.emotion === 'sorrow' && (
              <PostDetailFormCard
                EmotionCard={SorrowCard}
                setPost={setPost}
                post={post}
                LikeButton={LikeButton}
                handleDeleteLike={handleDeleteLike}
                handleCreateLike={handleCreateLike}
                textareaStyle="textarea note sorrow"
              />
            )}
            {post?.emotion === 'fun' && (
              <PostDetailFormCard
                EmotionCard={FunCard}
                setPost={setPost}
                post={post}
                LikeButton={LikeButton}
                handleDeleteLike={handleDeleteLike}
                handleCreateLike={handleCreateLike}
                textareaStyle="textarea note fun"
              />
            )}
            <Flex justify="center" mt="16px">
              <HStack spacing="16px">
                <Button
                  _hover={{ opacity: 0.8 }}
                  bg="#47789F"
                  color="white"
                  width="80px"
                  onClick={(e) =>
                    handleSubmit(e, post.id, post?.content, post?.emotion)
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
            </Flex>
          </form>
        ) : (
          <>
            {post?.emotion === 'happy' && (
              <PostDetailAnotherCard
                EmotionCard={HappyCard}
                onClose={onClose}
                post={post}
                LikeButton={LikeButton}
                handleDeleteLike={handleDeleteLike}
                handleCreateLike={handleCreateLike}
                textareaStyle="textarea note happy"
              />
            )}
            {post?.emotion === 'anger' && (
              <PostDetailAnotherCard
                EmotionCard={AngerCard}
                onClose={onClose}
                post={post}
                LikeButton={LikeButton}
                handleDeleteLike={handleDeleteLike}
                handleCreateLike={handleCreateLike}
                textareaStyle="textarea note anger"
              />
            )}
            {post?.emotion === 'sorrow' && (
              <PostDetailAnotherCard
                EmotionCard={SorrowCard}
                onClose={onClose}
                post={post}
                LikeButton={LikeButton}
                handleDeleteLike={handleDeleteLike}
                handleCreateLike={handleCreateLike}
                textareaStyle="textarea note sorrow"
              />
            )}
            {post?.emotion === 'fun' && (
              <PostDetailAnotherCard
                EmotionCard={FunCard}
                onClose={onClose}
                post={post}
                LikeButton={LikeButton}
                handleDeleteLike={handleDeleteLike}
                handleCreateLike={handleCreateLike}
                textareaStyle="textarea note fun"
              />
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
});
