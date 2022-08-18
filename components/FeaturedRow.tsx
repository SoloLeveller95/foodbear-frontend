import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import RestaurantCard from "./RestaurantCard";
import client from "../sanity";

interface FeaturedRowProps {
	title: string;
	description: string;
	id: string;
}

export default function FeaturedRow({
	id,
	title,
	description,
}: FeaturedRowProps) {
	const [restaurants, setRestaurants] = useState<any[]>([]);
	useEffect(() => {
		client
			.fetch(
				`*[_type == "featured" && _id == $id] {
  					...,
  					restaurants[]->{
    					...,
    					dishes[]->,
						type-> {
  							name
							}
  						},
					}[0]`,
				{ id: id }
			)
			.then((data) => {
				setRestaurants(data?.restaurants);
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
