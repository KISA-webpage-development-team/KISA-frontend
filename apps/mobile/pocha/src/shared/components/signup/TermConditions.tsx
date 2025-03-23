import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import CheckBox from 'react-native-check-box';

type TermConditionsProps = {
  isScrolledToBottom: boolean;
  setIsScrolledToBottom: (value: boolean) => void;
  termChecked: boolean;
  setTermChecked: (value: boolean) => void;
  label: string;
  text: string;
  checkboxLabel: string;
};

export default function TermConditions({
  isScrolledToBottom,
  setIsScrolledToBottom,
  termChecked,
  setTermChecked,
  label,
  text,
  checkboxLabel,
}: TermConditionsProps) {
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    const isAtBottom = scrollY + layoutHeight >= contentHeight;
    if (isAtBottom || scrollY > lastScrollTop) {
      setIsScrolledToBottom(isAtBottom);
      setLastScrollTop(scrollY);
    }
  };

  return (
    <View style={styles.container}>
      {/*add sejong hospital bold later here */}
      <View style={[styles.labelOuter]}>
        <Text style={[styles.label]}>{label}</Text>
        <Text style={styles.required}>*</Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <Text>{text}</Text>
      </ScrollView>

      <View style={styles.checkboxContainer}>
        {/* Replaced <input type="checkbox"> with a checkbox component */}
        <CheckBox
          disabled={!isScrolledToBottom}
          isChecked={termChecked}
          onClick={() => setTermChecked(!termChecked)}
          checkBoxColor={!isScrolledToBottom ? 'lightgray' : '#000'}
        />
        {/*add sejong hospital light later here */}
        <Text
          style={[
            styles.checkboxLabel,
            {color: isScrolledToBottom ? '#000' : 'gray'},
          ]}>
          {checkboxLabel}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Sejong-hospital-Bold',
  },
  labelOuter: {
    flexDirection: 'row',
    gap: 4,
  },
  required: {
    color: 'red',
    fontSize: 16,
  },
  scrollContainer: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 10,
    maxHeight: 288,
    marginTop: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    marginLeft: 8,
    fontFamily: 'Sejong-hospital-Light',
  },
});
