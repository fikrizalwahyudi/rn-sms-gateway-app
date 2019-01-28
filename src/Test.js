/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View
} from "react-native";

import * as  SmsAndroid from 'react-native-sms-android'
import axios from 'axios';

import BackgroundJob from "react-native-background-job";

import  Sms from './Sms';

const regularJobKey = "regularJobKey";
const exactJobKey = "exactJobKey";
const foregroundJobKey = "foregroundJobKey";
const testTing = "sikontol"
/**
 * In Android SDK versions greater than 23, Doze is being used by apps by default,
 * in order to optimize battery by temporarily turning off background tasks when
 * the phone is left undisturbed for some hours.
 *
 * But, some apps may require background tasks to keep running, ignoring doze and
 * not optimizing battery (this means battery needs to be traded off for performance
 * as per required).
 *
 * Such jobs can be scheduled as everRunningJob is scheduled below.
 * It may be scheduled as normal jobs are, but they wont behave as expected. Doze
 * feature will disable the running background jobs if the phone remains undisturbed
 * for some time.
 *
 * So everRunningJob scheduled below can be scheduled by checking if is ignoring
 * optimizations.If true, schedule the job in the callback, else we notify the
 * user to manually remove the app from the battery optimization list.
 */
const everRunningJobKey = "everRunningJobKey";
const state = {sms:[]};
var obj = {};
const objConst = {};
const listSms = [];
// const 
// This has to run outside of the component definition since the component is never
// instantiated when running in headless mode
BackgroundJob.register({
  jobKey: regularJobKey,
  job: () => {
        setInterval(e=>{
            console.log("regular job test");
        },1000) 
    }
});
BackgroundJob.register({
  jobKey: exactJobKey,
  job: () => {
    console.log(`${new Date()}Exact Job fired!. Key = ${exactJobKey}`);
  }
});
BackgroundJob.register({
  jobKey: foregroundJobKey,
  job: () => {
    // setInterval(e=>{
    //     console.log("Foreground job test");
    // },1000) 
  }
});
BackgroundJob.register({
  jobKey: everRunningJobKey,
  job: () => { 
    testFunction();
    }
});

const testFunction = async () => {
    // console.log("test");
    await axios.get(`https://api.jalaindo.com/smscenter/androidtosent?modem_id=MA111111111&limit=1`)
      .then(async (res) => {
        //   console.log(res.data);
          var response = res;
          obj.sms = response.data.sms_to_sent;
          obj.sms.map(e=>{
              
              listSms.push(e.message);
              e.message = e.message + ' a askdjalksj dsadklsa jaslkdjsa dklsajdkl sajdslkj salkdjas lkdjasdklsaj dlkasjd lasjdlksj salkjd salkjaslk jsakldjas lkdsajdlks ajlskajdsalk djaslk djsalk jakldjsa asasdasds asdas dsdas dasda dadsa dadsa das sadsad sadsa da as asdsa sadasd sadsadasdsadsadsadasdasdsad'
              console.log(e.message.toString().substring(0,10));
              console.log(e.message.length);
              if(e.message.length > 160 && e.message.length < 320){
                SmsAndroid.sms(
                    '081554579425', // phone number to send sms to
                    e.message.toString().substring(0,160), // sms body
                    'sendDirect', // sendDirect or sendIndirect
                    (err, message) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log(message); // callback message
                      }
                    }
                  );
                
                SmsAndroid.sms(
                    '081554579425', // phone number to send sms to
                    e.message.toString().substring(160,320), // sms body
                    'sendDirect', // sendDirect or sendIndirect
                    (err, message) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log(message); // callback message
                      }
                    }
                );
              }else if(e.message.length > 320 && e.message.length < 480){
                SmsAndroid.sms(
                    '081554579425', // phone number to send sms to
                    e.message.toString().substring(0,160), // sms body
                    'sendDirect', // sendDirect or sendIndirect
                    (err, message) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log(message); // callback message
                      }
                    }
                  );
                
                SmsAndroid.sms(
                    '081554579425', // phone number to send sms to
                    e.message.toString().substring(160,320), // sms body
                    'sendDirect', // sendDirect or sendIndirect
                    (err, message) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log(message); // callback message
                      }
                    }
                );

                SmsAndroid.sms(
                    '081554579425', // phone number to send sms to
                    e.message.toString().substring(320,480), // sms body
                    'sendDirect', // sendDirect or sendIndirect
                    (err, message) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log(message); // callback message
                      }
                    }
                );
              }else {
                  SmsAndroid.sms(
                    '081554579425', // phone number to send sms to
                    e.message.toString().substring(0,160), // sms body
                    'sendDirect', // sendDirect or sendIndirect
                    (err, message) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log(message); // callback message
                      }
                    }
                  );
              }
            

          })
        //   console.log(obj.sms);
        //   await smsBody = obj.sms[0].message;
        //   console.log(obj.sms[0].message.toString())
        //   SmsAndroid.sms(
        //     '081554579425', // phone number to send sms to
        //     smsBody.toString(), // sms body
        //     'sendDirect', // sendDirect or sendIndirect
        //     (err, message) => {
        //       if (err) {
        //         console.log(err);
        //       } else {
        //         console.log(message); // callback message
        //       }
        //     }
        //   );
          
        //   obj.sms = res.data.sms.to_sent;
        //   console.log(obj.sms);
        // const sms = res.data.sms_to_sent;
        // this.setState({ sms });
        // // console.log(sms)
    }).catch(e=>{
        console.log(e);
    })
    
}

