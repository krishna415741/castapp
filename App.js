/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  TextInput
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import CastView from './CastView';
import CastButton from './CastButton';
import { NativeEventEmitter, NativeModules } from 'react-native';
let devices;
const { CustomMediaRouter,RNGCDiscoveryManager, RNGCCastContext, AmazonFling, RNGCSessionManager } = NativeModules;
/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const[devicesList,setDevicesList]= React.useState([]);
  const[fireTvList,setFireTvList]= React.useState("");
  const[text,setText]= React.useState("");

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };

  useEffect(()=>{
  },[]);

  const triggerAmazonFling = async () => {
    const eventEmitter = new NativeEventEmitter(AmazonFling);
    console.log("============================> ",eventEmitter);
    // AmazonFling.startSearch('device_list');
    const t = eventEmitter.addListener('device_list', (event) => {
      // console.log("SEARCH : ",event);
      // alert(JSON.stringify(event));
      const devicesList = event?.devices;
      devices = JSON.parse(devicesList);
      if(devicesList != undefined && devicesList){
        // devices = JSON.stringify(devicesList);
  
        setFireTvList(devices);
        // AmazonFling.stopSearch();
        // eventEmitter.removeAllListeners();
      }
      
      // alert(JSON.stringify(event));
   });
   if(devices != undefined){
    t.remove();
   }
  }

  const connectFling =(uuid, name) => {
    try {
      console.log("UUID : ",uuid);
      console.log("text : ",text);
      
       AmazonFling.fling(uuid,text,'Big Buck Bunny');
      // alert(JSON.stringify(e));
        
    } catch(e) {
      console.log(e);
      alert(JSON.stringify(e));
    }
    
  }

  const callMethod = async () => {
    triggerAmazonFling();

      // console.log("CAST BUTTON : ",NativeModules); 
      // // triggerAmazonFling();
      // const s = await RNGCDiscoveryManager?.getDevices();

      // // const u = await AmazonFling?.getDevicesName();
      // // RNGCCastContext.showCastDialog();

      //     console.log("C : ",s);
      //     var deviceNames =[];
      //     s.map((a)=> {
      //       deviceNames.push(a?.friendlyName);
      //     });
      //     setDevicesList(deviceNames);
    
  }

  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />

    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
    //           <RNGoogleCastButton tint={"white"} />

    //     <CastView style={{height : 50, width: 50,backgroundColor :'green'}} />
       
    //     {/* <Header /> */}
    //     {/* <View style={{backgroundColor:'black',width:200,height:200}}> */}
    //     {/* </View> */}
        
    //   </ScrollView>
    // </SafeAreaView>
<View style={{marginTop:40}}>
<TextInput style={{ width : '100%',borderColor : 'black', borderWidth:1}} onChangeText={(t) => {
      setText(t);
    }}/>
  <Text>{text}</Text>
<TouchableOpacity onPress={() => {
          callMethod();
          
        }} style={{width:100, height:100,}}>
          <Text>HELLO WORLD</Text>
        </TouchableOpacity>
        <Text>{JSON.stringify(devicesList)}</Text>
        {/* <Text>No of Devices  : {JSON.stringify(devicesList.length)}</Text> */}
        <Text>No of Fire TV Devices  : {JSON.stringify(fireTvList)} {typeof(fireTvList)} </Text>
        {/* <Text>Object Keys : {JSON.stringify(Object.keys(fireTvList))} {fireTvList ? fireTvList[0]?.uuid : ""}</Text> */}
        
        {fireTvList && fireTvList.map((v,i)=> {
        return (<TouchableOpacity onPress={()=> {
                      connectFling(v.uuid,v.name);

          // AmazonFling.fling("", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "Bucks Bunny");
        }} style={{backgroundColor:'green'}}>
          <Text style={{textAlign:'center',padding:10, color:'white'}}>{JSON.stringify(v.name)}</Text>
        </TouchableOpacity>);})}
        {/* {fireTvList != "" && fireTvList?.map((val,ind)=>{
          return (
            <TouchableOpacity onPress={()=> {
              
            connectFling(val.uuid,val.name);
            }} style={{backgroundColor:'green'}}>
              <Text style={{textAlign:'center',padding:10, color:'white'}}>{val?.name}</Text>
            </TouchableOpacity>
          );
        })} */}
        {/* {devices.map((v) => {
        return (
        
        )})} */}
    {/* <CastButton tint={"white"} /> */}
    
</View>
    );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
