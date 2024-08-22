import { View, Text, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../config/queries";

export default function ProductDetailScreen({ route }) {
  const { _id } = route.params;
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
    variables: {
      productId: _id,
    },
  });

  console.log({ data, loading, error });

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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Product Detail Screen ID: {_id}</Text>
      {/* <Text>{JSON.stringify(data.getProductById)}</Text> */}
      <Text>Name: {data.getProductById?.name} </Text>
      <Text>Price: {data.getProductById?.price} </Text>
    </View>
  );
}
