import { ScrollView, StyleSheet, Text, View } from "react-native";
import RestaurantCard from "./RestaurantCard";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import client from "../sanity";
import axios from "axios";

interface FeaturedRowProps {
	title: string;
	description: string;
	id: string;
	type: string;
}

export default function FeaturedRow({
	id,
	title,
	description,
	type,
}: FeaturedRowProps) {
	const [restaurants, setRestaurants] = useState<any[]>([]);
	useEffect(() => {
		// client
		// 	.fetch(
		// 		`*[_type == "featured" && _id == $id] {
		// 				...,
		// 				restaurants[]->{
		// 					...,
		// 					dishes[]->,
		// 					type-> {
		// 						name
		// 						}
		// 					},
		// 				}[0]`,
		// 		{ id: id }
		// 	)
		// 	.then((data) => {
		// 		setRestaurants(data?.restaurants);
		// 	});

		axios
			.get(`http://10.0.2.2:3001/api/v1/dishes/${type}`)
			.then((res) => {
				setRestaurants(res.data);
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
		<View>
			<View style={styles.header}>
				<Text style={styles.headerText}>{title}</Text>
				<AntDesign name="arrowright" size={24} color="#D70F64" />
			</View>
			<Text style={styles.text}>{description}</Text>

			<ScrollView
				contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
				horizontal
				showsHorizontalScrollIndicator={false}
			>
				{/* Restaurant cards */}

				{restaurants?.map((restaurant) => (
					<RestaurantCard
						key={restaurant._id}
						id={restaurant._id}
						imgUrl={restaurant.image}
						address={restaurant.address}
						title={restaurant.name}
						dishes={restaurant.dishes}
						rating={restaurant.rating}
						short_description={restaurant.short_description}
						genre={restaurant.type?.name}
						long={restaurant.long}
						lat={restaurant.lat}
					/>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		marginTop: 14,
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
	},
	headerText: {
		fontWeight: "bold",
		fontSize: 18,
		lineHeight: 28,
	},
	text: {
		fontSize: 12,
		lineHeight: 16,
		color: "rgb(107, 114, 128)",
		paddingHorizontal: 16,
	},
});
