import { View, Text, Button } from "react-native";
import BackButton from "../components/BackButton";
import GoProfile from "../components/GoProfile";

export default function DetailScreen({ route, navigation }) {
  // console.log(route.params);
  const { id, data } = route.params || {};

  console.log(id, data, "<<< data params");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Detail Screen ID : {id}</Text>

      {/* <Button
        onPress={() => {
          // navigation.push("Home");
          navigation.navigate("Home");
        }}
        title="Go Home"
      /> */}
      <BackButton />
      <GoProfile />
    </View>
  );
}
