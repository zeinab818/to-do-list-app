import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
};

type TodosContextType = {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  clearTodos: () => void;
};

const TodosContext = createContext<TodosContextType | null>(null);

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Load todos once
  useEffect(() => {
    AsyncStorage.getItem("TODOS").then(stored => {
      setTodos(stored ? JSON.parse(stored) : []);
      setIsReady(true);
    });
  }, []);

  // Helper function to update state & AsyncStorage together
  const saveTodos = (updater: (prev: Todo[]) => Todo[]) => {
    setTodos(prev => {
      const updated = updater(prev);
      AsyncStorage.setItem("TODOS", JSON.stringify(updated)).catch(err =>
        console.log("Error saving todos:", err)
      );
      return updated;
    });
  };

  const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now().toString(), text: text.trim(), isCompleted: false };
    saveTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    saveTodos(prev => prev.map(t => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)));
  };

  const deleteTodo = (id: string) => {
    saveTodos(prev => prev.filter(t => t.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    saveTodos(prev => prev.map(t => (t.id === id ? { ...t, text: text.trim() } : t)));
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
