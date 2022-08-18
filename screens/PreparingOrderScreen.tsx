import { Image, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParam } from "../App";

export default function PreparingOrderScreen() {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

	useEffect(() => {
		setTimeout(() => {
			navigation.navigate("DeliveryScreen");
		}, 4000);
	}, []);

	return (
		<View>
			<Image
				style={{ height: "100%", width: "100%" }}
				source={require("../assets/preparing.png")}
			/>
		</View>
	);
}
