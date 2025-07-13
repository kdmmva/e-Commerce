import { Ionicons } from "@expo/vector-icons";
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import FavoriteItem from "../../components /Favorite/FavoriteItem";
import useAuthStore from "../../store/authStore";
import { useProductStore } from "../../store/productStore";

const { height } = Dimensions.get("window");

export default function FavoriteScreen() {
  const user = useAuthStore((s) => s.user);
  const { products, toggleFavorite, isFavorite } = useProductStore();

  const favoriteProducts = products.filter(
    (p) => user && isFavorite(user.id, p.id)
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={favoriteProducts}
          renderItem={({ item }) => (
            <FavoriteItem
              item={item}
              onToggleFavorite={() => user && toggleFavorite(user.id, item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyHeartContainer}>
                <Ionicons name="heart" size={80} color="#F0F0F0" />
                <Ionicons
                  name="heart-dislike"
                  size={60}
                  color="#787676"
                  style={styles.emptyHeartIcon}
                />
              </View>
              <Text style={styles.emptyTitle}>Your favorites are empty</Text>
              <Text style={styles.emptyText}>
                Tap the heart icon on items to add them here
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: "#FFF",
  },
  listContainer: {
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: height * 0.2,
  },
  emptyHeartContainer: {
    position: "relative",
    marginBottom: 24,
  },
  emptyHeartIcon: {
    position: "absolute",
    alignSelf: "center",
    top: 10,
  },
  emptyTitle: {
    textAlign: "center",
    color: "#292526",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyText: {
    textAlign: "center",
    color: "#787676",
    fontSize: 14,
    maxWidth: 250,
    lineHeight: 20,
  },
});
