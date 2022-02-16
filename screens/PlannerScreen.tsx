import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import slugify from "slugify";

import ExerciseForm, { ExerciseFormData } from "../components/ExerciseForm";
import { SequenceItem, SequenceType } from "../types/data";
import ExerciseItem from "../components/ExerciseItem";
import { PressableText } from "../components/styled/PressableText";
import { Modal } from "../components/styled/Modal";

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

      <ExerciseForm onSubmit={handleFormSubmit} />

      <View>
        <Modal
          activator={({ handleOpen }) => (
            <PressableText
              style={{ marginTop: 15 }}
              text="Create Workout"
              onPress={handleOpen}
            />
          )}
          animation="fade">
          <View>
            <Text>My Form</Text>
          </View>
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
