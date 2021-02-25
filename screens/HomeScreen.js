import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {format} from 'date-fns';
import PlatformDevices from '../utils/PlatformDevices';
import Constants from '../utils/Constants';

export default function HomeScreen() {
  const handlePressSleep = async () => {
    try {
      const url = 'http://192.168.1.17:8080/api/v1/activities?action=POO';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
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
        <TouchableOpacity onPress={handlePressSleep}>
          <Category
            image={require('../assets/beef.jpeg')}
            title="Meats"
            subTitle="6 types"
          />
        </TouchableOpacity>
        <Category
          image={require('../assets/vegetables.png')}
          title="Vegetables"
          subTitle="4 types"
        />
        <Category
          image={require('../assets/rice-and-cereals.png')}
          title="Cereals, Rice and Legumes"
          subTitle="5 types"
        />
        <Category
          image={require('../assets/eggs-and-dairy.png')}
          title="Eggs and Dairy"
          subTitle="10 types"
        />
      </View>
    </View>
  );
}

function Category({image, title, subTitle}) {
  return (
    <View>
      <Image source={image} style={styles.categoryImage} />
      <View style={{position: 'absolute', bottom: 20, left: 20}}>
        <Text style={{color: '#fff', fontSize: 20}}>{title}</Text>
        <Text style={{color: '#fff'}}>{subTitle}</Text>
      </View>
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
  },
});
