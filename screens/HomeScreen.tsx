import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }: any) {
  return (
    <View>
      <Text>I am Home Screen</Text>
      <Button
        onPress={() => navigation.navigate("Planner")}
        title="Go to Planner"
      />
    </View>
  );
}
