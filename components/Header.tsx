import { createHomeStyles } from "@/assets/styles/home.styles";
import { Todo } from "@/context/TodoContext";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type Props = {
  todos: Todo[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const Header = ({ todos, activeTab, setActiveTab }: Props) => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const completedCount = todos.filter(t => t.isCompleted).length;
  const totalCount = todos.length;

  const progressPercentage = totalCount
    ? Math.round((completedCount / totalCount) * 100)
    : 0;

  const tabs = [
    "All",
    "Today",
    "Daily",
    "Weekly",
    "Monthly",
    "Yearly",
    

  ];

  return (
    <View style={[homeStyles.header, { paddingBottom: 8 }]}>
      {/* Title and Icon */}
      <View style={[homeStyles.titleContainer, { marginBottom: 8 }]}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={[homeStyles.iconContainer, { width: 40, height: 40, borderRadius: 12 }]}
        >
          <Ionicons name="flash-outline" size={24} color="#fff" />
        </LinearGradient>

        <View style={homeStyles.titleTextContainer}>
          <Text style={[homeStyles.title, { fontSize: 18 }]}>Today&apos;s Tasks 👀</Text>
          <Text style={[homeStyles.subtitle, { fontSize: 12 }]}>
            {completedCount} of {totalCount} completed
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={homeStyles.progressContainer}>
        <View
          style={[
            homeStyles.progressBarContainer,
            { height: 8, borderRadius: 4, overflow: "hidden" },
          ]}
        >
          <LinearGradient
            colors={colors.gradients.success}
            style={[homeStyles.progressFill, { width: `${progressPercentage}%`, height: "100%" }]}
          />
        </View>
        <Text style={[homeStyles.progressText, { fontSize: 12, marginTop: 4 }]}>
          {progressPercentage}%
        </Text>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 12 }}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        {tabs.map(tab => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 14,
                borderRadius: 12,
                marginHorizontal: 4,
                backgroundColor: isActive
                  ? colors.gradients.primary[0]
                  : colors.gradients.muted[0],
              }}
            >
              <Text
                style={{
                  color: isActive ? "#fff" : colors.textMuted,
                  fontWeight: "bold",
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Header;
