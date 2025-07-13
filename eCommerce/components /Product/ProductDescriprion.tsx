import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import useCartStore from "../../store/cartStore";

interface ProductDescriptionProps {
  product: {
    name: string;
    image: any;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewsCount: number;
    description: string;
  };
  onBackPress: () => void;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  product,
  onBackPress,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    addToCart({
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
      color: selectedColor ?? undefined,
      size: selectedSize ?? undefined,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={product.image} style={styles.image} />
          <Pressable style={styles.backButton} onPress={onBackPress}>
            <Ionicons name="arrow-back" size={20} color="#121111" />
          </Pressable>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.title}>{product.name}</Text>

          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>
              {product.rating.toFixed(1)} (
              {product.reviewsCount.toLocaleString()} reviews)
            </Text>
          </View>

          <Text style={styles.description}>
            {product.description}
            <Text style={styles.readMore}> Read More...</Text>
          </Text>

          <View style={styles.quantityContainer}>
            <Pressable onPress={decreaseQuantity} style={styles.quantityButton}>
              <Ionicons name="remove" size={16} color="#121111" />
            </Pressable>
            <Text style={styles.quantityText}>{quantity}</Text>
            <Pressable onPress={increaseQuantity} style={styles.quantityButton}>
              <Ionicons name="add" size={16} color="#121111" />
            </Pressable>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.optionsContainer}>
          <View style={styles.sizeSection}>
            <Text style={styles.sectionTitle}>Choose Size</Text>
            <View style={styles.sizeOptions}>
              {["S", "M", "L", "XL"].map((size) => (
                <Pressable
                  key={size}
                  style={[
                    styles.sizeOption,
                    selectedSize === size && styles.selectedSizeOption,
                  ]}
                  onPress={() => handleSizeSelect(size)}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.selectedSizeText,
                    ]}
                  >
                    {size}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.colorSection}>
            <Text style={styles.sectionTitle}>Color</Text>
            <View style={styles.colorOptions}>
              {["#787676", "#433F40", "#121111"].map((color) => (
                <Pressable
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedColorOption,
                  ]}
                  onPress={() => handleColorSelect(color)}
                />
              ))}
            </View>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>${product.price.toFixed(2)}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>
              ${product.originalPrice.toFixed(2)}
            </Text>
          )}
        </View>

        <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>
            Add to Cart | ${product.price.toFixed(2)}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: 375,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  detailContainer: {
    width: 327,
    marginTop: 24,
    marginHorizontal: 24,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "EncodeSans-SemiBold",
    color: "#121111",
    lineHeight: 31.2,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: "EncodeSans-Regular",
    color: "#5D8BF4",
    lineHeight: 14.4,
  },
  description: {
    width: "100%",
    fontSize: 12,
    fontFamily: "EncodeSans-Regular",
    color: "#787676",
    lineHeight: 18,
  },
  readMore: {
    color: "#121111",
    fontWeight: "600",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 95,
    height: 32,
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#DFDEDE",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#121111",
  },
  divider: {
    width: 327,
    height: 1,
    backgroundColor: "#F6F6F6",
    marginVertical: 24,
    marginHorizontal: 24,
  },
  optionsContainer: {
    width: 327,
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sizeSection: {
    width: 128,
    gap: 8,
  },
  colorSection: {
    width: 94,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "EncodeSans-Bold",
    fontWeight: "700",
    color: "#121111",
    lineHeight: 18,
  },
  sizeOptions: {
    flexDirection: "row",
    gap: 8,
  },
  sizeOption: {
    width: 26,
    height: 26,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#DFDEDE",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedSizeOption: {
    borderColor: "#292526",
    backgroundColor: "#292526",
  },
  sizeText: {
    fontSize: 12,
    fontFamily: "EncodeSans-Regular",
    fontWeight: "400",
    color: "#787676",
  },
  selectedSizeText: {
    color: "#FFFFFF",
  },
  colorOptions: {
    flexDirection: "row",
    gap: 8,
  },
  colorOption: {
    width: 26,
    height: 26,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#FDFDFD",
  },
  selectedColorOption: {
    borderColor: "#292526",
    borderWidth: 2,
  },
  priceContainer: {
    width: 327,
    marginTop: 24,
    marginHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#121111",
  },
  originalPrice: {
    fontSize: 16,
    color: "#787676",
    textDecorationLine: "line-through",
  },
  addToCartButton: {
    width: 327,
    height: 60,
    backgroundColor: "#121111",
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 30,
  },
  addToCartText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "EncodeSans-Bold",
    fontWeight: "700",
    lineHeight: 19.6,
  },
});

export default ProductDescription;
