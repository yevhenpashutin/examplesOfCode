import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import i18n from "../i18n";
import styles from '../styles/Home';
import {getContent} from "../helpers/api";

const Home = (props) => {
  const [libraries, setLibraries] = useState(null); 
  const photoParams = {
    width: 1700,
    height: 1700,
    avoidEmptySpaceAroundImage: true,
    cropperCircleOverlay: true,
    cropping: true,
    mediaType: 'photo'
  };
  useEffect(() => {
     const baseUrl = (props.route.params && props.route.params.baseUrl) ? props.route.params.baseUrl : 'https://mobile-dev.coffeeripples.com/';
     const id = (props.route.params && props.route.params.id) ? props.route.params.id : '5e6e403c3f939e130c70722b';


    async function getLibrariesFromBackend() {
      //const result = await getLibraries(baseUrl, '5e0c9c528bbd7f309262fa75');
      //console.log('ressssr libr ', result);
      let channels = await getContent(baseUrl, id);
      console.log('ressssr test ', channels);
      let filteredResult = channels.filter((el) => {
            return el.name !== "frames";
      });
      console.log('ressssr filteredResult ', filteredResult);
     // const result = filteredResult.ripples;
      setLibraries(filteredResult);
    }
    getLibrariesFromBackend();
  }, []);
 

  const openCamera = () => ImagePicker.openCamera(photoParams).then(image => {
    props.navigation.push('EditImage', {image, baseUrl: props.route.params.baseUrl, 
      id: props.route.params.id})
  });
  const openGallery = () => ImagePicker.openPicker(photoParams).then(image => {
    props.navigation.push('EditImage', {image, baseUrl: props.route.params.baseUrl, 
      id: props.route.params.id})
  });
  const openLibrary = () => props.navigation.navigate('Library', {libraries});

  const buttons = [
    {label: 'Photo', icon: require("../assets/images/camera_icon.png"), onPress: () => openCamera()},
    {label: 'Gallery', icon: require("../assets/images/library_icon.png"), onPress: () => openGallery()},
    //{label: 'Edit', icon: require("../assets/images/edit_icon.png"), onPress: () => console.log('onPress')},
    {label: 'Library', icon: require("../assets/images/library_icon.png"), onPress: () => openLibrary()}
  ]

  return (
    <View style={styles.container}>   
      <Image
        source={require("../assets/images/home_header.jpg")}
        style={styles.homeHeader}
      />
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logoImage}
      />
      <Image
        style= {styles.ripplesImage}
        source={require('../assets/images/ripples_text.png')}/>  
      <Text style={styles.welcome}>{i18n.t('LETS START')}</Text>
      <Text style={styles.takePictChoose}>{i18n.t('Take picture or choose')}</Text>
      <View style={styles.buttonWrapper}>
        {buttons.map((e, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={styles.button}
              onPress={e.onPress}
            >
              <Image
                source={e.icon}
                style={styles.buttonIcon}
              />
              <Text style={styles.iconText}>{e.label}</Text>
            </TouchableOpacity>
          )
        })
        }
      </View>
      <Text style={styles.locationName}>{i18n.t('Location name')} {props.route.params.name}</Text>
      <Image  
        style= {styles.poweredByImage}
        source={require('../assets/images/powered_by.png')}/>  
    </View>
    );
  }

  
export default Home;