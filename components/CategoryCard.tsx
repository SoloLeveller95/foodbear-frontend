import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { urlFor } from "../sanity";

interface CategoryCardProps {
	imgUrl: string;
	title: string;
}

export default function CategoryCard({ imgUrl, title }: CategoryCardProps) {
	return (
		<TouchableOpacity style={styles.container}>
			<Image style={styles.image} source={{ uri: urlFor(imgUrl).url() }} />
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
	},
	image: {
		height: 80,
		width: 80,
		borderRadius: 15,
		marginRight: 6,
	},
	text: {
		position: "absolute",
		bottom: 4,
		left: 4,
		color: "white",
	},
});
