import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import CustomText from '../atomic/CustomText';
import { Colors } from '../../utils/Constants';

interface UserCardProps {
    name: string;
    role: string;
    activeUser: string;
}

const UserCard: FC<UserCardProps> = ({
    name,
    role,
    activeUser
}) => {
    return (
        <View>
            {
                activeUser.toLocaleUpperCase() == role.toLocaleUpperCase() ? (
                    <View style={styles.container}>
                        <View style={styles.namePlaceholder}>
                            <CustomText variant='h3' style={styles.placeHolderText}>{name?.slice(0, 1)}</CustomText>
                        </View>
                        <View style={styles.textContainer}>
                            <CustomText variant='h5' style={styles.nameText}>{name}</CustomText>
                            <CustomText variant='h6'>{role}</CustomText>
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
        marginBottom: 10
    },
    namePlaceholder: {
        backgroundColor: '#E8F2Fb',
        width: 60,
        height: 60,
        borderRadius: 10,
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