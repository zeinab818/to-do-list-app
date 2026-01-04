import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export type TodoType = "Today" | "Daily" | "Weekly" | "Monthly" | "Yearly";

export type Todo = {
  id: string;
  text: string;
  type: TodoType;
  isCompleted: boolean;
  createdAt: string; 
};

type TodosContextType = {
  todos: Todo[];
  addTodo: (text: string, type: TodoType) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  clearTodos: () => void;
};

const TodosContext = createContext<TodosContextType | null>(null);

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Load todos from AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem("TODOS").then((stored) => {
      setTodos(stored ? JSON.parse(stored) : []);
      setIsReady(true);
    });
  }, []);

  // Update state & AsyncStorage
  const saveTodos = (updater: (prev: Todo[]) => Todo[]) => {
    setTodos((prev) => {
      const updated = updater(prev);
      AsyncStorage.setItem("TODOS", JSON.stringify(updated)).catch((err) =>
        console.log("Error saving todos:", err)
      );
      return updated;
    });
  };
  // TodoContext.tsx (مختصر للجزء المهم)

  const addTodo = async (text: string, type: TodoType) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      type,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };

    const updated = [newTodo, ...todos];
    setTodos(updated);
    await AsyncStorage.setItem("TODOS", JSON.stringify(updated));
  };

  const toggleTodo = (id: string) => {
    saveTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  const deleteTodo = (id: string) => {
    saveTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    saveTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: text.trim() } : t))
    );
  };

  const clearTodos = () => {
    AsyncStorage.removeItem("TODOS");
    setTodos([]);
  };

  if (!isReady) return null;

  return (
    <TodosContext.Provider
      value={{ todos, addTodo, toggleTodo, deleteTodo, editTodo, clearTodos }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error("useTodos must be used inside TodosProvider");
  return ctx;
};
