import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [dataPost, setDataPost] = useState([]);

  async function fetchPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const responseJSON = await response.json();
    setDataPost(responseJSON);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  // console.log(dataPost, "<<< data post");
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <View style={styles.container}>
          <Text style={styles.header}>Hacktiv8 Phase 3 - Hallo Imam</Text>
          <Text>Hallo Paragraph</Text>
          <Button
            onPress={() => {
              // console.log("Button ke press");
              Alert.alert("Hallo button di press nih");
            }}
            title="Click Me"
          />
          <Pressable
            onPress={() => {
              Alert.alert("Terima kasih sudah press aku");
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: "black",
                padding: 10,
                borderRadius: 8,
                marginTop: 10,
              }}
            >
              <Text>Hallo, Press me dongs</Text>
            </View>
          </Pressable>
          <StatusBar style="auto" />
        </View> */}
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
          <View style={{ backgroundColor: "white", flex: 3, padding: 8 }}>
            <Text
              style={[styles.header, styles.fontColor, { letterSpacing: 1 }]}
            >
              Bootcamp Coding Full Stack JavaScript
            </Text>
            <Text>
              Jadi Programmer 16 minggu, bayar setelah selesai belajar hingga
              dapat kerja!
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: "yellow", flex: 3 }}>
          <ScrollView>
            {dataPost.map((e) => {
              return (
                <View key={e.id} style={{ padding: 5 }}>
                  <Text>- {e.title}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={{ backgroundColor: "pink", flex: 3 }}>
          <FlatList
            data={dataPost}
            renderItem={({ item }) => {
              return (
                <View style={{ padding: 5 }}>
                  <Text>- {item.title}</Text>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
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
