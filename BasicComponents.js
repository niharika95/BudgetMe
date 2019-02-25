import React from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export class AppBar extends React.Component{
    render(){
        return (
        <View style={styles.appBarStyle}>
            <Text style = { styles.appBarTextStyle }>BudgetMe</Text>
        </View>
        );
    }
  }

export class Footer extends React.Component{
    render(){
        return (
        <View style = { styles.footerBarStyle }>
        </View>
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
    appBarStyle: {
        height: responsiveHeight(12),
        backgroundColor: '#442f22',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#442f22',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 1,
        },
        appBarTextStyle:{
        fontSize: responsiveFontSize(6),
        color: '#c8a68f',
        fontFamily: 'HelveticaNeue-Thin',
        },
    footerBarStyle:{
        backgroundColor: '#442f22',
        height: responsiveHeight(3),
        shadowColor: '#442f22',
        shadowOffset: {width: 0, height: -3},
        shadowOpacity: 1,
      },
  });    