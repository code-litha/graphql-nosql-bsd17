import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTab from "./navigators/MainTab";
import RegisterScreen from "./screens/Register";
import LoginScreen from "./screens/Login";
import ProductDetailScreen from "./screens/ProductDetail";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="MainTab" component={MainTab} />
              <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={{ headerShown: true }}
              />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApolloProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
