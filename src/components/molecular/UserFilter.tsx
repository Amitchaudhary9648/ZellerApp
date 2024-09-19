import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/Fontisto'
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '../atomic/CustomText';
import { Colors } from '../../utils/Constants';

interface UserFilterProps {
    isActive: boolean;
    label: string;
    onClick: (label: string) => void;
}

const UserFilter: FC<UserFilterProps> = ({
    isActive,
    label,
    onClick
}) => {
    return (
        <TouchableOpacity onPress={() => {onClick(label)}} activeOpacity={0.5} style={[styles.container, {backgroundColor: isActive ? '#E8F2Fb' : 'white'}]}>
            <Icon 
                name={isActive ? 'radio-btn-active' : 'radio-btn-passive'}
                size={RFValue(20)}
                color={isActive ? Colors.primary : Colors.border}/>
            <CustomText variant='h6' style={styles.labelStyle}>{label}</CustomText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        paddingVertical: 20,
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 10
    },
    labelStyle:{
        marginLeft: 15,
        color: Colors.secondary
    }
})

export default UserFilter