/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Box, Text, useFocus, useFocusManager, useInput,
} from "ink";

export default function Prompts({ items, onSubmit }) {
  const [focusedValue, setFocusedValue] = useState(null);
  const { focus, focusNext, focusPrevious } = useFocusManager();

  useEffect(() => {
    if (items?.length && !focusedValue) {
      const [firstItem] = items;

      focus(firstItem.id);
      setFocusedValue(firstItem.value);
    }
  }, [items]);

  useInput((_, key) => {
    if (key.downArrow) {
      focusNext();
      return;
    }

    if (key.upArrow) {
      focusPrevious();
      return;
    }

    if (key.return) {
      onSubmit(focusedValue);
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      {items.map(({ label, id, value }) => (
        <PromptItem
          key={id}
          id={id}
          label={label}
          value={value}
          onFocus={setFocusedValue}
        />
      ))}
    </Box>
  );
}

function PromptItem({
  label, id, value, onFocus,
}) {
  const { isFocused } = useFocus({ id });

  useEffect(() => {
    if (isFocused) {
      onFocus(value);
    }
  }, [isFocused]);

  return (
    <Text color={isFocused ? "green" : ""}>
      {label}
      {" "}
      {isFocused && <Text>{"<"}</Text>}
    </Text>
  );
}
