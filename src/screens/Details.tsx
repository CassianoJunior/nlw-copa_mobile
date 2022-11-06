import { useRoute } from '@react-navigation/native';
import { HStack, useToast, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { Share } from 'react-native';
import { EmptyMyPollList } from '../components/EmptyMyPollList';
import { Guesses } from '../components/Guesses';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { Option } from '../components/Option';
import { PollCardProps } from '../components/PollCard';
import { PollHeader } from '../components/PollHeader';
import { api } from '../services/api';

interface RouteParams {
  id: string;
}

const Details = () => {
  const route = useRoute();
  const { id } = route.params as RouteParams;
  const [poll, setPoll] = useState<PollCardProps>({} as PollCardProps);
  const [optionSelected, setOptionSelected] = useState<'palpites' | 'ranking'>(
    'palpites'
  );

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const fecthPollDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`polls/${id}`);
      setPoll(response.data.poll);
    } catch (err) {
      console.log(err);

      return toast.show({
        title: 'Could not fetch poll details',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeShare = async () => {
    await Share.share({
      message: `Join in my poll ${poll.title}. Use the code ${poll.code} on app nlw-copa`,
    });
  };

  useEffect(() => {
    fecthPollDetails();
  }, [id]);

  return isLoading ? (
    <Loading />
  ) : (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={poll.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />
      {poll._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PollHeader data={poll} />
          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              isSelected={optionSelected === 'palpites'}
              onPress={() => setOptionSelected('palpites')}
            />
            <Option
              title="Ranking do grupo"
              isSelected={optionSelected === 'ranking'}
              onPress={() => setOptionSelected('ranking')}
            />
          </HStack>
          <VStack>
            <Guesses pollId={poll.id} code={poll.code} />
          </VStack>
        </VStack>
      ) : (
        <EmptyMyPollList code={poll.code} />
      )}
    </VStack>
  );
};

export { Details };
