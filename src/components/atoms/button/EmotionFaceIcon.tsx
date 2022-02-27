import { Image } from '@chakra-ui/react';
import { memo, VFC } from 'react';

type Props = {
  onClickFace: () => void;
  EmotionFace: string;
  EmotionAlt: string;
};

export const EmotionFaceIcon: VFC<Props> = memo((props) => {
  const { EmotionFace, onClickFace, EmotionAlt } = props;
  return (
    <Image
      width={{ base: '48px', md: '64px' }}
      height={{ base: '48px', md: '64px' }}
      src={EmotionFace}
      alt={EmotionAlt}
      cursor="pointer"
      onClick={onClickFace}
    />
  );
});
