import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { RootStackParam } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface RestaurantCardProps {
	id: number;
	imgUrl: string;
	title: string;
	rating: number;
	genre: string;
	address: string;
	short_description: string;
	dishes: [];
	long: number;
	lat: number;
}

export default function RestaurantCard({
	id,
	imgUrl,
	title,
	rating,
	genre,
	address,
	short_description,
	dishes,
	long,
	lat,
}: RestaurantCardProps) {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => {
				navigation.navigate("Restaurant", {
					id,
					imgUrl,
					title,
					rating,
					genre,
					address,
					short_description,
					dishes,
					long,
					lat,
				});
			}}
		>
			<Image style={styles.image} source={{ uri: imgUrl }} />
			<View style={styles.containerText}>
				<Text style={styles.text}>{title}</Text>
				<View style={styles.row}>
					<AntDesign name="star" size={16} color="#D70F64" />
					<Text style={styles.ratingText}>
						<Text>{rating}</Text> . {genre}
					</Text>
				</View>
				<View style={styles.row}>
					<Entypo name="location" size={16} color="rgb(107, 114, 128)" />
					<Text style={styles.ratingText}>
						{" "}
						{lat} {long} . {address}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		elevation: 2,
		backgroundColor: "white",
		marginVertical: 5,
		borderRadius: 5,
		marginRight: 12,
	},
	image: {
		height: 144,
		width: 256,
		// borderRadiusTop: 5,
		borderTopRightRadius: 5,
		borderTopLeftRadius: 5,
	},
	containerText: {
		paddingHorizontal: 12,
		paddingBottom: 16,
		paddingTop: 8,
	},
	text: {
		fontWeight: "bold",
		fontSize: 18,
		lineHeight: 28,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
	},
	ratingText: {
		fontSize: 12,
		lineHeight: 16,
		color: "rgb(107, 114, 128)",
		marginLeft: 4,
	},
});
