import { useQuery } from "@apollo/client";
import { View, Text, ActivityIndicator, FlatList, Button } from "react-native";
import { GET_PRODUCTS } from "../config/queries";

export default function HomeScreen({ navigation }) {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  // console.log({ data, loading, error });

  if (loading) {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Internal Server Error</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* <Text>Home Screen</Text> */}
      {/* <Text>{JSON.stringify(data.getProducts)}</Text> */}
      <FlatList
        data={data.getProducts || []}
        renderItem={({ item }) => {
          return (
            <View style={{ borderWidth: 1, padding: 10, margin: 5 }}>
              <Text>Name : {item.name}</Text>
              <Text>Price : {item.price}</Text>
              <Button
                title="See Detail"
                onPress={() => {
                  console.log(`See Detail ${item._id}`);
                  navigation.navigate("ProductDetail", {
                    _id: item._id,
                  });
                }}
              />
            </View>
          );
        }}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
