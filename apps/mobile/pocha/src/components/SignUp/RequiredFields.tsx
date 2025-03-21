import React from 'react';
import CustomField from '../../shared/component/CustomField';
import {View, StyleSheet} from 'react-native';

export default function RequiredFields({fields}) {
  return (
    <View style={styles.container}>
      {fields.map(
        (
        {
            value,
            setValue,
            label,
            type,
            placeholder,
            isError,
            errorMsg,
            errorState,
          },
          index,
        ) => (
          <View key={index} style = {styles.fieldContainer}>
            <CustomField
              value={value}
              setValue={setValue}
              label={label}
              required={true}
              type={type}
              placeholder={placeholder}
              isError={isError}
              errorMsg={errorMsg}
              errorState={errorState}
            />
          </View>
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
  },
  fieldContainer: {
    width: '100%',
    marginBottom: 24, // Gap equivalent to Tailwind's gap-6 (24px)
  },
});