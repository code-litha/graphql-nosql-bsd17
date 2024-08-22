import { View, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import * as SecureStore from "expo-secure-store";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen({ navigation }) {
  const { setIsLoggedIn } = useContext(AuthContext);
  const onLogout = async () => {
    // console.log("logout");
    await SecureStore.deleteItemAsync("token");
    setIsLoggedIn(false);
    navigation.navigate("Register");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
      <CustomButton text="Logout" onPress={onLogout} />
    </View>
  );
}
