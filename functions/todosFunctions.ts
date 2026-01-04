import { Todo, TodoType } from "@/context/TodoContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

// إضافة تودو جديد
export const addTodo = async (todos: Todo[], text: string, type: TodoType) => {
  const newTodo: Todo = {
    id: Date.now().toString(),
    text: text.trim(),
    type,
    isCompleted: false,

  };
  const updated = [newTodo, ...todos];
  await AsyncStorage.setItem("TODOS", JSON.stringify(updated));
  return updated;
};

// تبديل حالة التودو (مكتمل/غير مكتمل)
export const toggleTodo = async (todos: Todo[], id: string) => {
  const updated = todos.map(t =>
    t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
  );
  await AsyncStorage.setItem("TODOS", JSON.stringify(updated));
  return updated;
};

// حذف تودو
export const deleteTodo = async (todos: Todo[], id: string) => {
  const updated = todos.filter(t => t.id !== id);
  await AsyncStorage.setItem("TODOS", JSON.stringify(updated));
  return updated;
};

// تعديل نص التودو
export const editTodo = async (todos: Todo[], id: string, text: string) => {
  const updated = todos.map(t =>
    t.id === id ? { ...t, text: text.trim() } : t
  );
  await AsyncStorage.setItem("TODOS", JSON.stringify(updated));
  return updated;
};

// تحميل التودوز من AsyncStorage
export const loadTodos = async (): Promise<Todo[]> => {
  const stored = await AsyncStorage.getItem("TODOS");
  return stored ? JSON.parse(stored) : [];
};
