import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	FlatList,
	StyleSheet,
	Image,
} from "react-native";
// import { ChevronDown } from 'lucide-react-native';

export type AreaType = {
	id: string;
	name: string;
};

interface Props {
	selectedCategory: AreaType | null;
	onSelectCategory: (category: AreaType) => void;
	categories: AreaType[];
}

export default function AreaPicker({
	selectedCategory,
	onSelectCategory,
	categories,
}: Props) {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const renderCategory = ({ item }: { item: AreaType }) => (
		<TouchableOpacity
			style={styles.categoryItem}
			onPress={() => {
				onSelectCategory(item);
				setIsModalVisible(false);
			}}
		>
			<View style={styles.categoryInfo}>
				<Text style={styles.categoryName}>{item.name}</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<View>
			<TouchableOpacity
				style={styles.selector}
				onPress={() => setIsModalVisible(true)}
			>
				<View style={styles.selectorContent}>
					{selectedCategory ? (
						<>
							<Text style={styles.selectorText}>{selectedCategory.name}</Text>
						</>
					) : (
						<Text style={styles.placeholderText}>Select an area</Text>
					)}
				</View>
				{/* <ChevronDown size={20} color="#666" /> */}
			</TouchableOpacity>

			<Modal
				visible={isModalVisible}
				transparent={true}
				animationType="slide"
				onRequestClose={() => setIsModalVisible(false)}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Select Area</Text>
						<FlatList
							data={categories}
							renderItem={renderCategory}
							keyExtractor={(item) => item.id}
							showsVerticalScrollIndicator={false}
							contentContainerStyle={styles.listContent}
						/>
						<TouchableOpacity
							style={styles.closeButton}
							onPress={() => setIsModalVisible(false)}
						>
							<Text style={styles.closeButtonText}>Close</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	selector: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		padding: 12,
		backgroundColor: "#fff",
	},
	selectorContent: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	selectedImage: {
		width: 24,
		height: 24,
		borderRadius: 12,
		marginRight: 8,
	},
	selectorText: {
		fontSize: 16,
		color: "#333",
		flex: 1,
	},
	placeholderText: {
		fontSize: 16,
		color: "#999",
	},
	modalContainer: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: "#fff",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 20,
		maxHeight: "80%",
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 16,
		color: "#333",
	},
	listContent: {
		paddingBottom: 16,
	},
	categoryItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		borderRadius: 8,
		backgroundColor: "#f8f8f8",
		marginBottom: 8,
	},
	categoryImage: {
		width: 48,
		height: 48,
		borderRadius: 24,
		marginRight: 12,
	},
	categoryInfo: {
		flex: 1,
	},
	categoryName: {
		fontSize: 16,
		fontWeight: "600",
		color: "#333",
		marginBottom: 4,
	},
	categoryDescription: {
		fontSize: 14,
		color: "#666",
	},
	closeButton: {
		marginTop: 16,
		padding: 16,
		backgroundColor: "#f0f0f0",
		borderRadius: 8,
		alignItems: "center",
	},
	closeButtonText: {
		fontSize: 16,
		color: "#666",
		fontWeight: "600",
	},
});