import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function RadioButton({style, selected, label, toggleMilk}) {
  return (
    <TouchableOpacity style={styles.container} onPress={toggleMilk}>
      <View style={[styles.outer, style]}>
        {selected && <View style={styles.inner} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outer: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  label: {
    fontSize: 20,
    marginLeft: 10,
  },
});
