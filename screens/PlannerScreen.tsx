import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import slugify from "slugify";

import ExerciseForm, { ExerciseFormData } from "../components/ExerciseForm";
import { SequenceItem, SequenceType, Workout } from "../types/data";
import ExerciseItem from "../components/ExerciseItem";
import { PressableText } from "../components/styled/PressableText";
import { Modal } from "../components/styled/Modal";
import WorkoutForm, { WorkoutFormData } from "../components/WorkoutForm";

export default function PlannerScreen({ navigation }: NativeStackHeaderProps) {
  const [sequenceItems, setSequenceItems] = useState<SequenceItem[]>([]);

  const handleExerciseSubmit = (form: ExerciseFormData) => {
    const sequenceItem: SequenceItem = {
      slug: slugify(form.name + "-" + Date.now(), { lower: true }),
      name: form.name,
      type: form.type as SequenceType,
      duration: Number(form.duration),
    };
    if (form.reps) {
      sequenceItem.reps = Number(form.reps);
    }
    setSequenceItems([...sequenceItems, sequenceItem]);
  };

  const computeDiff = (exercisesCount: number, workoutDuration: number) => {
    const intensity = workoutDuration / exercisesCount;
    if (intensity <= 60) return "hard";
    else if (intensity <= 100) return "normal";
    else return "easy";
  };

  const handleWorkoutSubmit = (form: WorkoutFormData) => {
    if (sequenceItems.length > 0) {
      const duration = sequenceItems.reduce(
        (acc, item) => acc + item.duration,
        0
      );
      const workout: Workout = {
        name: form.name,
        slug: slugify(form.name + "-" + Date.now(), { lower: true }),
        difficulty: computeDiff(sequenceItems.length, duration),
        sequence: [...sequenceItems],
        duration,
      };
      console.log(workout);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sequenceItems}
        renderItem={({ item, index }) => (
          <ExerciseItem item={item}>
            <PressableText
              text="Remove"
              onPressIn={() => {
                const items = [...sequenceItems];
                items.splice(index, 1);
                setSequenceItems(items);
              }}
            />
          </ExerciseItem>
        )}
        keyExtractor={(item) => item.slug}
      />

      <ExerciseForm onSubmit={handleExerciseSubmit} />

      {/* Create Workout Modal */}
      <View>
        <Modal
          animation="fade"
          activator={({ handleOpen }) => (
            <PressableText
              style={{ marginTop: 15 }}
              text="Create Workout"
              onPress={handleOpen}
            />
          )}>
          {({ handleClose }) => (
            <View>
              <WorkoutForm
                onSubmit={(data) => {
                  handleWorkoutSubmit(data);
                  handleClose();
                }}
              />
            </View>
          )}
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
