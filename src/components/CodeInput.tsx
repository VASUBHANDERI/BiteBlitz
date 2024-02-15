import React, { useEffect, useState } from "react";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Text, StyleSheet, View } from "react-native";
import { useCode } from "@/providers/CodeProvider";
const styles1 = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
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
      <Text style={styles1.title}>Verification</Text>
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
