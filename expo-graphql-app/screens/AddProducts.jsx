import { View, Text, StyleSheet, TextInput } from "react-native";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ADD_PRODUCT, GET_PRODUCTS } from "../config/queries";

export default function AddProductsScreen({ navigation }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [addProductFunc, { data, loading, error }] = useMutation(ADD_PRODUCT, {
    refetchQueries: [GET_PRODUCTS],
    onCompleted: (response) => {
      console.log(response, "<<< response");
      setName("");
      setPrice(0);
      setQuantity(0);
      navigation.navigate("Home");
    },
  });

  const onSubmit = async () => {
    try {
      console.log("submit form addProducts");
      // console.log({ name, price, quantity });
      await addProductFunc({
        variables: {
          name: name,
          price: +price,
          quantity: +quantity,
        },
      });
      // setName('')
      // setPrice(0)
      // setQuantity(0)
      // navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={[styles.container]}>
      <Text style={[styles.header]}>Add Products</Text>

      {/* --- FORM --- */}
      <View style={[styles.boxForm]}>
        <View style={[styles.boxInput]}>
          <Text>Name</Text>
          <TextInput
            style={[styles.textInput]}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={[styles.boxInput]}>
          <Text>Price</Text>
          <TextInput
            style={[styles.textInput]}
            value={price}
            onChangeText={(text) => setPrice(text)}
          />
        </View>

        <View style={[styles.boxInput]}>
          <Text>Quantity</Text>
          <TextInput
            style={[styles.textInput]}
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
          />
        </View>
      </View>

      {/* --- BUTTON --- */}
      <CustomButton
        text="Submit"
        stylesButton={{ width: "40%", borderRadius: 20 }}
        onPress={onSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
  },
  boxForm: {
    width: "100%",
    marginVertical: 25,
  },
  boxInput: {
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 8,
  },
  textInput: {
    height: 40,
    marginVertical: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  boxLinkLogin: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 5,
  },
  textLinkLogin: {
    color: "red",
    fontWeight: "500",
  },
});
