import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }: NativeStackHeaderProps) {
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
