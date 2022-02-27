import { Box, Flex } from '@chakra-ui/react';
import React, { memo, useState, VFC } from 'react';

import '../../../App.css';
import HappyFace from '../../../images/HappyFace.png';
import HappyCard from '../../../images/HappyCard.png';
import AngerFace from '../../../images/AngerFace.png';
import AngerCard from '../../../images/AngerCard.png';
import SorrowFace from '../../../images/SorrowFace.png';
import SorrowCard from '../../../images/SorrowCard.png';
import FunFace from '../../../images/FunFace.png';
import FunCard from '../../../images/FunCard.png';
import { useHistory } from 'react-router-dom';
import { createPost } from '../../../api/post';
import { EmotionFaceIcon } from '../../atoms/button/EmotionFaceIcon';
import { PostCreateCard } from '../../molecules/post/PostCreateCard';

export const Home: VFC = memo(() => {
  const history = useHistory();
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState('happy');
  const handleHappy = () => {
    setEmotion('happy');
  };

  const handleAnger = () => {
    setEmotion('anger');
  };

  const handleSorrow = () => {
    setEmotion('sorrow');
  };

  const handleFun = () => {
    setEmotion('fun');
  };

  const handleReset = () => {
    setContent('');
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleEmotionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmotion(e.target.value);
  };

  const generateParams = () => {
    const postParams = {
      content: content,
      emotion: emotion,
    };
    return postParams;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const params = generateParams();
    try {
      const res = await createPost(params);
      console.log(res);
      setContent('');
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box pt="80px" width="100%" height="100vh" position="relative">
      <Box
        width="400px"
        height="560"
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        margin="auto"
      >
        <Flex justify="space-around" mx="40px" mb="24px">
          <EmotionFaceIcon
            onClickFace={handleHappy}
            EmotionFace={HappyFace}
            EmotionAlt="HappyFace"
          />
          <EmotionFaceIcon
            onClickFace={handleAnger}
            EmotionFace={AngerFace}
            EmotionAlt="AngerFace"
          />
          <EmotionFaceIcon
            onClickFace={handleSorrow}
            EmotionFace={SorrowFace}
            EmotionAlt="SorrowFace"
          />
          <EmotionFaceIcon
            onClickFace={handleFun}
            EmotionFace={FunFace}
            EmotionAlt="FunFace"
          />
        </Flex>
        {emotion === 'happy' && (
          <PostCreateCard
            EmotionCard={HappyCard}
            handleEmotionChange={handleEmotionChange}
            handleContentChange={handleContentChange}
            content={content}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
            textareaStyle="textarea note happy"
          />
        )}
        {emotion === 'anger' && (
          <PostCreateCard
            EmotionCard={AngerCard}
            handleEmotionChange={handleEmotionChange}
            handleContentChange={handleContentChange}
            content={content}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
            textareaStyle="textarea note anger"
          />
        )}
        {emotion === 'sorrow' && (
          <PostCreateCard
            EmotionCard={SorrowCard}
            handleEmotionChange={handleEmotionChange}
            handleContentChange={handleContentChange}
            content={content}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
            textareaStyle="textarea note sorrow"
          />
        )}
        {emotion === 'fun' && (
          <PostCreateCard
            EmotionCard={FunCard}
            handleEmotionChange={handleEmotionChange}
            handleContentChange={handleContentChange}
            content={content}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
            textareaStyle="textarea note fun"
          />
        )}
      </Box>
    </Box>
  );
});
