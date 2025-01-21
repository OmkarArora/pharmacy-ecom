import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const products = [
  {
    id: 1,
    name: "mCaffeine Milky Brew Face Scrub",
    description: "Removes blackheads, helps in skin brightening.",
    image: "https://m.media-amazon.com/images/I/71Zyf52C98L._SL1500_.jpg",
    price: 160,
    oldPrice: 229,
    discount: "30% off",
    ratings: 4.5,
    reviews: 104,
    recentlyBought: 395,
  },
  {
    id: 2,
    name: "CeraVe Moisturising Lotion",
    description: "For dry to very dry skin.",
    image: "https://m.media-amazon.com/images/I/71iFKNFgyyL._SL1500_.jpg",
    price: 494,
    oldPrice: 520,
    discount: "5% off",
    ratings: 4.4,
    reviews: 33,
    recentlyBought: 210,
  },
];

type ProductListProps = {
  onProductSelect: (product: any) => void;
};

const ProductList: React.FC<ProductListProps> = ({ onProductSelect }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onProductSelect(item)}>
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>₹{item.price}</Text>
                <Text style={styles.discount}>{item.discount}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 8,
    resizeMode: "cover",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 2,
  },
  discount: {
    fontSize: 12,
    color: "#FF5733",
  },
});

export default ProductList;
