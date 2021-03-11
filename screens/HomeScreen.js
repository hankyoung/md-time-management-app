import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useState} from 'react';
import {format} from 'date-fns';
import Constants from '../utils/Constants';
import ActionModal from '../modals/ActionModal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [action, setAction] = useState({});
  const [mamaMilk, setMamaMilk] = useState(false);
  const [milkVolume, setMilkVolume] = useState(120);

  const resetDate = () => setDate(new Date());
  const resetMamaMilk = () => setMamaMilk(false);
  const resetMilkVolume = () => setMilkVolume(120);
  const onDateChange = (date) => setDate(date);
  const changeMilkVolume = (volume) => setMilkVolume(volume);
  const closeModal = () => setModalVisible(!modalVisible);
  const toggleMilk = () => setMamaMilk(!mamaMilk);

  const onTapActionButton = (action) => {
    resetDate();
    resetMamaMilk();
    resetMilkVolume();
    setModalVisible(true);
    setAction(action);
  };

  const showToast = (content) => {
    ToastAndroid.show(content, ToastAndroid.SHORT);
  };

  const onSave = async () => {
    let payload = {
      createdOn: date.valueOf() / 1000,
      activity: action.type,
    };

    if (action === Constants.action.EAT) {
      payload = {...payload, volume: milkVolume, isMamaMilk: mamaMilk};
    }
    console.log(`payload: ${JSON.stringify(payload)}`);

    try {
      // const url = `http://128.199.116.189:8180/api/v1/public/activities?action=${action.type}`;
      const url = 'http://192.168.1.17:8180/api/v1/public/activities';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      showToast(`${result.message} hoạt động ${result.data.activityDesc}`);
      closeModal();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={{backgroundColor: Constants.colors.backgroundColor}}>
      <Info />
      <View style={styles.actionContainer}>
        <View style={styles.row}>
          <ActionButton
            icon={
              <Icon
                name="baby-bottle-outline"
                size={30}
                color={Constants.colors.darkBlue}
              />
            }
            action={Constants.action.EAT}
            onTapActionButton={onTapActionButton}
          />
          <ActionButton
            icon={
              <Icon
                name="bed-outline"
                size={30}
                color={Constants.colors.darkBlue}
              />
            }
            action={Constants.action.SLEEP}
            onTapActionButton={onTapActionButton}
          />
        </View>
        <View style={styles.row}>
          <ActionButton
            icon={
              <Icon
                name="baby-face-outline"
                size={30}
                color={Constants.colors.darkBlue}
              />
            }
            action={Constants.action.WAKE}
            onTapActionButton={onTapActionButton}
          />
          <ActionButton
            icon={
              <Icon name="toilet" size={30} color={Constants.colors.darkBlue} />
            }
            action={Constants.action.POO}
            onTapActionButton={onTapActionButton}
          />
        </View>
      </View>
      <ActionModal
        modalVisible={modalVisible}
        requestCloseModal={closeModal}
        date={date}
        onDateChange={onDateChange}
        onSave={onSave}
        action={action}
        mamaMilk={mamaMilk}
        toggleMilk={toggleMilk}
        milkVolume={milkVolume}
        changeMilkVolume={changeMilkVolume}
      />
    </View>
  );
}

function Info() {
  return (
    <View style={styles.info}>
      <View style={styles.infoLeft}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: Constants.colors.darkBlue,
          }}>
          Xin chào, Anh!
        </Text>
        <Text style={{color: 'grey'}}>
          {format(new Date(), Constants.dateFormat.dateTime)}
        </Text>
      </View>
      <View style={styles.infoRight}>
        <Image source={require('../assets/avatar.png')} style={styles.avatar} />
      </View>
    </View>
  );
}

function ActionButton({icon, action, onTapActionButton}) {
  return (
    <TouchableOpacity
      style={{
        height: 80,
        width: '49%',
        borderRadius: 15,
        alignItems: 'flex-start',
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#FDFDFD',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        elevation: 3,
      }}
      onPress={() => onTapActionButton(action)}>
      <View style={{alignItems: 'center', justifyContent: 'space-between'}}>
        {icon}
        <Text style={{fontSize: 14, color: Constants.colors.darkBlue}}>
          {action.name}
        </Text>
      </View>
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
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  actionContainer: {
    height: '85%',
    marginTop: 50,
    marginHorizontal: Constants.appMargin,
    paddingBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
