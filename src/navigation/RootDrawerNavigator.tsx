import { createDrawerNavigator } from '@react-navigation/drawer';
import UserScreen from '../screens/UserScreen/UserScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import { NAVIGATION_TO_HOME_SCREEN, NAVIGATION_TO_USER_LIST_SCREEN } from './routes';

const Drawer = createDrawerNavigator();

const RootDrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName={NAVIGATION_TO_USER_LIST_SCREEN}>
            <Drawer.Screen
                name={NAVIGATION_TO_USER_LIST_SCREEN}
                component={UserScreen}
                options={{ drawerLabel: 'Users' }}
            />
            <Drawer.Screen
                name={NAVIGATION_TO_HOME_SCREEN}
                component={HomeScreen}
                options={{ drawerLabel: 'Home' }}
            />
        </Drawer.Navigator>
    );
}

export default RootDrawerNavigator