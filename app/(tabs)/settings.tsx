import { createSettingsStyles } from "@/assets/styles/settings.styles";

import Preferences from "@/components/Preferences";
import ProgressStats from "@/components/ProgressStats";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DangerZone from "@/components/DangerZone";



type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
};

const SettingsScreen = () => {
  const { colors } = useTheme();
  const settingsStyles = createSettingsStyles(colors);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load todos from local storage
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await AsyncStorage.getItem("TODOS");
        setTodos(data ? JSON.parse(data) : []);
      } catch (e) {
        console.log("Failed to load todos in settings", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={settingsStyles.container}
    >
      <SafeAreaView style={settingsStyles.safeArea}>
        {/* HEADER */}
        <View style={settingsStyles.header}>
          <View style={settingsStyles.titleContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={settingsStyles.iconContainer}
            >
              <Ionicons name="settings" size={28} color="#ffffff" />
            </LinearGradient>
            <Text style={settingsStyles.title}>Settings</Text>
          </View>
        </View>

        <ScrollView
          style={settingsStyles.scrollView}
          contentContainerStyle={settingsStyles.content}
          showsVerticalScrollIndicator={false}
        >
          {!isLoading && <ProgressStats todos={todos} />}

          <Preferences />
          <DangerZone />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SettingsScreen;
