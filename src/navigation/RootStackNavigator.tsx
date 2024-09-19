import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NAVIGATION_TO_ROOT_TAB_BAR } from './routes';
import RootDrawerNavigator from './RootDrawerNavigator';

const Stack = createNativeStackNavigator();

export default function RootStackNavigator(){
    return(
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name={NAVIGATION_TO_ROOT_TAB_BAR} component={RootDrawerNavigator}/>
        </Stack.Navigator>
    )
}
