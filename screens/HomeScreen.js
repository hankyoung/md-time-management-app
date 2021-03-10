import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {format} from 'date-fns';
import PlatformDevices from '../utils/PlatformDevices';
import Constants from '../utils/Constants';
import ActionModal from '../modals/ActionModal';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [action, setAction] = useState('');

  const resetDate = () => {
    setDate(new Date());
  };

  const closeModal = () => {
    setModalVisible(!modalVisible);
  };

  const onTapActionButton = (action) => {
    resetDate();
    setModalVisible(true);
    setAction(action);
  };

  const onSave = async () => {
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
      closeModal();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View>
      <Info />
      <View style={styles.categories}>
        <ActionButton
          title="Ăn"
          action={Constants.actionType.EAT}
          onTapActionButton={onTapActionButton}
        />
        <ActionButton
          title="Ngủ"
          action={Constants.actionType.SLEEP}
          onTapActionButton={onTapActionButton}
        />
        <ActionButton
          title="Dậy"
          action={Constants.actionType.WAKE}
          onTapActionButton={onTapActionButton}
        />
        <ActionButton
          title="Ị"
          action={Constants.actionType.POO}
          onTapActionButton={onTapActionButton}
        />
      </View>
      <ActionModal
        modalVisible={modalVisible}
        requestCloseModal={closeModal}
        date={date}
        onDateChange={setDate}
        onSave={onSave}
      />
    </View>
  );
}

function Info() {
  return (
    <View style={styles.info}>
      <View style={styles.infoLeft}>
        <Text style={{color: 'grey'}}>
          {format(new Date(), 'MMMM dd yyyy')}
        </Text>
        <Text style={{fontSize: 30}}>Welcome, Anh!</Text>
      </View>
      <View style={styles.infoRight}>
        <Image source={require('../assets/avatar.png')} style={styles.avatar} />
      </View>
    </View>
  );
}

function ActionButton({title, action, onTapActionButton}) {
  return (
    <TouchableOpacity
      style={styles.actionButton}
      onPress={() => onTapActionButton(action)}>
      <Text style={{color: '#117D89', fontSize: 20}}>{title}</Text>
    </TouchableOpacity>
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
  actionButton: {
    height: PlatformDevices.deviceHeight / 5.5,
    width: '100%',
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#117D89',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
