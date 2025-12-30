import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
};

type Props = {
  todos: Todo[];
};

const Header = ({ todos }: Props) => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const completedCount = todos.filter(t => t.isCompleted).length;
  const totalCount = todos.length;

  const progressPercentage = totalCount
    ? Math.round((completedCount / totalCount) * 100)
    : 0;

  return (
    <View style={homeStyles.header}>
      {/* Title */}
      <View style={homeStyles.titleContainer}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={homeStyles.iconContainer}
        >
          <Ionicons name="flash-outline" size={28} color="#fff" />
        </LinearGradient>

        <View style={homeStyles.titleTextContainer}>
          <Text style={homeStyles.title}>Today&apos;s Tasks 👀</Text>
          <Text style={homeStyles.subtitle}>
            {completedCount} of {totalCount} completed
          </Text>
        </View>
      </View>

      {/* Progress */}
      <View style={homeStyles.progressContainer}>
        <View style={homeStyles.progressBarContainer}>
          <View style={homeStyles.progressBar}>
            <LinearGradient
              colors={colors.gradients.success}
              style={[
                homeStyles.progressFill,
                { width: `${progressPercentage}%` },
              ]}
            />
          </View>

          <Text style={homeStyles.progressText}>
            {progressPercentage}%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
