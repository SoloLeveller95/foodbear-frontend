import { Image, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParam } from "../App";

export default function DeliveryScreen() {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

	useEffect(() => {
		setTimeout(() => {
			navigation.navigate("Home");
		}, 5000);
	}, []);

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Image
				style={{ height: "100%", width: "100%", paddingHorizontal: 100 }}
				source={require("../assets/delivery7.png")}
			/>
		</View>
	);
}
