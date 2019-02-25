import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Modal, FlatList, AsyncStorage } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Icon } from 'react-native-elements';
import { AppBar, Footer } from './BasicComponents';

export default class HistoryScreen extends React.Component{
      translateMonth = {
        Jan: 'January',
        Feb: 'February',
        Mar: 'March',
        Apr: 'April',
        May: 'May',
        Jun: 'June',
        Jul: 'July',
        Aug: 'August',
        Sep: 'September',
        Oct: 'October',
        Nov: 'November',
        Dec: 'December'
      }
      
      state = {
        modalVisible: false,
        date: '',
        amount: '',
        description: '',
        totalAmount: 0,
        currentMonth: '',
        currentMonthData: [],
      }
      toggleModal(visible){
        this.setState({ modalVisible: visible});
      }

      getTotalAmount = () => {
        let totalAmount = 0
        this.state.currentMonthData.map(item => {
          if (item.amount){
            totalAmount += parseInt(item.amount)
          }
        })
        this.setState({ totalAmount: totalAmount })
      }

      displayDataInMonthList = async(month) => {
        let data = await AsyncStorage.getItem('data')
        if (data === null){
          alert('No data to display.');
        }else{
          data = JSON.parse(data)
          this.setState({ currentMonth: this.translateMonth[month] })
          this.setState({ currentMonthData: data['2019'][month] })
          this.state.currentMonthData.reverse()
          this.getTotalAmount()
          this.toggleModal(true);
        }
      }

      deleteItem = async(item) => {
        try{
          let data = await AsyncStorage.getItem('data');
          data = JSON.parse(data)
          monthData = data['2019'][item.date.substring(0,3)]
          for (i  = 0; i < monthData.length; i++){
            if (item.id === monthData[i]['id']){
              monthData.splice(i, 1)
            }
          }
          await AsyncStorage.setItem('data', JSON.stringify(data))
          this.displayDataInMonthList(item.date.substring(0,3))
        }
        catch (e){
          alert(e)
        }
      }

