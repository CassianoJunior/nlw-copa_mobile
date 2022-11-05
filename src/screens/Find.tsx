import { useNavigation } from '@react-navigation/native';
import { Heading, useToast, VStack } from 'native-base';
import { useState } from 'react';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { api } from '../services/api';

const Find = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pollCode, setPollCode] = useState('');

  const { navigate } = useNavigation();

  const toast = useToast();

  const handleJoinPoll = async () => {
    try {
      setIsLoading(true);

      if (!pollCode.trim()) {
        return toast.show({
          title: 'Please enter a poll code',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      await api.post('/polls/join', { code: pollCode });

      toast.show({
        title: 'Poll joined successfully',
        placement: 'top',
        bgColor: 'green.500',
      });

      setPollCode('');
      setIsLoading(false);
      navigate('polls');
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setPollCode('');
      if (err.response?.data?.message === 'Poll not found') {
        return toast.show({
          title: 'Poll not found',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      if (err.response?.data?.message === 'User already joined in this poll') {
        return toast.show({
          title: 'You already joined in this poll',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      return toast.show({
        title: 'Could not join poll',
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  };

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de{'\n'} seu código único
        </Heading>
        <Input
          mb={2}
          placeholder="Qual código do bolão?"
          value={pollCode}
          onChangeText={setPollCode}
          autoCapitalize="characters"
        />
        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleJoinPoll}
        />
      </VStack>
    </VStack>
  );
};

export { Find };
