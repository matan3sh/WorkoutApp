import { View, StyleSheet, FlatList, Text } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import { MontserratText } from "../components/styled/MontserratText";
import WorkoutItem from "../components/WorkoutItem";

import { Workout } from "../types/data";
import data from "../data.json";

export default function HomeScreen({ navigation }: NativeStackHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>New Workouts</Text>
      <MontserratText style={{ fontSize: 30 }}>New Workouts</MontserratText>
      <FlatList
        data={data as Workout[]}
        renderItem={WorkoutItem}
        keyExtractor={(item) => item.slug}
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
    fontFamily: "montserrat-bold",
  },
});
