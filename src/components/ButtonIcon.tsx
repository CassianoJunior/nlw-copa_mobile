import { useTheme } from 'native-base';
import { IconProps as IconPropsPhosphor } from 'phosphor-react-native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface IconProps extends TouchableOpacityProps {
  icon: React.FC<IconPropsPhosphor>;
}

const ButtonIcon = ({ icon: Icon, ...rest }: IconProps) => {
  const { colors, sizes } = useTheme();

  return (
    <TouchableOpacity {...rest}>
      <Icon color={colors.gray[300]} size={sizes[6]} />
    </TouchableOpacity>
  );
};

export { ButtonIcon };
