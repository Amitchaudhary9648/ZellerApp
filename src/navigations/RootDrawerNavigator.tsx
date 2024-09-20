import { createDrawerNavigator } from '@react-navigation/drawer';
import UserScreen from '../screens/UserScreen/UserScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import { NAVIGATION_TO_HOME_SCREEN, NAVIGATION_TO_USER_LIST_SCREEN } from './routes';
import Icon from 'react-native-vector-icons/MaterialIcons';  // Import the icon library

const Drawer = createDrawerNavigator();

const RootDrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName={NAVIGATION_TO_USER_LIST_SCREEN}>
            <Drawer.Screen
                name={NAVIGATION_TO_USER_LIST_SCREEN}
                component={UserScreen}
                options={{
                    drawerLabel: 'Users',
                    drawerIcon: ({ color, size }) => (
                        <Icon name="person" size={size} color={color} />  // User icon
                    ),
                }}
            />
            <Drawer.Screen
                name={NAVIGATION_TO_HOME_SCREEN}
                component={HomeScreen}
                options={{
                    drawerLabel: 'Home',
                    drawerIcon: ({ color, size }) => (
                        <Icon name="home" size={size} color={color} />  // Home icon
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}

export default RootDrawerNavigator;
