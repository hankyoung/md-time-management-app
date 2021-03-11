import Slider from '@react-native-community/slider';
import React from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import RadioButton from '../components/RadioButton';
import Constants from '../utils/Constants';

export default function ActionModal({
  modalVisible,
  requestCloseModal,
  date,
  onDateChange,
  onSave,
  action,
  mamaMilk,
  toggleMilk,
  milkVolume,
  changeMilkVolume,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={requestCloseModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{fontSize: 20, marginBottom: 50, fontWeight: 'bold'}}>
            Hoạt động:{' '}
            <Text style={{fontWeight: 'normal', fontStyle: 'italic'}}>
              {action.name}
            </Text>
          </Text>
          {/* Check action eat */}
          {action === Constants.action.EAT && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <RadioButton
                selected={mamaMilk}
                toggleMilk={toggleMilk}
                label="Sữa mẹ"
              />
              <Slider
                style={{width: 160, height: 40}}
                minimumValue={30}
                maximumValue={160}
                step={10}
                value={milkVolume}
                onValueChange={changeMilkVolume}
                minimumTrackTintColor="#000"
                maximumTrackTintColor="#000"
              />
              <Text style={{fontSize: 20}}>{milkVolume} ml</Text>
            </View>
          )}
          {/* End */}
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 24}}>Chọn thời gian:</Text>
            <DatePicker date={date} onDateChange={onDateChange} />
          </View>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={onSave}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={requestCloseModal}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100,100,100, 0.9)',
  },
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 20,
    padding: 24,
    width: '95%',
  },
  modalButtons: {
    marginTop: 30,
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonText: {
    fontSize: 20,
  },
});
