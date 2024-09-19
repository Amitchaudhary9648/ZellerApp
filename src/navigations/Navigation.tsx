import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from './RootStackNavigator';
import { navigationRef } from '../utils/NavigationUtils';

const Navigation = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <RootStackNavigator />
        </NavigationContainer>
    );
}

export default Navigation