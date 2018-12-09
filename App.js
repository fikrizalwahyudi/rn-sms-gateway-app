/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import * as  SmsAndroid from 'react-native-sms-android'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button onPress={this.someFunction} title="Send Sms">
        </Button>
      </View>
    );
  }

  

  someFunction() {
    SmsAndroid.sms(
      '+6281286159467', // phone number to send sms to
      'This is the sms text', // sms body
      'sendDirect', // sendDirect or sendIndirect
      (err, message) => {
        if (err){
          console.log(err);
        } else {
          console.log(message); // callback message
        }
      }
    );
     
    // /* List SMS messages matching the filter */
    // var filter = {
    //     box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
    //     // the next 4 filters should NOT be used together, they are OR-ed so pick one
    //     read: 0, // 0 for unread SMS, 1 for SMS already read
    //     _id: 1234, // specify the msg id
    //     address: '+97433------', // sender's phone number
    //     body: 'Hello', // content to match
    //     // the next 2 filters can be used for pagination
    //     indexFrom: 0, // start from index 0
    //     maxCount: 10, // count of SMS to return each time
    // };
     
    // SmsAndroid.list(JSON.stringify(filter), (fail) => {
    //         console.log("OH Snap: " + fail)
    //     },
    //     (count, smsList) => {
    //         console.log('Count: ', count);
    //         console.log('List: ', smsList);
    //         var arr = JSON.parse(smsList);
    //         for (var i = 0; i < arr.length; i++) {
    //             var obj = arr[i];
    //             console.log("Index: " + i);
    //             console.log("-->" + obj.date);
    //             console.log("-->" + obj.body);
    //         }
    //     });
    // SendSMS.send({
    //     body: 'The default body of the SMS!',
    //     recipients: ['0123456789', '9876543210'],
    //     successTypes: ['sent', 'queued'],
    //     allowAndroidSendWithoutReadPermission: true
    // }, (completed, cancelled, error) => {
 
    //     console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
 
    // });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
