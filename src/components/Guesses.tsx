import { FlatList, useToast } from 'native-base';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { EmptyMyPollList } from './EmptyMyPollList';
import { Game, GameProps } from './Game';

interface Props {
  pollId: string;
  code: string;
}

const Guesses = ({ pollId, code }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const [firstTeamPoints, setFirstTeamPoints] = useState('');
  const [secondTeamPoints, setSecondTeamPoints] = useState('');
  const [games, setGames] = useState<GameProps[]>([]);

  const toast = useToast();

  const fetchGames = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`polls/${pollId}/games`);
      setGames(response.data.games);
    } catch (err) {
      console.log(err);

      toast.show({
        title: 'Could not fetch games',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuessConfirm = async (gameId: string) => {
    try {
      setIsLoading(true);
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: 'Fill scores for both teams',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      await api.post(`polls/${pollId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      setFirstTeamPoints('');
      setSecondTeamPoints('');
      setIsLoading(false);
      toast.show({
        title: 'Guess confirmed',
        placement: 'top',
        bgColor: 'green.500',
      });
      fetchGames();
    } catch (err) {
      console.log(err);

      toast.show({
        title: 'Could not confirm guess',
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  };

  useEffect(() => {
    fetchGames();
  }, [pollId]);

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      ListEmptyComponent={() => <EmptyMyPollList code={code} />}
    />
  );
};

export { Guesses };
