import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

interface CustomDatePickerProps {
  value: Date;
  onChangeDate: (date: Date) => void; // Changed to match CustomInput pattern
}

export default function CustomDatePicker({
  value,
  onChangeDate,
}: CustomDatePickerProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const toggleDatePicker = () => setShowDatePicker(!showDatePicker);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDatePicker} style={styles.input}>
        <Text style={styles.dateText}>
          {dayjs(value).locale('fr').format('YYYY-MM-DD')}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          mode="single"
          locale="en"
          date={value}
          firstDayOfWeek={1}
          onChange={response => {
            const selected = response?.date;
            if (!selected) return;

            if (dayjs.isDayjs(selected)) {
              onChangeDate(selected.toDate()); // Dayjs -> Date
            } else {
              onChangeDate(new Date(selected)); // string/number/Date -> Date
            }

            toggleDatePicker();
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 13,
    borderRadius: 10,
    fontSize: 14,
    alignSelf: 'center',
  },
  dateText: {
    fontSize: 14,
  },
  disabledText: {
    color: '#666',
  },
});
