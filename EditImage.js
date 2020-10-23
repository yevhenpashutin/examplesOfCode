import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Gestures from 'react-native-easy-gestures';
import {
  ColorMatrix,
  concatColorMatrices,
  contrast,
  grayscale,
  brightness,
} from 'react-native-color-matrix-image-filters';
import ViewShot, {captureRef} from 'react-native-view-shot';
import {getFrames} from '../helpers/api';
import i18n from '../i18n';
import FormattedText from '../components/EditImage/FormattedText';
import {textOptions} from '../primitives/EditImage';
import styles from '../styles/EditImage';
const {width: vw} = Dimensions.get('window');

const EditImage = props => {
  const [imagePath, setImagePath] = useState('');
  const [chosenTab, setChosenTab] = useState(0);

  const [chosenFilter, setChosenFilter] = useState(0);

  const [frames, setFrames] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);

  const [text, setText] = useState('');
  const [textTapCount, setTextTapCount] = useState(0);
  const [textEditMode, setTextEditMode] = useState(false);
  const [textFont, setTextFont] = useState('');
  const [textColor, setTextColor] = useState('black');
  const [possibleCombinations, setPossibleCombinations] = useState([]);
  const [wordsArr, setwordsArr] = useState(['']);
  const [textClicks, setTextClicks] = useState(0);
  const textEditRef = useRef();

  const [proceedWithCapture, setProceedWithCapture] = useState(false);
  const capturedViewRef = useRef(null);
  const [matrix, setMatrix] = useState([grayscale(1)]);

  const buttons = [
    {
      label: 'Logo',
      onPress: () => {
        setMatrix([grayscale(1)]), setChosenFilter(0);
      },
    },
    {
      label: 'Bright Light',
      onPress: () => {
        setMatrix([grayscale(1), brightness(1.2), contrast(1.3)]),
          setChosenFilter(1);
      },
    },
    {
      label: 'Dark Light',
      onPress: () => {
        setMatrix([grayscale(1), brightness(1.5), contrast(1.5)]),
          setChosenFilter(2);
      },
    },
  ];

  const handleTap = () => {
    if (textTapCount == 1) { //double tap
      setTextEditMode(true);
      setTimeout(() => textEditRef.current.focus(), 500);
    } else {
      setTextTapCount(1);
      setTimeout(() => {
        setTextTapCount(0);
      }, 1000); //1 second for second/double tap
    }
  };

  const captureImage = () => {
    setChosenTab(0);
    captureRef(capturedViewRef, {
      format: 'jpg',
      quality: 0.8,
    }).then(
      uri => {
        props.navigation.navigate('ShowResultedImage', {uri});
        setProceedWithCapture(false);
      },
      error => console.log('Oops, snapshot failed', error)
    );
  };
  const onFramePress = e => {
    setSelectedFrame(e.url);
  };

  useEffect(() => {
    const baseUrl =
      props.route.params && props.route.params.baseUrl
        ? props.route.params.baseUrl
        : 'https://mobile-dev.coffeeripples.com/';
    const id =
      props.route.params && props.route.params.id
        ? props.route.params.id
        : '5e6e403c3f939e130c70722b';
    setImagePath({uri: imagePath});
    async function setFramesFromBackend() {
      setFrames(await getFrames(baseUrl, id));
    }
    setFramesFromBackend();
  }, []);

  useEffect(() => {
    if (proceedWithCapture) {
      captureImage();
    }
  }, [proceedWithCapture]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navBar}>
        <Text style={styles.textHeader}>Edit design</Text>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.backStyle}>
          <Image
            source={require('../assets/images/back_icon.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => setChosenTab(0)}>
          <Image
            source={require('../assets/images/tab_filters.png')}
            style={styles.tabStyle}
          />
          {chosenTab == 0 && (
            <View style={[styles.selectedTabLine, {marginLeft: 15}]} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setChosenTab(1)}>
          <Image
            source={require('../assets/images/tab_frames.png')}
            style={styles.tabStyle}
          />
          {chosenTab == 1 && <View style={styles.selectedTabLine} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setChosenTab(2)}>
          <Image
            source={require('../assets/images/tab_text.png')}
            style={styles.tabStyle}
          />
          {chosenTab == 2 && <View style={styles.selectedTabLine} />}
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />

      <View style={{width: '100%'}}>
        <ViewShot
          ref={capturedViewRef}
          overflow={'hidden'}
          style={styles.circleView}>
          <View
            ref={capturedViewRef}
            overflow={'hidden'}
            style={styles.circleView}>
            <Animated.View
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <ColorMatrix matrix={concatColorMatrices(matrix)}>
                <Image
                  source={
                    //{uri: imagePath}
                    imagePath !== null &&
                    require('../assets/images/testImage.jpg')
                  }
                  style={styles.mainImage}
                />
              </ColorMatrix>


          {selectedFrame && <Image
                  source={{uri: selectedFrame.replace('t_original/', '')}}
                  style={styles.imageFrame}
                />

              {textEditMode ? (
                <TextInput
                  ref={textEditRef}
                  value={text}
                  onChangeText={text => setText(text)}
                  style={styles.textInput}
                  placeholderTextColor={'rgba(255,255,255,1)'}
                  autoCorrect={false}
                  onSubmitEditing={() => setTextEditMode(false)}
                />
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{position: 'absolute'}}
                  onPress={handleTap}>
                  {text === '' ? (
                    chosenTab === 2 && !proceedWithCapture ? (
                      <Text
                        style={[
                          styles.unformattedText,
                          {color: textColor},
                          textFont && text !== '' && {fontFamily: textFont},
                        ]}>
                        {text == ''
                          ? i18n.t('DOUBLE TAP TO ADD OR EDIT TEXT')
                          : text}
                      </Text>
                    ) : (
                      <View />
                    )
                  ) : textFont == '' ? (
                    <Text
                      style={[
                        styles.unformattedText,
                        {color: textColor},
                        textFont && text !== '' && {fontFamily: textFont},
                      ]}>
                      {text == ''
                        ? i18n.t('DOUBLE TAP TO ADD OR EDIT TEXT')
                        : text}
                    </Text>
                  ) : (
                    <Gestures rotatable={true} scalable={true}>
                      <FormattedText
                        textFont={textFont}
                        text={
                          text === ''
                            ? i18n.t('DOUBLE TAP TO ADD OR EDIT TEXT')
                            : text
                        }
                        textColor={textColor}
                        maxWidth={vw * 0.4}
                        setText={setText}
                        possibleCombinations={possibleCombinations}
                        setPossibleCombinations={setPossibleCombinations}
                        wordsArr={wordsArr}
                        setwordsArr={setwordsArr}
                        textClicks={textClicks}
                      />
                    </Gestures>
                  )}
                </TouchableOpacity>
              )}
            </Animated.View>
          </View>
        </ViewShot>

        {chosenTab == 0 && imagePath !== null && (
          <View style={styles.trashIconContainer}>
            <TouchableOpacity
              style={styles.trashBinButton}
              onPress={() => setImagePath(null)}>
              <Image
                source={require('../assets/images/trash_bin_icon.png')}
                style={styles.trashIcon}
              />
            </TouchableOpacity>
          </View>
        )}

        {chosenTab == 2 &&
          <View style={{flexDirection: 'row', position: 'absolute'}}>
            <TouchableOpacity
              style={[styles.textColorButton, {backgroundColor: 'black'}]}
              onPress={() => setTextColor('black')}
            />
            <TouchableOpacity
              style={[styles.textColorButton, {}]}
              onPress={() => setTextColor('white')}
            />
          </View>
        )}
        {chosenTab == 2 && text !== '' && (
          <View style={styles.trashIconContainer}>
            <TouchableOpacity
              style={styles.trashBinButton}
              onPress={() => setText('')}>
              <Image
                source={require('../assets/images/trash_bin_icon.png')}
                style={styles.trashIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View
        style={{
          width: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        {chosenTab == 0 && imagePath !== null &&
          <Text style={styles.clickToChangeText}>
            {i18n.t('Move and zoom')}
          </Text>

        <View
          style={{flexDirection: 'row', width: vw, justifyContent: 'center'}}>
          {chosenTab == 0 &&
            imagePath !== null &&
            buttons.map((e, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.button,
                    {},
                    chosenFilter == i && {borderColor: '#E86161'},
                  ]}
                  onPress={e.onPress}>
                  <Text style={styles.iconText}>{e.label}</Text>
                </TouchableOpacity>
              );
            })}
          {chosenTab == 1 && frames && (
            <ScrollView horizontal={true}>
              {frames.map((e, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.button,
                      chosenFilter == i && {borderColor: '#E86161'},
                    ]}
                    onPress={() => onFramePress(e)}>
                    <Image
                      source={{uri: e.previewUrl}}
                      style={styles.textOptionImage}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
          {chosenTab == 2 && (
            <View>
              <Text style={styles.clickToChangeText}>
                {i18n.t('Click to change text')}
              </Text>
              <ScrollView horizontal={true}>
                {textOptions.map((e, i) => {
                  return (
                    <TouchableOpacity
                      style={styles.textOptionButton}
                      key={i}
                      onPress={() => {
                        if (textFont !== e.fontFamily) {
                          setTextFont(e.fontFamily);
                        }
                        setTextClicks(textClicks + 1);
                      }}>
                      <Image source={e.image} style={styles.textOptionImage} />
                    </TouchableOpacity>

                })}
              </ScrollView>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.printButton}
          onPress={() => setProceedWithCapture(true)}>
          <Text style={styles.printLabel}>PRINT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditImage;
