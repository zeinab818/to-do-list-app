import { createSettingsStyles } from "@/assets/styles/settings.styles";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Switch, Text, View } from "react-native";

const Preferences = () => {
  const { isDarkMode, toggleDarkMode, colors } = useTheme();
  const settingsStyles = createSettingsStyles(colors);

  const [isAutoSync, setIsAutoSync] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  /* LOAD SETTINGS */
  useEffect(() => {
    (async () => {
      const autoSync = await AsyncStorage.getItem("AUTO_SYNC");
      const notifications = await AsyncStorage.getItem("NOTIFICATIONS");

      if (autoSync !== null) setIsAutoSync(JSON.parse(autoSync));
      if (notifications !== null)
        setIsNotificationsEnabled(JSON.parse(notifications));
    })();
  }, []);

  /* SAVE HELPERS */
  const toggleAutoSync = async () => {
    const value = !isAutoSync;
    setIsAutoSync(value);
    await AsyncStorage.setItem("AUTO_SYNC", JSON.stringify(value));
  };

  const toggleNotifications = async () => {
    const value = !isNotificationsEnabled;
    setIsNotificationsEnabled(value);
    await AsyncStorage.setItem("NOTIFICATIONS", JSON.stringify(value));
  };

  return (
    <LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
      <Text style={settingsStyles.sectionTitle}>Preferences</Text>

      {/* DARK MODE */}
      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <LinearGradient colors={colors.gradients.primary} style={settingsStyles.settingIcon}>
            <Ionicons name="moon" size={18} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyles.settingText}>Dark Mode</Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor="#fff"
          trackColor={{ false: colors.border, true: colors.primary }}
        />
      </View>

      {/* NOTIFICATIONS */}
      {/* <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <LinearGradient colors={colors.gradients.warning} style={settingsStyles.settingIcon}>
            <Ionicons name="notifications" size={18} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyles.settingText}>Notifications</Text>
        </View>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={toggleNotifications}
          thumbColor="#fff"
          trackColor={{ false: colors.border, true: colors.warning }}
        />
      </View> */}

      {/* AUTO SYNC */}
      {/* <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <LinearGradient colors={colors.gradients.success} style={settingsStyles.settingIcon}>
            <Ionicons name="sync" size={18} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyles.settingText}>Auto Sync</Text>
        </View>
        <Switch
          value={isAutoSync}
          onValueChange={toggleAutoSync}
          thumbColor="#fff"
          trackColor={{ false: colors.border, true: colors.success }}
        />
      </View> */}
    </LinearGradient>
  );
};

export default Preferences;
