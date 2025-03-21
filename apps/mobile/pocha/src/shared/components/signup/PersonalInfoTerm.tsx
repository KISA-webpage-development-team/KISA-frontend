import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PersonalInfoTerm() {
  return (
    <View style={styles.container}>
      {/* add sejong hopital bold later here */}
      <Text style={styles.label}>
        개인 정보 수집 약관
        <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.termContainer}>
        <Text style={styles.termText}>
          term term term term term term term term term term term term term term
          term term term term term term term term term term term term term term
          term term term term term term term term term term term term term term
        </Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={termChecked}
          onValueChange={newValue => setTermChecked(newValue)}
        />
        {/*add sejong hopital bold later*/}
        <Text style={[styles.checkboxLabel]}>
          개인 정보 수집 약관에 동의합니다.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32, // equivalent to mt-8 (assuming 8*4=32)
    width: "100%",
  },
  label: {
    fontSize: 16, // equivalent to text-base
  },
  required: {
    color: "red",
    marginLeft: 4,
  },
  termContainer: {
    borderWidth: 1,
    borderColor: "#D1D5DB", // gray-300 from Tailwinds
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  termText: {
    // Additional styling if needed
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 14, // equivalent to text-sm
    marginLeft: 8,
  },
});