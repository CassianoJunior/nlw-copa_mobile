import { useNavigation } from '@react-navigation/native';
import { Pressable, Row, Text } from 'native-base';

const EmptyPollList = () => {
  const { navigate } = useNavigation();

  return (
    <Row flexWrap="wrap" justifyContent="center" px={4}>
      <Text color="white" fontSize="sm" textAlign="center">
        Você ainda não está participando de nenhum bolão, {'\n'} que tal
      </Text>

      <Pressable onPress={() => navigate('find')}>
        <Text
          textDecorationLine="underline"
          color="yellow.500"
          textDecoration="underline"
        >
          buscar um por código
        </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center" mx={1}>
        ou
      </Text>

      <Pressable onPress={() => navigate('new')}>
        <Text textDecorationLine="underline" color="yellow.500">
          criar um novo
        </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center">
        ?
      </Text>
    </Row>
  );
};

export { EmptyPollList };
