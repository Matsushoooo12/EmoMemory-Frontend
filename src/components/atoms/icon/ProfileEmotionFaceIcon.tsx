import { Image } from '@chakra-ui/react';
import { memo, useContext, VFC } from 'react';

import { AuthContext } from '../../../App';

type Props = {
  EmotionFace: string;
  emotion: string;
};

export const ProfileEmotionFaceIcon: VFC<Props> = memo((props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useContext<any>(AuthContext);
  const { EmotionFace, emotion } = props;

  const postIndexBorder = (emotion: string) => {
    if (emotion === 'happy') {
      return '5px solid yellow';
    } else if (emotion === 'anger') {
      return '5px solid red';
    } else if (emotion === 'sorrow') {
      return '5px solid blue';
    } else if (emotion === 'fun') {
      return '5px solid green';
    }
  };
  return (
    <Image
      src={EmotionFace}
      width="60px"
      height="60px"
      border={
        currentUser.emotion === emotion ? postIndexBorder(emotion) : 'none'
      }
      shadow={currentUser.emotion === emotion ? 'md' : 'none'}
    />
  );
});
