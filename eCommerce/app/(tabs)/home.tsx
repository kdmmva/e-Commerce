import { mockProducts } from "@/mock/mockProducts";
import { Product } from "@/types/product";
import {
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    FlatList,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import ProductCard from "../../components /Product/ProductCart";
import useAuthStore from "../../store/authStore";
import { useProductStore } from "../../store/productStore";

const categories = [
  { name: "All items", icon: "apps" },
  { name: "Dress", icon: "hanger" },
  { name: "T-Shirt", icon: "tshirt" },
  { name: "Pants", icon: "human-male" },
  { name: "Shoes", icon: "shoe-heel" },
];

export default function HomeScreen() {
  const user = useAuthStore((state) => state.user);
  const { products, setProducts, toggleFavorite, isFavorite } =
    useProductStore();
  const [activeCategory, setActiveCategory] = useState("All items");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    setProducts(mockProducts);
  }, [setProducts]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All items" || product.type === activeCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderProductItem = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      isFavorite={user ? isFavorite(user.id, item.id) : false}
      onPress={() => router.push(`/product/${item.id}`)}
      onFavoritePress={() => user && toggleFavorite(user.id, item.id)}
    />
  );

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "apps":
        return (
          <MaterialCommunityIcons
            name={iconName}
            size={16}
            color={activeCategory === "All items" ? "#FFFFFF" : "#292526"}
          />
        );
      case "hanger":
        return (
          <MaterialCommunityIcons
            name={iconName}
            size={16}
            color={activeCategory === "Dress" ? "#FFFFFF" : "#292526"}
          />
        );
      case "tshirt":
        return (
          <FontAwesome5
            name={iconName}
            size={16}
            color={activeCategory === "T-Shirt" ? "#FFFFFF" : "#292526"}
          />
        );
      case "human-male":
        return (
          <MaterialCommunityIcons
            name={iconName}
            size={16}
            color={activeCategory === "Pants" ? "#FFFFFF" : "#292526"}
          />
        );
      case "shoe-heel":
        return (
          <MaterialCommunityIcons
            name={iconName}
            size={16}
            color={activeCategory === "Shoes" ? "#FFFFFF" : "#292526"}
          />
        );
      default:
        return <Ionicons name="shirt-outline" size={16} color="#292526" />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <FlatList
          data={filteredProducts}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={renderProductItem}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <View style={styles.header}>
                <View style={styles.profileHeader}>
                  <View style={styles.textContainer}>
                    <Text style={styles.greeting}>Hello, Welcome</Text>
                    <Text style={styles.name}>
                      {user ? `${user.firstname} ${user.lastname}` : "Guest"}
                    </Text>
                  </View>
                  <View style={styles.profileIconContainer}>
                    <Ionicons name="person-outline" size={20} color="#787676" />
                  </View>
                </View>
              </View>

              <View style={styles.searchRow}>
                <View style={styles.searchContainer}>
                  <Ionicons
                    name="search"
                    size={20}
                    color="#787676"
                    style={styles.searchIcon}
                  />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search clothes..."
                    placeholderTextColor="#787676"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                </View>
                <Pressable style={styles.filterButton}>
                  <Ionicons name="filter" size={20} color="#FFFFFF" />
                </Pressable>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesScroll}
                contentContainerStyle={styles.categoriesContent}
              >
                {categories.map((cat) => (
                  <Pressable
                    key={cat.name}
                    onPress={() => setActiveCategory(cat.name)}
                    style={[
                      styles.categoryButton,
                      activeCategory === cat.name && styles.activeCategory,
                    ]}
                  >
                    <View style={styles.categoryContent}>
                      {getCategoryIcon(cat.icon)}
                      <Text
                        style={[
                          styles.categoryText,
                          activeCategory === cat.name &&
                            styles.activeCategoryText,
                        ]}
                      >
                        {cat.name}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
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
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  header: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    gap: 4,
  },
  greeting: {
    fontFamily: "EncodeSans-Regular",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
    color: "#787676",
  },
  name: {
    fontFamily: "EncodeSans-Bold",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
    color: "#121111",
  },
  searchRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#DFDEDE",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#292526",
    fontFamily: "EncodeSans-Regular",
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#292526",
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesScroll: {
    height: 34,
    marginBottom: 24,
  },
  categoriesContent: {
    paddingLeft: 16,
    paddingRight: 8,
    gap: 8,
  },
  categoryButton: {
    height: 34,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DFDEDE",
  },
  categoryContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  activeCategory: {
    backgroundColor: "#292526",
    borderWidth: 0,
  },
  categoryText: {
    color: "#292526",
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "EncodeSans-Medium",
  },
  activeCategoryText: {
    color: "#FFFFFF",
  },
  productList: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 16,
  },
});
