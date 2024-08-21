import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <Button
      onPress={() => {
        navigation.navigate("Home");
      }}
      title="Go Home"
    />
  );
}
