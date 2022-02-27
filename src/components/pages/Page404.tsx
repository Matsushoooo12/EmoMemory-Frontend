import { memo, useEffect, useState, VFC } from 'react';
import { Text, Box, Heading } from '@chakra-ui/react';

import HappyCard from '../../images/HappyCard.png';
import AngerCard from '../../images/AngerCard.png';
import SorrowCard from '../../images/SorrowCard.png';
import FunCard from '../../images/FunCard.png';

export const Page404: VFC = memo(() => {
  const [randomNumber, setRandomNumber] = useState(0);
  const card = [HappyCard, AngerCard, SorrowCard, FunCard];
  const randomCard = () => {
    const arrayIndex = Math.floor(Math.random() * card.length);
    setRandomNumber(arrayIndex);
  };

  useEffect(() => {
    randomCard();
  }, []);
  return (
    <Box py="80px" width="100%" height="100vh" position="relative">
      <Box
        bgImage={card[randomNumber]}
        bgPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        position="absolute"
        top="0"
        right="0"
        left="0"
        bottom="0"
        margin="auto"
        width="400px"
        height="400px"
      >
        <Box textAlign="center" mt="190px">
          <Heading as="h1" fontSize="40px" mb="16px">
            404
          </Heading>
          <Text>Page not found</Text>
        </Box>
      </Box>
    </Box>
  );
});
