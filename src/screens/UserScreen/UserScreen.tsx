import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { ApiClient } from '../../api/ApiClient';
import { LIST_USERS } from '../../api/ApiQuery';
import { Colors } from '../../utils/Constants';
import CustomText from '../../components/atomic/CustomText';
import UserFilter from '../../components/molecular/UserFilter';
import UserCard from '../../components/molecular/UserCard';
import { RefreshControl } from 'react-native-gesture-handler';
import CustomButton from '../../components/atomic/CustomButton';
import { navigate } from '../../utils/NavigationUtils';
import { NAVIGATION_TO_HOME_SCREEN } from '../../navigations/routes';
import CustomInput from '../../components/atomic/CustomInput';

const UserScreen: FC = () => {

    const [allUsers, setAllUsers] = useState<any>([])
    const [nextToken, setNextToken] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [activeUser, setActiveUser] = useState<string>('Admin')
    const [userName, setUserName] = useState<string>("")

    const onFilterClick = (label: string) => {
        setActiveUser(label)
    };

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
            setNextToken(0);
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
        return <UserCard name={item?.name} role={item?.role} activeUser={activeUser} userNameFilter={userName} />
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding" style={styles.innerStyling}>
                <ScrollView 
                    nestedScrollEnabled={true}
                    style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View >
                        <View style={styles.imgContainer}>
                            <Image source={require('../../assets/images/Zeller-logo.png')} style={styles.imgStyles} />
                        </View>
                        <View style={styles.lineHorizontal} />
                        <CustomText variant='h2' style={styles.headingText}>User Types</CustomText>
                        <UserFilter isActive={activeUser == "Admin"} label={"Admin"} onClick={onFilterClick} />
                        <UserFilter isActive={activeUser == "Manager"} label={"Manager"} onClick={onFilterClick} />
                        <View style={[styles.lineHorizontal, { marginTop: 30 }]} />
                        <CustomText variant='h2' style={styles.headingText}>{activeUser} Users</CustomText>
                        <View style={styles.searchContainer}>

                            <CustomInput
                                onChangeText={(text) => { setUserName(text) }}
                                onClear={() => setUserName('')}
                                value={userName}
                                left={<Icon name={'search'} size={RFValue(20)} style={{ marginLeft: 10 }} />}
                                placeholder='Search user'
                                inputMode='text'
                            />
                        </View>
                        {loading ? (
                            <ActivityIndicator size={'small'} color={Colors.primary_light} />
                        ) : (
                            <FlatList
                                data={allUsers}
                                keyExtractor={(item) => item.id}
                                renderItem={renderUser}
                                nestedScrollEnabled={true}
                                style={styles.flatListStyle}  // Assigning fixed height
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={refreshUser} />
                                }
                                ListFooterComponent={nextToken && (
                                    <Text style={styles.loadMoreText} onPress={() => fetchCustomers(nextToken)}>Load more</Text>
                                )}
                            />
                        )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <View style={styles.buttonStyle}>
                <CustomButton title='Go to home' onPress={() => navigate(NAVIGATION_TO_HOME_SCREEN)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    innerStyling: {
        marginHorizontal: 20,
        flex: 1,  // Ensures that the inner container takes up the full height
    },
    scrollView: {
        flex: 1,// Allow scrolling
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
        height: 300,
        marginBottom: 60,
    },
    loadMoreText: {
        textAlign: 'center'
    },
    buttonStyle: {
        position: 'absolute',
        bottom: Platform.OS == 'android' ? 0 : 5,
        width: '92%',
        left: 15,
        right: 15
    },
    searchContainer: {
        marginBottom: 10
    }
});

export default UserScreen;