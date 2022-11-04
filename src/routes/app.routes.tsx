import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { New } from '../screens/New';
import { Polls } from '../screens/Polls';

const { Navigator, Screen } = createBottomTabNavigator();

const AppRoutes = () => {
  return (
    <Navigator>
      <Screen name="new" component={New} />
      <Screen name="polls" component={Polls} />
    </Navigator>
  );
};

export { AppRoutes };
