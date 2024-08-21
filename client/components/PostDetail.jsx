import { Text, View } from "react-native";

export default function PostDetail({ title }) {
  return (
    <View style={{ padding: 5 }}>
      <Text>- {title}</Text>
    </View>
  );
}
