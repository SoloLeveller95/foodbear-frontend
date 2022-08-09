import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import RestaurantCard from "./RestaurantCard";

interface FeaturedRowProps {
	title: string;
	description: string;
	id: string;
}

export default function FeaturedRow({ title, description }: FeaturedRowProps) {
	return (
		<View>
			<View style={styles.header}>
				<Text style={styles.headerText}>{title}</Text>
				<AntDesign name="arrowright" size={24} color="#00CCBB" />
			</View>
			<Text style={styles.text}>{description}</Text>

			<ScrollView
				contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
				horizontal
				showsHorizontalScrollIndicator={false}
			>
				{/* Restaurant cards */}
				<RestaurantCard
					id={123}
					imgUrl="../assets/sushi.jpg"
					title="Yo!Sushi"
					rating={4.5}
					genre="Japanese"
					address="123 Main St"
					short_description="This is a Test description"
					dishes={[]}
					long={20}
					lat={0}
				/>
				<RestaurantCard
					id={123}
					imgUrl="../assets/sushi.jpg"
					title="Yo!Sushi"
					rating={4.5}
					genre="Japanese"
					address="123 Main St"
					short_description="This is a Test description"
					dishes={[]}
					long={20}
					lat={0}
				/>
				<RestaurantCard
					id={123}
					imgUrl="../assets/sushi.jpg"
					title="Yo!Sushi"
					rating={4.5}
					genre="Japanese"
					address="123 Main St"
					short_description="This is a Test description"
					dishes={[]}
					long={20}
					lat={0}
				/>
				<RestaurantCard
					id={123}
					imgUrl="../assets/sushi.jpg"
					title="Yo!Sushi"
					rating={4.5}
					genre="Japanese"
					address="123 Main St"
					short_description="This is a Test description"
					dishes={[]}
					long={20}
					lat={0}
				/>
				<RestaurantCard
					id={123}
					imgUrl="../assets/sushi.jpg"
					title="Yo!Sushi"
					rating={4.5}
					genre="Japanese"
					address="123 Main St"
					short_description="This is a Test description"
					dishes={[]}
					long={20}
					lat={0}
				/>
				<RestaurantCard
					id={123}
					imgUrl="../assets/sushi.jpg"
					title="Yo!Sushi"
					rating={4.5}
					genre="Japanese"
					address="123 Main St"
					short_description="This is a Test description"
					dishes={[]}
					long={20}
					lat={0}
				/>
				<RestaurantCard
					id={123}
					imgUrl="../assets/sushi.jpg"
					title="Yo!Sushi"
					rating={4.5}
					genre="Japanese"
					address="123 Main St"
					short_description="This is a Test description"
					dishes={[]}
					long={20}
					lat={0}
				/>
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
