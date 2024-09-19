import { View, Text } from 'react-native'
import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { RFValue } from 'react-native-responsive-fontsize'

const UserScreen: FC = () => {
    return (
        <View>
            <Text>UserScreen</Text>
            <Icon  name={'arrow-right'} color={'#000'} size={RFValue(25)}/>
        </View>
    )
}

export default UserScreen