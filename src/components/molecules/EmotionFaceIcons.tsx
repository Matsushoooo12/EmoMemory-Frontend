import { Flex, HStack } from '@chakra-ui/react';
import { memo, VFC } from 'react';

import HappyFace from '../../images/HappyFace.png';
import AngerFace from '../../images/AngerFace.png';
import SorrowFace from '../../images/SorrowFace.png';
import FunFace from '../../images/FunFace.png';
import { EmotionFaceIcon } from '../atoms/button/EmotionFaceIcon';

type Props = {
  setEmotion: React.Dispatch<React.SetStateAction<string>>;
  mt: string;
};

export const EmotionFaceIcons: VFC<Props> = memo((props) => {
  const { setEmotion, mt } = props;
  const onClickAll = () => {
    setEmotion('');
  };

  const onClickHappy = () => {
    setEmotion('happy');
  };

  const onClickAnger = () => {
    setEmotion('anger');
  };

  const onClickSorrow = () => {
    setEmotion('sorrow');
  };

  const onClickFun = () => {
    setEmotion('fun');
  };
  return (
    <Flex justify="center" mb="40px" mt={mt}>
      <HStack spacing={{ base: '8px', md: '24px' }}>
        <Flex
          bg="red"
          color="white"
          width={{ base: '36px', md: '44px' }}
          height={{ base: '36px', md: '44px' }}
          borderRadius="50%"
          mt="12px"
          mb="2px"
          mr={{ base: '0', md: '12px' }}
          border="3px solid yellow"
          justify="center"
          align="center"
          fontWeight="bold"
          onClick={onClickAll}
          cursor="pointer"
          fontSize={{ base: '12px', md: '16px' }}
        >
          All
        </Flex>
        <EmotionFaceIcon
          onClickFace={onClickHappy}
          EmotionFace={HappyFace}
          EmotionAlt="HappyFace"
        />
        <EmotionFaceIcon
          onClickFace={onClickAnger}
          EmotionFace={AngerFace}
          EmotionAlt="AngerFace"
        />
        <EmotionFaceIcon
          onClickFace={onClickSorrow}
          EmotionFace={SorrowFace}
          EmotionAlt="SorrowFace"
        />
        <EmotionFaceIcon
          onClickFace={onClickFun}
          EmotionFace={FunFace}
          EmotionAlt="FunFace"
        />
      </HStack>
    </Flex>
  );
});
