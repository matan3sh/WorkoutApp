import { View, Text, Button } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

export default function PlannerScreen({ navigation }: NativeStackHeaderProps) {
  return (
    <View>
      <Text>I am Planner Screen</Text>
      <Button onPress={() => navigation.navigate("Home")} title="Back Home" />
    </View>
  );
}
