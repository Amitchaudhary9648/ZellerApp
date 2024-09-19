import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { RFValue } from 'react-native-responsive-fontsize'
import { ApiClient } from '../../api/ApiClient'
import { LIST_USERS } from '../../api/ApiQuery'
import { Colors } from '../../utils/Constants'
import CustomText from '../../components/atomic/CustomText'
import UserFilter from '../../components/molecular/UserFilter'
import UserCard from '../../components/molecular/UserCard'
import { RefreshControl } from 'react-native-gesture-handler'
import CustomButton from '../../components/atomic/CustomButton'
import { navigate } from '../../utils/NavigationUtils'
import { NAVIGATION_TO_HOME_SCREEN } from '../../navigations/routes'

const UserScreen: FC = () => {

    const [allUsers, setAllUsers] = useState<any>([])
    const [nextToken, setNextToken] = useState(null);
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [activeUser, setActiveUser] = useState('Admin')

    const onFilterClick = (label: string) => {
        setActiveUser(label)
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async (token = null) => {
        try {
            setLoading(true)
            const response = await ApiClient.query({
                query: LIST_USERS,
                variables: { limit: 10, nextToken: token },  // Adjust the limit as needed
            });

            const newCustomers = response.data.listZellerCustomers.items;
            const next = response.data.listZellerCustomers.nextToken;

            setAllUsers((prev: any) => [...prev, ...newCustomers]);  // Append new data
            setNextToken(next);
            setLoading(false)  // Set the nextToken for pagination if it exists
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const refreshUser = async (token = null) => {
        try {
            setRefreshing(true)
            setNextToken(null);
            const response = await ApiClient.query({
                query: LIST_USERS,
                variables: { limit: 10, nextToken: token },  // Adjust the limit as needed
            });

            const newCustomers = response.data.listZellerCustomers.items;
            const next = response.data.listZellerCustomers.nextToken; 
            setAllUsers(newCustomers); // Append new data
            setNextToken(next);
            setRefreshing(false)  // Set the nextToken for pagination if it exists
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const renderUser = ({ item }: any) => {
        console.log('item', item)
        return <UserCard name={item?.name} role={item?.role} activeUser={activeUser} />
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerStyling}>
                <View style={styles.imgContainer}>
                    <Image source={require('../../assets/images/Zeller-logo.png')} style={styles.imgStyles} />
                </View>
                <View style={styles.lineHorizontal} />
                <CustomText variant='h2' style={styles.headingText}>User Types</CustomText>
                <UserFilter isActive={activeUser == "Admin"} label={"Admin"} onClick={onFilterClick} />
                <UserFilter isActive={activeUser == "Manager"} label={"Manager"} onClick={onFilterClick} />
                <View style={[styles.lineHorizontal, { marginTop: 30 }]} />
                <CustomText variant='h2' style={styles.headingText}>{activeUser} Users</CustomText>
                {loading ? (
                    <ActivityIndicator size={'small'} color={Colors.primary_light} />
                ) : (
                    <FlatList
                        data={allUsers}
                        keyExtractor={(item) => item.id}
                        renderItem={renderUser}
                        style={styles.flatListStyle}  // Assigning fixed height
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={refreshUser} />
                        }
                        ListFooterComponent={nextToken && (
                            <Text style={styles.loadMoreText} onPress={() => fetchCustomers(nextToken)}>Load more</Text>
                        )}
                    />
                )}
                <View style={styles.buttonStyle}>
                <CustomButton title='Search user'  onPress={() => navigate(NAVIGATION_TO_HOME_SCREEN)}/> 
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    innerStyling: {
        marginHorizontal: 20,
        flex: 1,  // Ensures that the inner container takes up the full height
    },
    imgContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgStyles: {
        width: 100,
        height: 70
    },
    lineHorizontal: {
        width: '100%',
        height: 1,
        backgroundColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headingText: {
        marginTop: 20,
        color: Colors.secondary,
        marginBottom: 20
    },
    flatListStyle: {
        height: 300,  // Set the desired fixed height for FlatList
        marginBottom: 60,  // Adding margin to ensure there's space for the button
    },
    loadMoreText: {
        textAlign: 'center'
    },
    buttonStyle: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        width: '100%'
    },
})

export default UserScreen

