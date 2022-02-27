import { memo, VFC } from 'react';
import { Image } from '@chakra-ui/react';

type Props = {
  EmotionFace: string;
  emotionText: string;
  marginLeft: string;
  marginTop: string;
  marginRight: string;
  marginBottom: string;
};

export const AuthEmotionFaceIcon: VFC<Props> = memo((props) => {
  const {
    EmotionFace,
    emotionText,
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
  } = props;
  return (
    <Image
      width="64px"
      height="64px"
      marginLeft={marginLeft}
      marginTop={marginTop}
      marginRight={marginRight}
      marginBottom={marginBottom}
      src={EmotionFace}
      alt={emotionText}
    />
  );
});
