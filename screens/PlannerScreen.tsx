import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import slugify from "slugify";

import ExerciseForm, { ExerciseFormData } from "../components/ExerciseForm";
import { SequenceItem, SequenceType } from "../types/data";
import ExerciseItem from "../components/ExerciseItem";

export default function PlannerScreen({ navigation }: NativeStackHeaderProps) {
  const [sequenceItems, setSequenceItems] = useState<SequenceItem[]>([]);

  const handleFormSubmit = (form: ExerciseFormData) => {
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

  return (
    <View style={styles.container}>
      <FlatList
        data={sequenceItems}
        renderItem={ExerciseItem}
        keyExtractor={(item) => item.slug}
      />

      <ExerciseForm onSubmit={handleFormSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
