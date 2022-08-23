import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParam } from "../App";
import { RouteProp, useRoute } from "@react-navigation/native";
import client from "../sanity";
import Dishrow2 from "../components/Dishrow2";
import axios from "axios";

type Props = NativeStackScreenProps<RootStackParam, "Search">;

export default function SearchScreen() {
	const [food, setFood] = useState<any[]>([]);
	console.log(food[0]);
	// const { _id, image, name, price, short_description } = food[0];

	const {
		params: { text },
	} = useRoute<RouteProp<RootStackParam, "Search">>();
	useEffect(() => {
		axios
			.get(`http://10.0.2.2:3001/api/v1/dishes/${text}`)
			.then((res) => {
				setFood(res.data);
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
	}, []);

	return (
		<View style={styles.AndroidSafeArea}>
			{food.map((food) => (
				<Dishrow2
					key={food._id}
					name={food.name}
					description={food.short_description}
					price={food.price}
					imgUrl={food.image}
				/>
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
});
