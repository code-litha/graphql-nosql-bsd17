import { View, Text } from "react-native";
import CustomButton from "../components/CustomButton";

export default function ProfileScreen({ navigation }) {
  const onLogout = () => {
    console.log("logout");
    navigation.navigate("Register");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
      <CustomButton text="Logout" onPress={onLogout} />
    </View>
  );
}
