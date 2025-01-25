import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";

const { width: screenWidth } = Dimensions.get("window");

const Walkthrough = ({ navigation }: { navigation: any }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Buy medicines online",
      description: "Choose and buy the necessary drugs without visiting a pharmacy.",
      image: require("./assets/image1.png"), // Replace with your image path
    },
    {
      id: 2,
      title: "Everything at one place",
      description:
        "Telemedicine, online pharmacy and much more at one place.",
      image: require("./assets/image2.png"), // Replace with your image path
    },
    {
      id: 3,
      title: "Fast Delivery",
      description:
        "We will deliver your order to your doorstep as soon as possible.",
      image: require("./assets/image3.png"), // Replace with your image path
    },
  ];

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={slides}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={(index: React.SetStateAction<number>) => setActiveSlide(index)}
      />
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeSlide === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        {activeSlide < slides.length - 1 ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setActiveSlide(activeSlide + 1)}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace("Home")} // Replace with your home screen
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  slide: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: screenWidth * 0.7,
    height: screenWidth * 0.7,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#007AFF",
  },
  buttonContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Walkthrough;
