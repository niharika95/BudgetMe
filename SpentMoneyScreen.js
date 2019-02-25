import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, View, TextInput, AsyncStorage } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { AppBar, Footer } from './BasicComponents';
import uuid from 'react-native-uuid';

export default class SpentMoneyScreen extends React.Component{
  
    constructor(props){
        super(props)
        this.state = {
            date: moment(new Date()).format('MMM DD, YYYY'),
            amount: '',
            description: '',
            totalAmount: 0,
        }
    }

    saveDataToAsyncStorage = async() => {
      let {date, amount, description, totalAmount} = this.state
      let _id = uuid.v1();
      let year = date.substring(8,12)
      let month = date.substring(0,3)
      let data  = await AsyncStorage.getItem('data')
      if (data !== null){
        data = JSON.parse(data)
        // Add new data to existing data
        if (year in data){
  
        }
        else{
          data[year] = {
            Jan: [],
            Feb: [],
            Mar: [],
            Apr: [],
            May: [],
            Jun: [],
            Jul: [],
            Aug: [],
            Sep: [],
            Oct: [],
            Nov: [],
            Dec: [],              
          }
        }
      }else{
        // Create the data (first time the user has added data to app)
        data = {}
        data[year] = {
          Jan: [],
          Feb: [],
          Mar: [],
          Apr: [],
          May: [],
          Jun: [],
          Jul: [],
          Aug: [],
          Sep: [],
          Oct: [],
          Nov: [],
          Dec: [],
        }
      }
      data[year][month].push({
        id: _id,
        date: date,
        amount: amount,
        description: description,
        totalAmount: totalAmount + parseInt(amount),
      })
      await AsyncStorage.setItem('data', JSON.stringify(data))
      this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <SafeAreaView style = {{ flex: 1 }}>
            <View style = {{flex: 1}}>
                <AppBar />
            <View style={ styles.MainContentSpentMoneyStyle }>
            <ScrollView contentContainerStyle = {{ flex : 1, justifyContent: 'space-around' }}>
            <KeyboardAvoidingView style = {{flex : 1}} behavior = {'padding'} keyboardVerticalOffset = {5}>
                <View style = {{flex: 4, justifyContent: 'space-evenly', alignItems: 'center', marginTop: 50}}>
                    <DatePicker
                    style={{width: responsiveWidth(70)}}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="MMM DD, YYYY"
                    minDate="2000-01-01"
                    maxDate="2099-12-31"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(text) => {this.setState({date: text})}}
                    />
                    <View>
                        <TextInput placeholder = "Amount" keyboardType = "numeric" style = {styles.TextInputStyle} multiline = {true} numberOfLines = {3} onChangeText = {(text) => this.setState({amount: text})} />
                    </View>
                    <View>
                        <TextInput placeholder = "Description" style = {styles.TextInputStyle} multiline = {true} numberOfLines = {3} onChangeText = {(text) => this.setState({description: text})}/>
                    </View>
                </View>
        
                <View style = {{ flex:1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <View style = {{ flex: 1 }}>
                        <Icon
                        name = 'check-circle'
                        type = 'MaterialIcons'
                        color = '#90C048'
                        size = {60}
                        onPress = {this.saveDataToAsyncStorage}
                        />
                    </View>
                    <View style = {{ flex: 1 }}>
                        <Icon
                        name = 'cancel'
                        type = 'MaterialIcons'
                        color = '#ff6961'
                        size = {60}
                        onPress = {() => this.props.navigation.navigate('Home')}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
            </ScrollView>
            </View>
            <Footer />
            </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f1f1f1',
      flexDirection: 'column',
    },
    MainContentSpentMoneyStyle:{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    },
    TextInputStyle:{
      borderColor: 'black',
      borderWidth: 0.5,
      textAlign: 'center',
      fontSize: responsiveFontSize(2.5),
      width: responsiveWidth(70),
      height: responsiveHeight(10),
    },
});