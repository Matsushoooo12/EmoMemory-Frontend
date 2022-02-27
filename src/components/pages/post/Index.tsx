import { Box, useDisclosure } from '@chakra-ui/react';
import React, { memo, useEffect, useState, VFC } from 'react';
import { Wrap } from '@chakra-ui/react';

import '../../../App.css';
import LikeButton from '../../../images/LikeButton.png';
import { Post } from '../../../types/post';
import {
  deletePost,
  getAllPosts,
  getAPost,
  updatePost,
} from '../../../api/post';
import { createLike, deleteLike } from '../../../api/like';
import { PostDetailModal } from '../../organisms/post/PostDetailModal';
import { EmotionFaceIcons } from '../../molecules/EmotionFaceIcons';
import { PostIndexWrap } from '../../organisms/post/PostIndexWrap';

export const Index: VFC = memo(() => {
  // 投稿一覧
  const [posts, setPosts] = useState<Post[]>([]);
  const handleGetAllPosts = async () => {
    try {
      const res = await getAllPosts();
      console.log(res);
      setPosts(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetAllPosts();
  }, []);

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

  // いいね機能
  const handleCreateLike = async (id: number) => {
    try {
      const res = await createLike(id);
      console.log(res.data);
      handleGetDetailPost(id);
      handleGetAllPosts();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteLike = async (id: number) => {
    try {
      const res = await deleteLike(id);
      console.log(res.data);
      handleGetDetailPost(id);
      handleGetAllPosts();
    } catch (e) {
      console.log(e);
    }
  };

  // モーダル
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onClickModalPost = (id: number) => {
    handleGetDetailPost(id);
    onOpen();
  };

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
      handleGetAllPosts();
      // eslint-disable-next-line no-restricted-globals
      location.reload();
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
      handleGetAllPosts();
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  // カード絞り込み
  const [emotion, setEmotion] = useState('');

  return (
    <>
      <Box py="80px" width="100%" height="100%" minHeight="100vh">
        <Box width="80%" mx="auto" mt="80px">
          <Box
            px={{ base: '20px', md: '80px' }}
            position="fixed"
            right="0"
            left="0"
            margin="auto"
            zIndex="50"
          >
            <EmotionFaceIcons setEmotion={setEmotion} mt="0" />
          </Box>
          <Wrap spacing="40px" justify="center" pt="100px">
            {posts.map((post) => (
              <PostIndexWrap
                emotion={emotion}
                onClickModalPost={() => onClickModalPost(post.id)}
                LikeButton={LikeButton}
                handleDeleteLike={() => handleDeleteLike(post.id)}
                handleCreateLike={() => handleCreateLike(post.id)}
                key={post.id}
                post={post}
              />
            ))}
          </Wrap>
        </Box>
      </Box>
      {post && (
        <PostDetailModal
          isOpen={isOpen}
          onClose={onClose}
          LikeButton={LikeButton}
          post={post}
          setPost={setPost}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          handleGetDetailPost={handleGetDetailPost}
          handleGetAllPosts={handleGetAllPosts}
          handleDeleteLike={handleDeleteLike}
          handleCreateLike={handleCreateLike}
        />
      )}
    </>
  );
});
