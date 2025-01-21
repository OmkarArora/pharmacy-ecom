import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";

const CartPageAfterLogin = () => {
  return (
    <ScrollView style={styles.container}>

      <View style={styles.cartHeader}>
        <Text style={styles.cartTitle}>MY CART</Text>
        <View style={styles.billSection}>
          <View style={styles.billAddress}>
            <Text style={styles.billTo}>Bill to --------</Text>
            <Text style={styles.billLocation}>Delhi 110001</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.addDetails}>ADD DETAILS</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.offerSection}>
          <Text style={styles.offerText}>'DELZERO' Applied</Text>
          <TouchableOpacity>
            <Text style={styles.removeOffer}>X</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cartDetails}>
        <Text style={styles.itemCount}>1 ITEM IN YOUR CART</Text>
        <View style={styles.item}>
          <Image
            source={{ uri: "https://example.com/product-image.png" }}
            style={styles.itemImage}
          />
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>
              Holland & Barrett Multivits & Iron for Fatigue, 120 Tablets
            </Text>
            <View style={styles.itemQuantity}>
              <TouchableOpacity>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>1</Text>
              <TouchableOpacity>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.itemPrice}>₹250</Text>
          </View>
        </View>

        {/* Last Minute Buys Section */}
        <Text style={styles.lastMinuteTitle}>LAST MINUTE BUYS</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.lastMinuteScroll}>
          {/* Example product cards */}
          <View style={styles.lastMinuteItem}>
            <Image
              source={{ uri: "https://example.com/last-minute-product1.png" }}
              style={styles.lastMinuteImage}
            />
            <Text style={styles.lastMinutePrice}>₹160</Text>
            <TouchableOpacity>
              <Text style={styles.addButton}>ADD</Text>
            </TouchableOpacity>
          </View>
          {/* Add more last-minute buy cards similarly */}
        </ScrollView>

        {/* Cart Breakdown */}
        <View style={styles.cartBreakdown}>
          <Text style={styles.breakdownTitle}>CART BREAKDOWN</Text>
          <View style={styles.breakdownRow}>
            <Text>Cart Total</Text>
            <Text>₹499.5</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text>Discount on MRP</Text>
            <Text>-₹249.5</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text>Coupon Discount</Text>
            <Text>₹0</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text>Handling & Packaging Fee</Text>
            <Text>₹6</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text>Platform Fee</Text>
            <Text>₹3</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text>Delivery Charges</Text>
            <Text>FREE</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>To Pay</Text>
            <Text>₹259</Text>
          </View>
          <View style={styles.savings}>
            <Text>You saved ₹354.50 on this order</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.addAddressButton}>
          <Text style={styles.addAddressText}>ADD ADDRESS</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cartHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#004080",
  },
  billSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  billAddress: {
    flex: 1,
  },
  billTo: {
    fontSize: 14,
    color: "#666",
  },
  billLocation: {
    fontSize: 14,
    color: "#666",
  },
  addDetails: {
    color: "#FF8C00",
    fontWeight: "bold",
  },
  offerSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#E6F9F7",
    padding: 8,
    borderRadius: 4,
  },
  offerText: {
    flex: 1,
    color: "#004080",
  },
  removeOffer: {
    color: "#FF8C00",
  },
  cartDetails: {
    padding: 16,
  },
  itemCount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    marginVertical: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: "#eee",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemQuantity: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  quantityButton: {
    padding: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF8C00",
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#004080",
  },
  lastMinuteTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 16,
  },
  lastMinuteScroll: {
    flexDirection: "row",
  },
  lastMinuteItem: {
    alignItems: "center",
    marginRight: 16,
  },
  lastMinuteImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: "#eee",
  },
  lastMinutePrice: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
  addButton: {
    color: "#FF8C00",
    fontWeight: "bold",
  },
  cartBreakdown: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 4,
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  savings: {
    marginTop: 16,
    padding: 8,
    backgroundColor: "#E6F9F7",
    borderRadius: 4,
    textAlign: "center",
  },
  addAddressButton: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#FF8C00",
    borderRadius: 4,
    alignItems: "center",
  },
  addAddressText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CartPageAfterLogin;
