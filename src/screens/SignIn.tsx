import { Fontisto } from '@expo/vector-icons';
import { Center, Icon, Text } from 'native-base';

import Logo from '../assets/logo.svg';
import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';

export const SignIn = () => {
  const { signIn, isUserLoading } = useAuth();

  return (
    <Center flex={1} bg="gray.900">
      <Logo width={212} height={40} />
      <Button
        title="ENTRAR COM GOOGLE"
        type="secondary"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        mt={12}
        onPress={signIn}
        isLoading={isUserLoading}
        _loading={{ _spinner: { color: 'white' } }}
      />

      <Text color="white" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além{'\n'} do seu email para a criação
        de sua conta.
      </Text>
    </Center>
  );
};
