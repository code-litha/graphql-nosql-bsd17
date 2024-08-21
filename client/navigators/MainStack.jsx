import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        // headerBackButtonMenuEnabled: true,
      }}
    >
      <Stack.Screen
        name={"Home"}
        component={HomeScreen}
        // options={{ headerTitle: "Dashboard", headerShown: false }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}
