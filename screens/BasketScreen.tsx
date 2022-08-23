import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	StatusBar,
	TouchableOpacity,
	Image,
	ScrollView,
	Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
	removeFromBasket,
	selectBasketItems,
	selectBasketTotal,
} from "../features/basketSlice";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import client from "../sanity";
import { RootStackParam } from "../App";
import axios from "axios";

export default function BasketScreen() {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
	const restaurant = useSelector(selectRestaurant);
	const items = useSelector(selectBasketItems);
	const [groupedItemsInBasket, setGroupedItemsInBasket] = useState<any[]>([]);
	const basketTotal = useSelector(selectBasketTotal);
	const dispatch = useDispatch();

	useEffect(() => {
		const groupedItems = items.reduce((results: any, item: any) => {
			(results[item.id] = results[item.id] || []).push(item);
			return results;
		}, {});

		console.log(groupedItems);
		setGroupedItemsInBasket(groupedItems);
	}, [items]);

	const createOrder = () => {
		axios
			.post("http://10.0.2.2:3001/api/v1/orders", items)
			.then((res) => console.log(res))
			.catch((err) => console.error(err));
	};

	return (
		<SafeAreaView style={styles.AndroidSafeArea}>
			<View style={{ flex: 1, backgroundColor: "rgb(243, 244, 246)" }}>
				<View
					style={{
						padding: 5,
						borderBottomWidth: 0.2,
						borderBottomColor: "#d70f64",
						backgroundColor: "white",
						elevation: 3,
					}}
				>
					<View>
						<Text
							style={{
								textAlign: "center",
								fontSize: 18,
								lineHeight: 28,
								// color: "white",
								fontWeight: "800",
							}}
						>
							Basket
						</Text>
						<Text
							style={{
								textAlign: "center",
								fontSize: 18,
								lineHeight: 28,
								color: "rgb(156, 163, 175)",
							}}
						>
							{restaurant.title}
						</Text>
					</View>
					<TouchableOpacity
						style={{ position: "absolute", top: 12, right: 20 }}
						onPress={navigation.goBack}
					>
						<AntDesign name="closecircle" size={28} color="#d70f64" />
					</TouchableOpacity>
				</View>

				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						paddingHorizontal: 16,
						paddingVertical: 12,
						marginVertical: 20,
						backgroundColor: "white",
					}}
				>
					<Image
						style={{
							height: 28,
							width: 28,
							padding: 16,
							borderRadius: 9999,
							backgroundColor: "gray",
							marginLeft: 10,
						}}
						source={require("../assets/logo.png")}
					/>
					<Text
						style={{
							marginLeft: 10,
							flex: 1,
						}}
					>
						Deliver in 50-75 min
					</Text>
					<TouchableOpacity>
						<Text style={{ color: "#d70f64", marginLeft: 10 }}>Change</Text>
					</TouchableOpacity>
				</View>

				<ScrollView>
					{Object.entries(groupedItemsInBasket).map(([key, items]) => (
						<View
							key={key}
							style={{
								flexDirection: "row",
								alignItems: "center",
								backgroundColor: "white",
								paddingVertical: 8,
								paddingHorizontal: 20,
							}}
						>
							<Text style={{ color: "#d70f64", marginRight: 10 }}>
								{items.length} x{" "}
							</Text>
							<Image
								source={{ uri: items[0]?.imageUrl }}
								style={{
									height: 48,
									width: 48,
									borderRadius: 9999,
									marginRight: 10,
								}}
							/>
							<Text style={{ flex: 1, marginRight: 10 }}>{items[0]?.name}</Text>
							<Text style={{ color: "rgb(156, 163, 175)", marginRight: 10 }}>
								<Currency quantity={items[0]?.price} currency="MYR" />
							</Text>

							<TouchableOpacity
								onPress={() => dispatch(removeFromBasket({ id: key }))}
							>
								<Text
									style={{
										color: "#d70f64",
										fontSize: 12,
										lineHeight: 16,
										marginLeft: 10,
									}}
								>
									Remove
								</Text>
							</TouchableOpacity>
						</View>
					))}
				</ScrollView>
				<View style={{ padding: 20, marginTop: 20, backgroundColor: "white" }}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginVertical: 12,
						}}
					>
						<Text style={{ color: "rgb(156, 163, 175)" }}>Subtotal</Text>
						<Text style={{ color: "rgb(156, 163, 175)" }}>
							<Currency quantity={basketTotal} currency="MYR" />
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginVertical: 12,
						}}
					>
						<Text style={{ color: "rgb(156, 163, 175)" }}>Delivery fee</Text>
						<Text style={{ color: "rgb(156, 163, 175)" }}>
							<Currency quantity={5.99} currency="MYR" />
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginVertical: 12,
						}}
					>
						<Text>Order Total</Text>
						<Text style={{ fontWeight: "800" }}>
							<Currency quantity={basketTotal + 5.99} currency="MYR" />
						</Text>
					</View>

					<TouchableOpacity
						disabled={!basketTotal}
						style={{
							borderRadius: 8,
							backgroundColor: basketTotal > 0 ? "#D70F64" : "gray",
							padding: 16,
						}}
						onPress={() => {
							createOrder();
							navigation.navigate("PreparingOrderScreen");
						}}
					>
						<Text
							style={{
								textAlign: "center",
								fontSize: 18,
								lineHeight: 28,
								color: "white",
								fontWeight: "800",
							}}
						>
							Place Order
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	// SafeAreaView only works on IOS and this is the workaround for Android.
	AndroidSafeArea: {
		flex: 1,
		backgroundColor: "white",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
});
