import { Center, Spinner } from 'native-base';

export const Loading = () => {
  return (
    <Center flex={1}>
      <Spinner color="yellow.500" />
    </Center>
  );
};
