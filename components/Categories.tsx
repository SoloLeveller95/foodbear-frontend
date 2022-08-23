import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import client, { urlFor } from "../sanity";
import axios from "axios";

export default function Categories() {
	const [categories, setCategories] = useState<any[]>([]);
	useEffect(() => {
		// client
		// 	.fetch(
		// 		`*[_type == "category"] {
		// 	...,
		// }`
		// 	)
		// 	.then((data) => {
		// 		setCategories(data);
		// 	});
		axios
			.get("http://10.0.2.2:3001/api/v1/categories")
			.then((res) => {
				// console.log(res.data);
				setCategories(res.data);
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
