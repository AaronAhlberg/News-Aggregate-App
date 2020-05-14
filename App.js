


import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Linking,ActivityIndicator,FlatList,Let} from 'react-native';
import{Card,Image} from 'react-native-elements';
import * as rssParser from 'react-native-rss-parser';
import moment from "moment";







class NewsCard extends Component{
  componentDidMount(){
  }
  render(){
    return(
    <TouchableOpacity onPress={() => Linking.openURL(this.props.uri)}>
    <Card 
    title= {this.props.title}
    >
      <Text>{this.props.date}</Text>
      </Card>
      </TouchableOpacity>
    );
  }
    
}





export default class App extends Component{
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  async componentDidMount(){

    const urls = [
    'https://www.cnbc.com/id/100003114/device/rss/rss.html',
    'https://www.cnbc.com/id/100727362/device/rss/rss.html',
    'https://www.cnbc.com/id/10001147/device/rss/rss.html',
    'https://www.cnbc.com/id/10000664/device/rss/rss.html',
    'https://www.cnbc.com/id/19854910/device/rss/rss.html',
    'https://www.cnbc.com/id/20910258/device/rss/rss.html',
    'http://feeds.marketwatch.com/marketwatch/bulletins',
    'http://feeds.reuters.com/reuters/businessNews',
    'http://feeds.reuters.com/reuters/companyNews',
    'http://feeds.reuters.com/news/wealth',
    'http://feeds.reuters.com/Reuters/worldNews',
    'http://feeds.reuters.com/reuters/technologyNews',
    'https://seekingalpha.com/market_currents.xml',
    'https://news.yahoo.com/rss/finance',
     'http://feeds.marketwatch.com/marketwatch/topstories',
     'http://feeds.marketwatch.com/marketwatch/realtimeheadlines',
     'http://feeds.reuters.com/reuters/topNews'
    ];
    var data= [];
    // use map() to perform a fetch and handle the response for each url
  return( await Promise.all(urls.map(url =>
      fetch(url)
      .then((response) => response.text())
      .then((responseData) => rssParser.parse(responseData))
      .then((rss) => {
        data=data.concat(rss.items);
        
          })
          .then((result) =>    
          this.setState({
            isLoading:false,
           dataSource:data.sort((a,b) =>{
            return new Date(b.published)-new Date(a.published)
          }), 
         
         
           
          }) 
          
          )
    ))
  );


 
     
    
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
            <NewsCard title= {item.title}
                      
                      uri={item.links[0].url}
                      date={moment(item.published).format( "h:mm:ss a MM DD YYYY")}
                      
            />
          }
          keyExtractor={({item}, index) => item.id}
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
