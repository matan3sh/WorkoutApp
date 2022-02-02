import { View, StyleSheet, Text } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import { useWorkoutBySlug } from "../hooks/useWorkoutBySlug";
import { PressableText } from "../components/styled/PressableText";

type DetailParams = {
  route: {
    params: {
      slug: string;
    };
  };
};

type Navigation = NativeStackHeaderProps & DetailParams;

export default function WorkoutDetailScreen({ route }: Navigation) {
  const workout = useWorkoutBySlug(route.params.slug);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Name - {workout?.name}</Text>
      <PressableText
        onPress={() => alert("Opening Modal")}
        text="Check Sequence"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
