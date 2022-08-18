import {
	Image,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParam } from "../App";

export default function LogoScreen() {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

	useEffect(() => {
		setTimeout(() => {
			navigation.navigate("Home");
		}, 5000);
	}, []);

	return (
		<TouchableOpacity onPress={() => navigation.navigate("Home")}>
			<Image
				style={{ height: "100%", width: "100%" }}
				source={require("../assets/Bear.png")}
			/>
		</TouchableOpacity>
	);
}
