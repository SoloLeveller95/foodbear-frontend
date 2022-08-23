import {
	Platform,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";

import Dishrow2 from "../components/Dishrow2";
import axios from "axios";

export default function OrdersScreen() {
	// const [items] = useState<any[]>(useSelector(selectBasketItems));
	const [items, setItems] = useState<any[]>([]);

	useEffect(() => {
		axios
			.get("http://10.0.2.2:3001/api/v1/orders")
			.then((res) => {
				setItems(res.data);
			})
			.catch((err) => {
				if (err.response) {
					// client received an error response (5xx, 4xx)
				} else if (err.request) {
					// client never received a response, or request never left
				} else {
					// anything else
				}
			});
		//
	}, [items]);

	const deleteOrders = (_id: string) => {
		axios
			.delete(`http://10.0.2.2:3001/api/v1/orders/${_id}`)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.error(err));
	};

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
			<ScrollView>
				{items.map((item) => (
					<View key={item._id}>
						<Dishrow2
							key={item._id}
							name={item.name}
							description={item.description}
							price={item.price}
							imgUrl={item.imageUrl}
						/>
						<TouchableOpacity onPress={() => deleteOrders(item._id)}>
							<Text
								style={{
									color: "#d70f64",
									fontSize: 16,
									lineHeight: 16,
									marginTop: 20,
									marginLeft: 10,
									textAlign: "center",
								}}
							>
								Remove
							</Text>
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>
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
