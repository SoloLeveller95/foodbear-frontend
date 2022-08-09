import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";

export default function Categories() {
	return (
		<ScrollView
			contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
			horizontal
			showsHorizontalScrollIndicator={false}
		>
			{/* CategoryCard */}
			<CategoryCard imgUrl="../assets/logo.png" title="Testing 1" />
			<CategoryCard imgUrl="../assets/logo.png" title="Testing 2" />
			<CategoryCard imgUrl="../assets/logo.png" title="Testing 3" />
			<CategoryCard imgUrl="../assets/logo.png" title="Testing 4" />
			<CategoryCard imgUrl="../assets/logo.png" title="Testing 5" />
			<CategoryCard imgUrl="../assets/logo.png" title="Testing 6" />
			<CategoryCard imgUrl="../assets/logo.png" title="Testing 7" />
		</ScrollView>
	);
}

const styles = StyleSheet.create({});
