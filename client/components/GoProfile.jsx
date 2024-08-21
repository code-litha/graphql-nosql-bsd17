import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";

export default function GoProfile() {
  const navigation = useNavigation();

  return (
    <Button
      onPress={() => {
        navigation.navigate("Profile");
      }}
      title="Go Profile"
    />
  );
}
