import { Center, Spinner } from 'native-base';

const Loading = () => {
  return (
    <Center flex={1}>
      <Spinner color="yellow.500" />
    </Center>
  );
};

export { Loading };