export default class test extends Component {
  constructor(props) {
    super(props);
    this.state = { jobs: [] };
  }

  sendSms() {
      console.log("send SMS");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Testing BackgroundJob</Text>
        <Text style={styles.instructions}>
          Try connecting the device to the developer console, schedule an event
          and then quit the app.
        </Text>
        
        <Text>
          Scheduled jobs: {testTing}
          {this.state.jobs.map(({ jobKey }) => jobKey)}
        </Text>
        {/* <TouchableHighlight
          style={styles.button}
          onPress={() => {
            BackgroundJob.schedule({
              jobKey: regularJobKey,
              notificationTitle: "Notification title",
              notificationText: "Notification text",
              period: 1000
            });
          }}
        >
          <Text>Schedule regular job</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            BackgroundJob.schedule({
              jobKey: exactJobKey,
              period: 10,
              exact: true
            });
          }}
        >
          <Text>Schedule exact job</Text>
        </TouchableHighlight> */}
        {/* <TouchableHighlight
          style={styles.button}
          onPress={() => {
            BackgroundJob.schedule({
              jobKey: foregroundJobKey,
              period: 1000,
              exact: true,
              allowExecutionInForeground: true,
              allowWhileIdle: true
            });
          }}
        >
          <Text>Schedule exact foreground job</Text>
        </TouchableHighlight> */}
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            BackgroundJob.isAppIgnoringBatteryOptimization(
              (error, ignoringOptimization) => {
                if (ignoringOptimization === true) {
                  BackgroundJob.schedule({
                    jobKey: everRunningJobKey,
                    notificationTitle: "Notification title",
                    notificationText: "Notification text",
                    exact:true,
                    period: 10000,
                    allowWhileIdle: true,
                    allowExecutionInForeground: true,
                  });
                } else {
                  console.log(
                    "To ensure app functions properly,please manually remove app from battery optimization menu."
                  );
                  //Dispay a toast or alert to user indicating that the app needs to be removed from battery optimization list, for the job to get fired regularly
                }
              }
            );
          }}
        >
          <Text>Schedule ever running job</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            BackgroundJob.cancel({ jobKey: regularJobKey });
          }}
        >
          <Text>Cancel regular job</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            BackgroundJob.cancelAll();
          }}
        >
          <Text>CancelAll</Text>
        </TouchableHighlight>
      </View>
    );
  }
  componentDidMount() {
    // BackgroundJob.schedule({
    //   jobKey: exactJobKey,
    //   period: 1000,
    //   timeout: 10000,
    //   exact: true
    // });
  }
}

const styles = StyleSheet.create({
  button: { padding: 20, backgroundColor: "#ccc", marginBottom: 10 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: { fontSize: 20, textAlign: "center", margin: 10 },
  instructions: { textAlign: "center", color: "#333333", marginBottom: 5 }
});