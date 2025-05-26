import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Define the props interface
interface CustomCheckboxProps {
  label: string;
  checked: boolean;
  onPress: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, checked, onPress }) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      <Icon
        name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
        size={24}
        color={checked ? '#6A5ACD' : '#888'} // Checked color matches primary button
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
  },
});

export default CustomCheckbox;