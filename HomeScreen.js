import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { AppBar, Footer } from './BasicComponents';

    export default class MainContent extends React.Component{
    render(){   
        return (
            <SafeAreaView style = {{ flex: 1 }}>
        <View style = {{flex: 1}}>
            <AppBar />
        <View style = {styles.mainContentStyle} >
            <TouchableOpacity
            style={styles.TwoButtonsStyle}
            onPress={() => this.props.navigation.navigate('SpentMoney')}
            >
            <Text style = {styles.TwoButtonsTextStyle}> I spent more money! </Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.TwoButtonsStyle}
            onPress={() => this.props.navigation.navigate('History')}
            >
            <Text style = {styles.TwoButtonsTextStyle}> History </Text>
            </TouchableOpacity>
        </View>
        <Footer />
            </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    mainContentStyle: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    TwoButtonsStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#c8a68f',
      width: responsiveWidth(60),
      height: responsiveHeight(20),
      borderRadius:10,
    },
    TwoButtonsTextStyle: {
      color: '#442f22',
      fontSize: responsiveFontSize(6),
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Savoye LET',
    },
  });    