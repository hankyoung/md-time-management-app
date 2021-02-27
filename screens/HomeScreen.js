import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {format} from 'date-fns';
import PlatformDevices from '../utils/PlatformDevices';
import Constants from '../utils/Constants';

export default function HomeScreen() {
  const handlePressButton = async (action) => {
    try {
      const url = `http://128.199.116.189:8180/api/v1/public/activities?action=${action}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      alert(`${result.message} hành động ${result.data.activityDesc}`);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View>
      <View style={styles.info}>
        <View style={styles.infoLeft}>
          <Text style={{color: 'grey'}}>
            {format(new Date(), 'MMMM dd yyyy')}
          </Text>
          <Text style={{fontSize: 30}}>Welcome, Anh!</Text>
        </View>
        <View style={styles.infoRight}>
          <Image
            source={require('../assets/avatar.png')}
            style={styles.avatar}
          />
        </View>
      </View>
      <View style={styles.categories}>
        <TouchableOpacity
          onPress={() => {
            handlePressButton('EAT');
          }}>
          <ActionButton title="Ăn" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handlePressButton('SLEEP');
          }}>
          <ActionButton title="Ngủ" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePressButton('WAKE')}>
          <ActionButton title="Dậy" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePressButton('POO')}>
          <ActionButton title="Ị" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ActionButton({title}) {
  return (
    <View style={styles.categoryImage}>
      <Text style={{color: '#117D89', fontSize: 20}}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    height: '15%',
    flexDirection: 'row',
    marginHorizontal: Constants.appMargin,
  },
  infoLeft: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
  },
  infoRight: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  categories: {
    height: '85%',
    justifyContent: 'space-between',
    marginHorizontal: Constants.appMargin,
    paddingBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  categoryImage: {
    height: PlatformDevices.deviceHeight / 5.5,
    width: '100%',
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#117D89',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
