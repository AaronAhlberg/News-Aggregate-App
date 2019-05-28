


import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Linking,ActivityIndicator,FlatList,Let} from 'react-native';
import{Card,Image} from 'react-native-elements';
import * as rssParser from 'react-native-rss-parser';



export default class App extends Component{
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }
  componentDidMount(){
    return fetch('https://www.cnbc.com/id/10000664/device/rss/rss.html')
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then((rss) => {
      this.setState({
        isLoading: false,
        dataSource: rss.items,
        
      })
    for (let i of this.state.dataSource){
      console.log(i.title);
    }
   
    });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
 
    return (
    
      <View style={styles.container}>
      <FlatList
          data= {this.state.dataSource}
          renderItem={({item}) => 
          <TouchableOpacity onPress={() => Linking.openURL(item.links[0].url)}>
                <Card 
                title= {item.title}
                image =   {{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/CNBC_logo.svg/701px-CNBC_logo.svg.png'}}
                >
                  <Text  >{item.description}</Text>
                  </Card>
                  </TouchableOpacity>
          }
          keyExtractor={({item}, index) => item}
        />

      </View>
    );
    
    
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

});
