import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PostDetail from "../components/PostDetail";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
  const [dataPost, setDataPost] = useState([]);

  async function fetchPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const responseJSON = await response.json();
    setDataPost(responseJSON);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ backgroundColor: "red", flex: 1, flexDirection: "row" }}>
        <View
          style={{
            backgroundColor: "orange",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 150, height: 150 }}
            source={{
              uri: "https://east.vc/wp-content/uploads/2020/01/hacktiv8-1.png",
            }}
            // resizeMode="stretch"
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            flex: 2.5,
            padding: 8,
            alignItems: "flex-start",
          }}
        >
          <Text style={[styles.header, styles.fontColor, { letterSpacing: 1 }]}>
            Bootcamp Coding Full Stack JavaScript
          </Text>
          <Text>
            Jadi Programmer 16 minggu, bayar setelah selesai belajar hingga
            dapat kerja!
          </Text>
          <Button
            onPress={() => {
              // Alert.alert("Button Detail ke press");
              navigation.navigate("Detail", {
                id: 1,
                data: {
                  id: 1,
                  username: "imam",
                  email: "imam@mail.com",
                },
              });
            }}
            title="See Detail"
            color={"orange"}
          />
        </View>
      </View>
      <View style={{ backgroundColor: "#c9f590", flex: 2 }}>
        <ScrollView>
          {dataPost.map((e) => {
            return <PostDetail key={e.id} title={e.title} />;
          })}
        </ScrollView>
      </View>
      <View style={{ backgroundColor: "#f5d090", flex: 2 }}>
        <FlatList
          data={dataPost}
          renderItem={({ item }) => {
            return <PostDetail title={item.title} />;
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  header: { fontSize: 20, fontWeight: "bold", color: "red" },
  fontColor: {
    color: "blue",
  },
});
