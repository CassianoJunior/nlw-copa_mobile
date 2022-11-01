import { StatusBar } from 'expo-status-bar';
import { Center, Text } from 'native-base';

export const SignIn = () => {
  return (
    <Center flex={1} bg="gray.900">
      <Text fontFamily="heading" fontSize={24} color="white">
        SignIn
      </Text>
      <StatusBar style="auto" />
    </Center>
  );
};