      render(){
        return(
          <SafeAreaView style = {{ flex: 1 }}>
            <View style = {{flex: 1}}>
                <AppBar />
          <View style={styles.MainContentHistoryStyle}>

            <Modal animationType = {'fade'} transparent = {false} visible = {this.state.modalVisible}>
              <View style={{flex:1}}>
                <SafeAreaView>
                  <View style = {styles.ModalHeaderStyle}>
                    <View style = {{flex: 5, flexDirection: 'row', paddingLeft: 20}}>
                      <Text style = {styles.ModalHeaderTextStyle}>{this.state.currentMonth}</Text>
                      <Text style = {{ fontSize: responsiveFontSize(3), fontWeight: '300', color: '#c8a68f' }}>{'     $' + this.state.totalAmount}</Text>
                    </View>
                    <View style = {{flex: 1}}>
                      <Icon
                        name = 'circle-with-cross'
                        type = 'entypo'
                        color = '#c8a68f'
                        onPress = {() => {this.toggleModal(!this.state.modalVisible)}}
                      />
                    </View>
                  </View>
    
                  <View style={{paddingBottom: 150, alignItems: 'center'}}>
                      <SwipeListView
                        useFlatList
                        ListEmptyComponent = {
                          <Text style = {{ paddingTop: 30, fontSize: 20 }}>There is no data to display.</Text>
                         }
                        data = {this.state.currentMonthData}
                        keyExtractor = {(item, index) => index.toString()}

                        renderItem={({item}) =>
                        <View style = {[styles.FlatListTextViewStyle, styles.rowFront]}>
                          <Text style = {styles.FlatListTextStyle}>{item.date}</Text>
                          <Text style = {styles.FlatListTextStyle}>{'$' + item.amount}</Text>
                          <Text style = {styles.FlatListTextStyle}>{item.description}</Text>
                        </View>
                        }
                        
                        renderHiddenItem={({item}) => (
                          <View style = {styles.rowBack}>
                              {/* <Icon
                                name='edit'
                                type='MaterialIcons'
                                color='#442f22'
                                size = {25}
                                onPress = {() => this.props.navigation.navigate('Home')}
                              /> */}
                              <Text></Text>
                              <Icon
                                name='delete'
                                type='AntDesign'
                                color='#442f22'
                                size = {25}
                                onPress = {() => this.deleteItem(item)}
                              />
                          </View>
                        )}
                        // leftOpenValue = {50}
                        rightOpenValue = {-50}
                      />           

                      
                    {/* </View> */}
                  </View>
                </SafeAreaView>
              </View>
            </Modal>
                
            <View style = {styles.TouchableOpacityViewStyle}>
              <TouchableOpacity style = {styles.TouchableOpacityButtonStyle} onPress = {() => {this.displayDataInMonthList('Jan')}}>
                <Text style = {styles.TouchableOpacityTextStyle}>Jan</Text>
              </TouchableOpacity>
    
              <TouchableOpacity style = {styles.TouchableOpacityButtonStyle} onPress = {() => {this.displayDataInMonthList('Feb')}}>
                <Text style = {styles.TouchableOpacityTextStyle}>Feb</Text>
              </TouchableOpacity>
            </View>
    
            <View style = {styles.TouchableOpacityViewStyle}>
              <TouchableOpacity style = {styles.TouchableOpacityButtonStyle} onPress = {() => {this.displayDataInMonthList('Mar')}}>
                <Text style = {styles.TouchableOpacityTextStyle}>Mar</Text>
              </TouchableOpacity>
    
              <TouchableOpacity style = {styles.TouchableOpacityButtonStyle} onPress = {() => {this.displayDataInMonthList('Apr')}}>
                <Text style = {styles.TouchableOpacityTextStyle}>Apr</Text>
              </TouchableOpacity>
            </View>
    
            <View style = {styles.TouchableOpacityViewStyle}>
              <TouchableOpacity style = {styles.TouchableOpacityButtonStyle} onPress = {() => {this.displayDataInMonthList('May')}}>
                <Text style = {styles.TouchableOpacityTextStyle}>May</Text>
              </TouchableOpacity>
    
              <TouchableOpacity style = {styles.TouchableOpacityButtonStyle} onPress = {() => {this.displayDataInMonthList('Jun')}}>
                <Text style = {styles.TouchableOpacityTextStyle}>Jun</Text>
              </TouchableOpacity>
            </View>
    
            <View style = {styles.TouchableOpacityViewStyle}>
              <TouchableOpacity style = {styles.TouchableOpacityButtonStyle} onPress = {() => {this.displayDataInMonthList('Jul')}}>
                <Text style = {styles.TouchableOpacityTextStyle}>Jul</Text>
              </TouchableOpacity>
    
              <TouchableOpacity style = {styles.TouchableOpacityButtonStyle} onPress = {() => {this.displayDataInMonthList('Aug')}}>
                <Text style = {styles.TouchableOpacityTextStyle}>Aug</Text>
              </TouchableOpacity>
            </View>
    
            <View style = {styles.TouchableOpacityViewStyle}>
              <TouchableOpacity style = {styles.TouchableOpacityButtonStyle} onPress = {() => {this.displayDataInMonthList('Sep')}}>
                <Text style = {styles.TouchableOpacityTextStyle}>Sep</Text>
              </TouchableOpacity>
    
              <TouchableOpacity style = {styles.TouchableOpacityButtonStyle} onPress = {() => {this.displayDataInMonthList('Oct')}}>
                <Text style = {styles.TouchableOpacityTextStyle}>Oct</Text>
              </TouchableOpacity>
            </View>
    
            <View style = {styles.TouchableOpacityViewStyle}>
              <TouchableOpacity style = {styles.TouchableOpacityButtonStyle} onPress = {() => {this.displayDataInMonthList('Nov')}}>
                <Text style = {styles.TouchableOpacityTextStyle}>Nov</Text>
              </TouchableOpacity>
    
              <TouchableOpacity style = {styles.TouchableOpacityButtonStyle} onPress = {() => {this.displayDataInMonthList('Dec')}}>
                <Text style = {styles.TouchableOpacityTextStyle}>Dec</Text>
              </TouchableOpacity>
            </View>

            <View style = {{ marginBottom: 7 }}>
              <Icon
                name = 'circle-with-cross'
                type = 'entypo'
                color = '#442f22'
                size = {30}
                onPress = {() => this.props.navigation.navigate('Home')}
              />
            </View>
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
      backgroundColor: '#fff',
    },
    MainContentHistoryStyle:{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    },
    TouchableOpacityViewStyle:{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    TouchableOpacityButtonStyle:{
      backgroundColor: '#c8a68f',
      width: responsiveWidth(35),
      height: responsiveHeight(6),
      borderRadius: 10,
      justifyContent: 'center',
    },
    TouchableOpacityTextStyle:{
      alignItems: 'center',
      textAlign: 'center',
      marginTop: 3,
      color: '#442f22',
      fontSize: responsiveFontSize(3),
    },
    ModalHeaderStyle:{
      backgroundColor: '#442f22',
      height: responsiveHeight(10),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    ModalHeaderTextStyle:{
      color: '#c8a68f',
      fontSize: responsiveFontSize(3),
      fontWeight: '700',
    },
    FlatListTextViewStyle:{
      borderBottomColor: '#e4e4e4',
      borderBottomWidth: 0.5,
      height: responsiveHeight(7),
      width: responsiveWidth(90),
      marginTop: 10,
      flexDirection: 'row',
    },
    FlatListTextStyle:{
      textAlign: 'center',
      fontSize: responsiveFontSize(2.3),
      flex: 1,
    },
    rowFront: {
      backgroundColor: 'white',
    },
    rowBack: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
});