import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParam } from "../App";
import { RouteProp, useRoute } from "@react-navigation/native";
import client from "../sanity";
import Dishrow2 from "../components/Dishrow2";

type Props = NativeStackScreenProps<RootStackParam, "Search">;

export default function SearchScreen() {
	const [food, setFood] = useState<any[]>([]);
	console.log(food[0]);
	// const { _id, image, name, price, short_description } = food[0];

	const {
		params: { text },
	} = useRoute<RouteProp<RootStackParam, "Search">>();
	useEffect(() => {
		client
			.fetch(
				`*[name == $food] {
name,price,short_description,image,_id
}`,
				{ food: text }
			)
			.then((data: any) => {
				setFood(data);
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
					image={food.image}
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
