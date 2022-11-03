import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

interface ButtonProps extends IButtonProps {
  title: string;
  type?: 'primary' | 'secondary';
}

const Button = ({ title, type = 'primary', ...rest }: ButtonProps) => {
  return (
    <ButtonNativeBase
      w="full"
      maxW={376}
      h={14}
      rounded="sm"
      fontSize="md"
      textTransform="uppercase"
      bg={type === 'secondary' ? 'red.500' : 'yellow.500'}
      _pressed={{
        bg: type === 'secondary' ? 'red.600' : 'yellow.600',
      }}
      _loading={{
        _spinner: { color: 'black' },
      }}
      {...rest}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        color={type === 'secondary' ? 'white' : 'black'}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
};

export { Button };
