import { View, Text, Button } from "react-native";

export default function PlannerScreen({ navigation }: any) {
  return (
    <View>
      <Text>I am Planner Screen</Text>
      <Button onPress={() => navigation.navigate("Home")} title="Back Home" />
    </View>
  );
}
