import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MainStack from "./navigators/MainStack";
import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* <MainStack /> */}
        <Tab.Navigator
          screenOptions={({ route }) => {
            return {
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Dashboard") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Profile") {
                  iconName = focused ? "person" : "person-outline";
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "red",
              tabBarInactiveTintColor: "gray",
              headerShown: false,
              tabBarShowLabel: false,
            };
          }}
        >
          <Tab.Screen name="Dashboard" component={MainStack} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
