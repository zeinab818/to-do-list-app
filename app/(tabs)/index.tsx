import { createHomeStyles } from "@/assets/styles/home.styles";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";

import TodoInput from "@/components/TodoInput";
import { Todo, TodoType, useTodos } from "@/context/TodoContext";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatTodoDate } from "./../../functions/date";

import { getDailyQuote } from "@/functions/getDailyQoute";
import { type } from './../../to-do-list/components/themed-text';


export default function Index() {
  useEffect(() => {
    Alert.alert(
      "🌱 Today’s Intention",
      getDailyQuote(),
      [
        { text: "I’m ready 💪" },
        { text: "Let’s go 🚀" },
        
      ],
      { cancelable: true }
    );
  }, []);


  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const { todos, toggleTodo, deleteTodo, editTodo } = useTodos();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [activeTab, setActiveTab] = useState<TodoType | "All">("All");


  const handleEditTodo = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    editTodo(editingId, editText);
    setEditingId(null);
    setEditText("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleDeleteTodo = (id: string) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          if (editingId === id) handleCancelEdit();
          deleteTodo(id);
        },
      },
    ]);
  };

  const renderTodoItem = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item.id;

    return (
  
      <View style={homeStyles.todoItemWrapper}>

        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
        >
          {/* Checkbox */}
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => toggleTodo(item.id)}
          >
            <LinearGradient
              colors={
                item.isCompleted
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={homeStyles.checkboxInner}
            >
              {item.isCompleted && (
                <Ionicons name="checkmark" size={18} color="#fff" />
              )}
            </LinearGradient>
          </TouchableOpacity>

          {isEditing ? (
            <View style={homeStyles.editContainer}>
              <TextInput
                style={homeStyles.editInput}
                value={editText}
                onChangeText={setEditText}
                autoFocus
                multiline
                placeholder="Edit your todo..."
                placeholderTextColor={colors.textMuted}
              />
              <View style={homeStyles.editButtons}>
                <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                  <LinearGradient
                    colors={colors.gradients.success}
                    style={homeStyles.editButton}
                  >
                    <Ionicons name="checkmark" size={16} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleCancelEdit}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.muted}
                    style={homeStyles.editButton}
                  >
                    <Ionicons name="close" size={16} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={homeStyles.todoTextContainer}>
              <Text
                style={[
                  homeStyles.todoText,
                  item.isCompleted && {
                    textDecorationLine: "line-through",
                    color: colors.textMuted,
                    opacity: 0.6,
                  },
                ]}
              >
                {item.text}
              </Text>

              <View style={homeStyles.todoActions}>
                {/* Edit */}
                <TouchableOpacity
                  onPress={() => handleEditTodo(item)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.warning}
                    style={homeStyles.actionButton}
                  >
                    <Ionicons name="pencil" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>

                {/* Delete */}
                <TouchableOpacity
                  onPress={() => handleDeleteTodo(item.id)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.danger}
                    style={homeStyles.actionButton}
                  >
                    <Ionicons name="trash" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 4,
                  }}
                >
                  <Ionicons
                    name="time-outline"
                    size={12}
                    color={colors.textMuted}
                    style={{ marginRight: 4 }}
                  />
                  <Text style={{ fontSize: 11, color: colors.textMuted }}>
                    {formatTodoDate(item.createdAt)}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </LinearGradient>
      </View>
    );
  };
  const filteredTodos =
    activeTab === "All"
      ? todos
      : todos.filter((todo) => todo.type === activeTab);
const sortedTodos = [...filteredTodos].sort((a, b) => {
  if (a.isCompleted === b.isCompleted) return 0;
  return a.isCompleted ? 1 : -1;
});
  return (
   
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header
          todos={todos}
          activeTab={activeTab}
          setActiveTab={setActiveTab as (tab: TodoType | "All") => void}
        />
        {activeTab !== "All" && (
          <TodoInput type={activeTab} />
        )}
  

       <FlatList
          data={sortedTodos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item.id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
        />

      </SafeAreaView>
    </LinearGradient>
  );
}
