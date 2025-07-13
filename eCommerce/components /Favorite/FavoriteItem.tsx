import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FavoriteItemProps {
  item: {
    id: string;
    name: string;
    type: string;
    price: number;
    image: any;
  };
  onToggleFavorite: () => void;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ item, onToggleFavorite }) => {
  return (
    <View style={styles.favoriteItemContainer}>
      <View style={styles.favoriteItem}>
        <Image source={item.image} style={styles.favoriteImage} />
        <View style={styles.favoriteInfo}>
          <Text style={styles.favoriteName}>{item.name}</Text>
          <Text style={styles.favoriteType}>{item.type}</Text>
          <Text style={styles.favoritePrice}>${item.price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity onPress={onToggleFavorite} style={styles.favoriteButton}>
          <Ionicons name="heart" size={24} color="#FF5C5C" />
        </TouchableOpacity>
      </View>
      <View style={styles.favoriteItemShadow} />
    </View>
  );
};

export default FavoriteItem;

const styles = StyleSheet.create({
  favoriteItemContainer: {
    position: "relative",
    marginBottom: 16,
  },
  favoriteItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  favoriteItemShadow: {
    position: "absolute",
    backgroundColor: "#EAEAEA",
    borderRadius: 12,
    top: 2,
    left: 2,
    right: -2,
    bottom: -2,
    zIndex: -1,
  },
  favoriteImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: "#FAFAFA",
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#292526",
    marginBottom: 4,
  },
  favoriteType: {
    fontSize: 14,
    color: "#787676",
    marginBottom: 8,
  },
  favoritePrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#292526",
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 20,
    marginLeft: 8,
  },
});
