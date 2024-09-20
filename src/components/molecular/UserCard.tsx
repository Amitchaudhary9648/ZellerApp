import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import CustomText from '../atomic/CustomText';
import { Colors } from '../../utils/Constants';

interface UserCardProps {
    name: string;
    role: string;
    activeUser: string;
    userNameFilter: string;
}

const UserCard: FC<UserCardProps> = ({
    name,
    role,
    activeUser,
    userNameFilter
}) => {
    const matchesFilter = name?.toLowerCase().includes(userNameFilter.toLowerCase());
    return (
        <View>
            {
                activeUser.toLocaleUpperCase() == role.toLocaleUpperCase() && matchesFilter ? (
                    <View style={styles.container}>
                        <View style={styles.namePlaceholder}>
                            <CustomText variant='h5' style={styles.placeHolderText}>{name?.slice(0, 1)}</CustomText>
                        </View>
                        <View style={styles.textContainer}>
                            <CustomText variant='h5' style={styles.nameText}>{name}</CustomText>
                            <CustomText variant='h6'>{role?.slice(0,1)}{role?.slice(1,).toLowerCase()}</CustomText>
                        </View>
                    </View>
                ) : (null)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 25,
        alignItems: 'center',
    },
    namePlaceholder: {
        backgroundColor: '#E8F2Fb',
        width: 45,
        height: 45,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    placeHolderText: {
        color: Colors.primary
    },
    textContainer: {
        justifyContent: 'center',
        marginLeft: 20
    },
    nameText: {
        marginBottom: 5
    }
})

export default UserCard