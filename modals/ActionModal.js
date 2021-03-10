import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Modal, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import PlatformDevices from '../utils/PlatformDevices';

export default function ActionModal({
  modalVisible,
  requestCloseModal,
  date,
  onDateChange,
  onSave,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={requestCloseModal}>
      <TouchableOpacity style={styles.centeredView} onPress={requestCloseModal}>
        <View style={styles.modalView}>
          <DatePicker date={date} onDateChange={onDateChange} />
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
      </TouchableOpacity>
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
  },
  modalButtons: {
    marginTop: 30,
    width: PlatformDevices.deviceWidth / 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonText: {
    fontSize: 20,
  },
});
