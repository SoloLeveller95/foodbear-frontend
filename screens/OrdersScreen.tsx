import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../features/basketSlice";
import Dishrow2 from "../components/Dishrow2";

export default function OrdersScreen() {
	// const [items] = useState<any[]>(useSelector(selectBasketItems));
	const [items, setItems] = useState<any[]>([]);

	if (items.length === 0) {
		return (
			<View style={styles.noOrdersMadeContainer}>
				<Text style={styles.noOrdersMadeText}>No orders Made :( </Text>
			</View>
		);
	}
	return (
		<View style={styles.AndroidSafeArea}>
			<View style={styles.OrdersMadeContainer}>
				<Text style={styles.OrdersMadeText}>Your Orders</Text>
			</View>
			{items.map((item) => (
				<View key={item._id}>
					<Dishrow2
						key={item._id}
						name={item.name}
						description={item.short_description}
						price={item.price}
						imgUrl={item.image}
					/>
				</View>
			))}
			<View
				style={{
					borderTopWidth: 1,
					borderColor: "rgb(229, 231, 235)",
					marginTop: 15,
				}}
			></View>
		</View>
	);
}

const styles = StyleSheet.create({
	// SafeAreaView only works on IOS and this is the workaround for Android.
	AndroidSafeArea: {
		flex: 1,
		backgroundColor: "white",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	noOrdersMadeContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	noOrdersMadeText: {
		fontSize: 32,
		fontWeight: "bold",
	},
	OrdersMadeContainer: {
		marginVertical: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	OrdersMadeText: {
		fontSize: 24,
		fontWeight: "bold",
	},
});
