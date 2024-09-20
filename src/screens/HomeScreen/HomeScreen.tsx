import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../../utils/Constants'
import CustomText from '../../components/atomic/CustomText'
import CustomButton from '../../components/atomic/CustomButton'
import { RFValue } from 'react-native-responsive-fontsize'

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.innerStyling}>
                <View style={styles.imgContainer}>
                    <Image source={require('../../assets/images/Zeller-logo.png')} style={styles.imgStyles} />
                </View>
                <CustomText
                    variant='h4'
                    fontFamily={Fonts.Bold}>
                    Zeller is one solution for all of your business finances. From EFTPOS payments to online invoicing, accounts and cards, it's everything you expect from a business bank, but better.
                </CustomText>
                <CustomText
                    variant='h4'
                    fontFamily={Fonts.Bold}
                    style={{marginTop: 10}}>
                    We believe in a level playing field where all businesses benefit from access to smarter payments technology and integrated financial services that enables them to accelerate their cash flow. So we’re hard at work building the tools to make it happen.
                </CustomText>
                <CustomText 
                    variant='h4'
                    fontFamily={Fonts.Bold}
                    style={styles.learnMoreText}>
                    Learn more, and sign up for your free Zeller Account, at https://www.myzeller.com/
                </CustomText>
                <CustomButton onPress={() => {}} title={"Track Your EFTPOS"}></CustomButton>
            </View>
            <View style={styles.bottomContainer}>
                <CustomText
                    variant='h1'
                    fontFamily={Fonts.SemiBold}
                    fontSize={RFValue(25)}
                    style={styles.bottomText}
                    >Replace your traditional business bank with Zeller</CustomText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
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
    bottomContainer:{
        backgroundColor: '#E6E9EA',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '30%',
        padding: 40
    },
    bottomText:{
        color: Colors.secondary
    },
    learnMoreText:{
        marginTop: 10,
        marginBottom: 20
    }
})

export default HomeScreen