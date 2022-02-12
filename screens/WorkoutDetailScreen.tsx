import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";

import { Modal } from "../components/styled/Modal";
import { PressableText } from "../components/styled/PressableText";
import WorkoutItem from "../components/WorkoutItem";
import { useWorkoutBySlug } from "../hooks/useWorkoutBySlug";
import { formatSec } from "../utils/time";
import { SequenceItem } from "../types/data";
import { useCountDown } from "../hooks/useCountDown";

type DetailParams = {
  route: {
    params: {
      slug: string;
    };
  };
};

type Navigation = NativeStackHeaderProps & DetailParams;

export default function WorkoutDetailScreen({ route }: Navigation) {
  const [sequence, setSquence] = useState<SequenceItem[]>([]);
  const [trackerIdx, setTrackerIdx] = useState(-1);
  const workout = useWorkoutBySlug(route.params.slug);

  const { countDown, isRunning, stop, start } = useCountDown(trackerIdx);

  useEffect(() => {
    if (!workout) return;
    if (trackerIdx === workout.sequence.length - 1) return;
    if (countDown === 0) {
      addItemToSequence(trackerIdx + 1);
    }
  }, [countDown]);

  const addItemToSequence = (idx: number) => {
    const newSequence = [...sequence, workout!.sequence[idx]];
    setSquence(newSequence);
    setTrackerIdx(idx);
    start(newSequence[idx].duration);
  };

  if (!workout) {
    return null;
  }

  const hasReachedEnd =
    sequence.length === workout.sequence.length && countDown === 0;

  return (
    <View style={styles.container}>
      <WorkoutItem item={workout} childStyles={{ marginTop: 10 }}>
        <Modal
          activator={({ handleOpen }) => (
            <PressableText onPress={handleOpen} text="Check Sequence" />
          )}>
          <View>
            {workout.sequence.map((sequenceItem, index) => (
              <View style={styles.sequenceItem} key={sequenceItem.slug}>
                <Text>
                  {sequenceItem.name} | {sequenceItem.type} |{" "}
                  {formatSec(sequenceItem.duration)}
                </Text>
                {index !== workout.sequence.length - 1 && (
                  <FontAwesome name="arrow-down" size={20} />
                )}
              </View>
            ))}
          </View>
        </Modal>
      </WorkoutItem>

      <View style={styles.centerView}>
        {sequence.length === 0 && (
          <FontAwesome
            name="play-circle-o"
            size={100}
            onPress={() => addItemToSequence(0)}
          />
        )}

        {sequence.length > 0 && countDown >= 0 && (
          <View>
            <Text style={{ fontSize: 55 }}>{countDown}</Text>
          </View>
        )}
      </View>

      <View style={styles.sequenceItem}>
        <Text style={styles.sequenceText}>
          {sequence.length === 0
            ? "Prepare"
            : hasReachedEnd
            ? "Great Job!"
            : sequence[trackerIdx].name}
        </Text>
      </View>
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
  sequenceText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sequenceItem: {
    alignItems: "center",
  },
  centerView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
});
