import { Product } from "@/types/product";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onPress: () => void;
  onFavoritePress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onPress,
  onFavoritePress,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image source={product.image} style={styles.image} resizeMode="cover" />
        <Pressable
          style={styles.favoriteButton}
          onPress={onFavoritePress}
          hitSlop={10}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "#FF5C5C" : "#292526"}
          />
        </Pressable>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {product.name}
          </Text>
          <Text style={styles.type} numberOfLines={1} ellipsizeMode="tail">
            {product.type}
          </Text>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD33C" />
            <Text style={styles.rating}>5.0</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 163,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    padding: 12,
    minHeight: 78,
  },
  textContainer: {
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontFamily: "EncodeSans-SemiBold",
    fontWeight: "600",
    color: "#121111",
    lineHeight: 21,
    letterSpacing: 0,
    minHeight: 21,
  },
  type: {
    fontSize: 10,
    fontFamily: "EncodeSans-Regular",
    fontWeight: "400",
    color: "#787676",
    lineHeight: 15,
    marginTop: 4,
    minHeight: 15,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    fontFamily: "EncodeSans-SemiBold",
    fontWeight: "600",
    color: "#292526",
    lineHeight: 21,
    minHeight: 21,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 12,
    fontFamily: "EncodeSans-Regular",
    fontWeight: "400",
    color: "#292526",
    lineHeight: 18,
  },
});

export default ProductCard;
