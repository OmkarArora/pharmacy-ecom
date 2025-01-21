import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const CartPageBeforeLogin: React.FC = () => {
  const cartItems = [
    {
      id: 1,
      name: 'OZiva Apple Cider Vinegar Fizzy Drink, 6 Sachets (6x4 gm)',
      price: '₹99',
      image: 'https://via.placeholder.com/100',
    },
  ];

  const lastMinuteBuys = [
    {
      id: 1,
      name: 'Apollo Life Anti-Bac Wet Wipes, 60 Count (2x30)',
      price: '₹160',
      discountedPrice: '',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      name: 'Apollo Pharmacy Premium Lemon Grass Oil',
      price: '₹160',
      discountedPrice: '₹100',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 3,
      name: 'Apollo Life Cough Drops Lozenges, 300 Count',
      price: '₹300',
      discountedPrice: '',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 4,
      name: 'Apollo Life Hand Sanitizer Liquid Spray, 100 ML',
      price: '₹150',
      discountedPrice: '₹135',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 5,
      name: 'Apollo Pharmacy SPF 40 PA+++ Sunscreen',
      price: '₹200',
      discountedPrice: '₹180',
      image: 'https://via.placeholder.com/100',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* My Cart Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Cart</Text>
        <TouchableOpacity style={styles.addAddressButton}>
          <Text style={styles.addAddressText}>
            Add address to unlock extra discounts and best offers.
          </Text>
        </TouchableOpacity>
      </View>

      {/* Cart Items Section */}
      <View style={styles.section}>
        <Text style={styles.subTitle}>1 ITEM IN YOUR CART</Text>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.cartItemImage} />
            <View style={styles.cartItemDetails}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton}>
                  <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>1</Text>
                <TouchableOpacity style={styles.quantityButton}>
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.cartItemPrice}>{item.price}</Text>
          </View>
        ))}
      </View>

      {/* Last Minute Buys Section */}
      <View style={styles.section}>
        <Text style={styles.subTitle}>Last Minute Buys</Text>
        <FlatList
          horizontal
          data={lastMinuteBuys}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.lastMinuteBuyItem}>
              <Image source={{ uri: item.image }} style={styles.lastMinuteBuyImage} />
              <Text style={styles.lastMinuteBuyName}>{item.name}</Text>
              <Text style={styles.lastMinuteBuyPrice}>
                {item.discountedPrice ? (
                  <>
                    <Text style={styles.strikedPrice}>{item.price}</Text>{' '}
                    <Text style={styles.discountedPrice}>{item.discountedPrice}</Text>
                  </>
                ) : (
                  item.price
                )}
              </Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>ADD</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Offers & Discounts and Cart Breakdown */}
      <View style={styles.cartSummarySection}>
        <View style={styles.offersSection}>
          <Text style={styles.subTitle}>Offers & Discounts</Text>
          <TouchableOpacity style={styles.applyCouponButton}>
            <Text style={styles.applyCouponText}>Apply Coupon</Text>
            <Text style={styles.loginText}>Login to apply coupons</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.breakdownSection}>
          <Text style={styles.subTitle}>Cart Breakdown</Text>
          <View style={styles.breakdownRow}>
            <Text>Cart Total</Text>
            <Text>₹99</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text>Delivery Charges</Text>
            <Text style={styles.loginText}>+ Login to view charges</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.totalText}>To Pay</Text>
            <Text style={styles.totalText}>₹99</Text>
          </View>
        </View>
      </View>

      {/* Proceed Button */}
      <View style={styles.proceedSection}>
        <Text style={styles.amountToPay}>Amount to Pay</Text>
        <Text style={styles.totalText}>₹99</Text>
        <TouchableOpacity style={styles.proceedButton}>
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8', padding: 10 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  subTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  addAddressButton: { backgroundColor: '#fff', padding: 10, borderRadius: 5 },
  addAddressText: { fontSize: 14, color: '#ff9800' },
  cartItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 10 },
  cartItemImage: { width: 50, height: 50, marginRight: 10 },
  cartItemDetails: { flex: 1 },
  cartItemName: { fontSize: 14, marginBottom: 10 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: { padding: 5, borderWidth: 1, borderColor: '#ccc', borderRadius: 3, marginHorizontal: 5 },
  quantityText: { fontSize: 14 },
  cartItemPrice: { fontSize: 16, fontWeight: 'bold' },
  lastMinuteBuyItem: { width: 120, backgroundColor: '#fff', padding: 10, marginRight: 10, borderRadius: 5, alignItems: 'center' },
  lastMinuteBuyImage: { width: 80, height: 80, marginBottom: 10 },
  lastMinuteBuyName: { fontSize: 12, textAlign: 'center', marginBottom: 5 },
  lastMinuteBuyPrice: { fontSize: 14, marginBottom: 5 },
  strikedPrice: { textDecorationLine: 'line-through', color: '#888' },
  discountedPrice: { fontWeight: 'bold', color: '#4caf50' },
  addButton: { backgroundColor: '#004d40', padding: 5, borderRadius: 5 },
  addButtonText: { color: '#fff', fontSize: 12 },
  cartSummarySection: { flexDirection: 'row', justifyContent: 'space-between' },
  offersSection: { width: '48%', backgroundColor: '#fff', padding: 10, borderRadius: 5 },
  applyCouponButton: { marginTop: 10 },
  applyCouponText: { fontSize: 14, color: '#4caf50', marginBottom: 5 },
  loginText: { fontSize: 12, color: '#ff5722' },
  breakdownSection: { width: '48%', backgroundColor: '#fff', padding: 10, borderRadius: 5 },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  totalText: { fontSize: 16, fontWeight: 'bold' },
  proceedSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  amountToPay: { fontSize: 16 },
  proceedButton: { backgroundColor: '#004d40', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  proceedButtonText: { color: '#fff', fontSize: 16 },
});

export default CartPageBeforeLogin;
