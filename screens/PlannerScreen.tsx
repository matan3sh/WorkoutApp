import { StyleSheet, View } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import WorkoutForm, { ExerciseForm } from "../components/WorkoutForm";

export default function PlannerScreen({ navigation }: NativeStackHeaderProps) {
  const handleFormSubmit = (form: ExerciseForm) => {
    alert(JSON.stringify(form));
  };

  return (
    <View style={styles.container}>
      <WorkoutForm onSubmit={handleFormSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
