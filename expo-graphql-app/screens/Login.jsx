import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../components/CustomButton";

export default function LoginScreen({ navigation }) {
  const onSubmit = () => {
    console.log("submit form login");
    navigation.navigate("Home");
  };

  return (
    <View style={[styles.container]}>
      <Text style={[styles.header]}>Sign In</Text>

      {/* --- FORM --- */}
      <View style={[styles.boxForm]}>
        <View style={[styles.boxInput]}>
          <Text>Email</Text>
          <TextInput style={[styles.textInput]} textContentType={"email"} />
        </View>

        <View style={[styles.boxInput]}>
          <Text>Password</Text>
          <TextInput style={[styles.textInput]} textContentType={"password"} />
        </View>
      </View>

      {/* --- BUTTON --- */}
      <CustomButton
        text="Login"
        stylesButton={{ width: "40%", borderRadius: 20 }}
        onPress={onSubmit}
      />

      <View style={[styles.boxLinkSignUp]}>
        <Text>Don't have an account ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={[styles.textLinkSignUp]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
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
  boxLinkSignUp: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 5,
  },
  textLinkSignUp: {
    color: "red",
    fontWeight: "500",
  },
});
