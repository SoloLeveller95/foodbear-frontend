import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import client, { urlFor } from "../sanity";

export default function Categories() {
	const [categories, setCategories] = useState<any[]>([]);
	useEffect(() => {
		client
			.fetch(
				`*[_type == "category"] {
			...,
		}`
			)
			.then((data) => {
				setCategories(data);
			});
	}, []);
	return (
		<ScrollView
			contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
			horizontal
			showsHorizontalScrollIndicator={false}
		>
			{/* CategoryCard */}
			{categories.map((category) => (
				<CategoryCard
					key={category._id}
					imgUrl={category.image}
					title={category.name}
				/>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({});
