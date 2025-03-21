import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
// import {
//   sejongHospitalBold,
//   sejongHospitalLight,
// } from "../../utils/fonts/textFonts";

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
  // const divRef = useRef(null);
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

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const div = divRef.current;
  //     if (div) {
  //       const { scrollTop, scrollHeight, clientHeight } = div;
  //       const isAtBottom = scrollTop + clientHeight >= scrollHeight;
  //       if (isAtBottom || scrollTop > lastScrollTop) {
  //         setIsScrolledToBottom(isAtBottom);
  //         setLastScrollTop(scrollTop);
  //       }
  //     }
  //   };

  //   const div = divRef.current;
  //   if (div) {
  //     div.addEventListener("scroll", handleScroll);
  //     return () => div.removeEventListener("scroll", handleScroll);
  //   }
  // }, [divRef, setIsScrolledToBottom, lastScrollTop]);

  return (
    <View style={styles.container}>
      {/*add sejong hospital bold later here */}
      <Text style={[styles.label]}>
        {label}
        <Text style={styles.required}>*</Text>
      </Text>

      <ScrollView
        style={styles.scrollContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16} // ~60fps
      >
        <Text style={styles.text}>{text}</Text>
      </ScrollView>

      <View style={styles.checkboxContainer}>
        <CheckBox
          disabled={!isScrolledToBottom}
          value={termChecked}
          onValueChange={newValue => setTermChecked(newValue)}
        />
        {/*add sejong hospital light later here */}
        <Text
          style={[
            styles.checkboxLabel,
            {color: isScrolledToBottom ? '#000' : '#9ca3af'},
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
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  label: {
    fontSize: 16, // equivalent to text-base
  },
  required: {
    color: 'red',
    marginLeft: 4,
  },
  scrollContainer: {
    borderWidth: 1,
    borderColor: '#d1d5db', // Tailwind's gray-300
    borderRadius: 8,
    padding: 12,
    maxHeight: 288, // Tailwind's max-h-72 (72 * 4 = 288px)
    marginTop: 8,
  },
  text: {
    // Add any styling for the text content if needed
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkboxLabel: {
    fontSize: 14, // equivalent to text-sm
    marginLeft: 8,
  },
});
