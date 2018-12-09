import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Separator
} from "native-base";
import ToggleSwitch from 'toggle-switch-react-native'
import {
  StyleSheet,
  View,
  FlatList
} from 'react-native';
import * as  SmsAndroid from 'react-native-sms-android'
import axios from 'axios';

class Sms extends Component {

  constructor(props){
    super(props);
    this.state = {
      // func : this.someFunction(),
      isOnDefaultToggleSwitch: true,
      isOnLargeToggleSwitch: false,
      isOnBlueToggleSwitch: false,
      sms: [],
    };
  
  }

  componentDidMount() {
    axios.get(`https://api.jalaindo.com/smscenter/androidtosent?modem_id=MA111111111&limit=5`)
      .then(res => {
        const sms = res.data.sms_to_sent;
        this.setState({ sms });
        // console.log(sms)
      })
  }

  
  someFunction() {
   
    
    for(var i = 0; i <  this.state.sms.length; ){
      console.log(this.state.sms[i]);
      i++
      // SmsAndroid.sms(
      //   this.state.sms.map.msisdn_receiver.String(), // phone number to send sms to
      //   this.state.sms.map.message.String(), // sms body
      //   'sendDirect', // sendDirect or sendIndirect
      //   (err, message) => {
      //     if (err) {
      //       console.log(err);
      //       i++
      //     } else {
      //       i++
      //       console.log(message); // callback message
      //     }
      //   }
      // );
    }
    SmsAndroid.sms(
      
      this.state.sms.msisdn_receiver, // phone number to send sms to
      'cek cek ', // sms body
      'sendDirect', // sendDirect or sendIndirect
      (err, message) => {
        if (err) {
          console.log(err);
          i++
        } else {
          i++
          console.log(message); // callback message
        }
      }
    );
  }

  
  onToggle(isOn) {
    if (isOn) {
      this.someFunction();
    }
    alert(isOn)
  }


  render() {
    return (
      <Container >
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>SMS Gateway</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Text>
            Pilih Status SMS
        </Text>
          <ToggleSwitch
            label="On-Off"
            onColor="#2196F3"
            isOn={this.state.isOnBlueToggleSwitch}
            onToggle={isOnBlueToggleSwitch => {
              this.setState({ isOnBlueToggleSwitch });
              this.onToggle(isOnBlueToggleSwitch);
            }}
          />
          <Separator bordered style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 18, fontFamily: 'sans-serif-medium' }}>List Status Sms</Text>
          </Separator>


          {this.state.sms.map(e =>
            <View style={styles.flatview}>

              <Text style={styles.name}>{e.queue_id}</Text>
              <Text style={styles.email}>{e.message}</Text>
              {/* <Text style={styles.email}>{e.result}</Text> */}

            </View>
          )}

        </Content>
      </Container>
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
  button: {
    padding: 10,
    borderWidth: .5,
    borderColor: '#bbb',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
  },
  name: {
    fontFamily: 'Verdana',
    fontSize: 18
  },
  email: {
    color: 'red'
  }
});

export default Sms;