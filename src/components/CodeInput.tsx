import React, { useEffect, useState } from "react";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Text, StyleSheet, View } from "react-native";
import { useCode } from "@/providers/CodeProvider";
import Colors from "@/constants/Colors";
const styles1 = StyleSheet.create({
  root: { flex: 1, marginVertical: 5 },
  title: { fontSize: 16 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 48,
    fontSize: 24,
    borderWidth: 2,
    borderColor: Colors.light.tintBackground,
    textAlign: "center",
    borderRadius: 5,
    color:Colors.light.tint,
  },
  focusCell: {
    borderColor: Colors.light.tint,
  },
});

const CELL_COUNT = 4;

const CodeInput = () => {
  const { setCode, code } = useCode();
  const [value, setValue] = useState(code);
  const [submitted, setSubmitted] = useState(false);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

  useEffect(() => {
    if (value.length === CELL_COUNT && !submitted) {
      setCode(value);
      setSubmitted(true);
    }
  }, [value]);

  return (
    <View style={styles1.root}>
      <Text style={styles1.title}>Delivery Code</Text>
      <CodeField
        ref={ref}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles1.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles1.cell, isFocused && styles1.focusCell]}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </View>
  );
};

export default CodeInput;
