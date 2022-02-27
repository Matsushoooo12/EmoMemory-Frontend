import { Box, useDisclosure } from '@chakra-ui/react';
import React, { memo, useContext, useState, VFC } from 'react';

import LikeButton from '../../../images/LikeButton.png';
import '../../../App.css';
import { AuthContext } from '../../../App';
import { Like } from '../../../types/like';
import { Post } from '../../../types/post';
import { deletePost, getAPost, updatePost } from '../../../api/post';
import { EmotionFaceIcons } from '../../molecules/EmotionFaceIcons';
import { UserPostIndex } from '../../organisms/user/UserPostIndex';
import { UserPostDetailModal } from '../../organisms/user/UserPostDetailModal';

export const MyPost: VFC = memo(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser, handleGetCurrentUser } = useContext<any>(AuthContext);

  // カードの色変更
  const [emotion, setEmotion] = useState('');

  // 投稿詳細
  const [post, setPost] = useState<Post>();

  const handleGetDetailPost = async (id: number) => {
    try {
      const res = await getAPost(id);
      console.log(res.data);
      setPost(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  // 投稿編集モーダル
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 投稿編集
  const generateParams = (content: string, emotion: string) => {
    const updateParams = {
      content: content,
      emotion: emotion,
    };
    return updateParams;
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
    content: string,
    emotion: string
  ) => {
    e.preventDefault();
    const params = generateParams(content, emotion);
    try {
      const res = await updatePost(id, params);
      console.log(res.data);
      handleGetCurrentUser();
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  // 投稿削除
  const handleDelete = async (id: number) => {
    console.log('click', id);
    try {
      const res = await deletePost(id);
      console.log(res.data);
      handleGetCurrentUser();
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Box position="fixed" left="0" right="0" margin="auto" zIndex="50">
        <EmotionFaceIcons setEmotion={setEmotion} mt="16px" />
      </Box>
      <Box
        pt="100px"
        width="100%"
        height="100%"
        bg="#EDF2F6"
        pb="80px"
        borderRadius="md"
        shadow="md"
      >
        {currentUser.posts.map(
          (post: {
            emotion: string;
            likes: Like[];
            content: string;
            id: number;
            createdAt: string;
          }) => (
            <React.Fragment key={post.id}>
              {post.emotion === emotion && (
                <UserPostIndex
                  post={post}
                  LikeButton={LikeButton}
                  onOpen={onOpen}
                  handleGetDetailPost={handleGetDetailPost}
                />
              )}
              {emotion === '' && (
                <UserPostIndex
                  post={post}
                  LikeButton={LikeButton}
                  onOpen={onOpen}
                  handleGetDetailPost={handleGetDetailPost}
                />
              )}
            </React.Fragment>
          )
        )}
      </Box>
      {post && (
        <UserPostDetailModal
          isOpen={isOpen}
          onClose={onClose}
          post={post}
          setPost={setPost}
          LikeButton={LikeButton}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
});
