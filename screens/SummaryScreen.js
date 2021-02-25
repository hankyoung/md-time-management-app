import React from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import Constants from '../utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SummaryScreen() {
  const items = [
    {id: '0', title: 'Beef', image: require('../assets/beef.jpeg')},
    {id: '1', title: 'Vegetables', image: require('../assets/vegetables.png')},
    {id: '2', title: 'Eggs', image: require('../assets/eggs-and-dairy.png')},
  ];

  const _renderItem = ({item}) => (
    <ListItem image={item.image} title={item.title} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={items}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const ListItem = ({image, title}) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.selectItem}>
        <View style={styles.leftView}>
          <Image source={image} style={styles.leftImage} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightTextView}>
          <Text>10</Text>
          <Text> kcal</Text>
        </View>
      </View>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Constants.appMargin,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: -10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,

    elevation: 3,
  },
  list: {
    width: '100%',
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  selectItem: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftImage: {
    width: 42,
    height: 42,
    marginLeft: 15,
    borderRadius: 30,
  },
  title: {
    marginLeft: 15,
    fontSize: 14,
  },
  rightTextView: {
    flexDirection: 'row',
    marginRight: 15,
  },
  dividerContainer: {
    alignItems: 'flex-end',
    width: '100%',
    paddingRight: 10,
  },
  divider: {
    borderColor: 'grey',
    borderBottomWidth: 1,
    height: 1,
    width: '80%',
  },
});
