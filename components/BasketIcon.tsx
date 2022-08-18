import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import Currency from "react-currency-formatter";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParam } from "../App";

const BasketIcon = () => {
	const items = useSelector(selectBasketItems);
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
	const basketTotal = useSelector(selectBasketTotal);

	console.log(items.length);
	return (
		<>
			{items.length > 0 && (
				<View
					style={{
						position: "absolute",
						bottom: 30,
						width: "100%",
						zIndex: 50,
					}}
				>
					<TouchableOpacity
						style={{
							backgroundColor: "#D70F64",
							padding: 16,
							borderRadius: 8,
							flexDirection: "row",
							alignItems: "center",
							marginHorizontal: 20,
						}}
						onPress={() => navigation.navigate("Basket")}
					>
						<Text
							style={{
								fontSize: 18,
								lineHeight: 28,
								color: "white",
								fontWeight: "800",
								paddingVertical: 4,
								paddingHorizontal: 8,
								backgroundColor: "#f790bc",
								borderRadius: 4,
							}}
						>
							{items.length}
						</Text>
						<Text
							style={{
								flex: 1,
								textAlign: "center",
								fontSize: 18,
								lineHeight: 28,
								color: "white",
								fontWeight: "800",
							}}
						>
							View Basket
						</Text>
						<Text
							style={{
								fontSize: 18,
								lineHeight: 28,
								color: "white",
								fontWeight: "800",
							}}
						>
							<Currency quantity={basketTotal} currency="MYR" />
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</>
	);
};

export default BasketIcon;
