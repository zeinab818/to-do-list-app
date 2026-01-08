import { View, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/useTheme";
import { TodoType, useTodos } from "@/context/TodoContext";
import { useState } from "react";

type Props = { type: TodoType };

const TodoInput = ({ type }: Props) => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const { addTodo } = useTodos();

  const [newTodo, setNewTodo] = useState("");

  const handleAdd = async () => {
    if (!newTodo.trim()) return;
    await addTodo(newTodo.trim(), type);
    setNewTodo("");
  };

  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <TextInput
          returnKeyType="done"
          blurOnSubmit
          style={homeStyles.input}
          placeholder={`Add ${type} task`}
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAdd}
          placeholderTextColor={colors.textMuted}
        />

        <TouchableOpacity onPress={handleAdd} disabled={!newTodo.trim()}>
          <LinearGradient
            colors={
              newTodo.trim()
                ? colors.gradients.primary
                : colors.gradients.muted
            }
            style={homeStyles.addButton}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoInput;
