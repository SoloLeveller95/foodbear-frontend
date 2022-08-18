import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	Platform,
	StatusBar,
	Image,
	TextInput,
	ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
	MaterialCommunityIcons,
	Feather,
	FontAwesome5,
} from "@expo/vector-icons";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanity";
import Dishrow2 from "../components/Dishrow2";

export default function HomeScreen() {
	const [featuredCategories, setFeaturedCategories] = useState<any[]>([]);
	const [dishes, setDishes] = useState<any[]>([]);
	const [items, setItems] = useState(10);

	useEffect(() => {
		client
			.fetch(
				`*[_type == "featured"] {
  ...,
  restaurants[]->{
    ...,
    dishes[]->,
type-> {
  name
}
  }
}`
			)
			.then((data: any) => {
				setFeaturedCategories(data);
			});
	}, []);

	useEffect(() => {
		client
			.fetch(
				`*[_type == "dish"] {
name, price, short_description,image,_id
}[0...$items]`,
				{ items: items }
			)
			.then((data: any) => {
				setDishes(data);
			});
	}, []);
	return (
		<SafeAreaView style={styles.AndroidSafeArea}>
			{/* Header */}
			<View style={styles.headerTop}>
				<Image
					style={styles.logo}
					source={require("../assets/delivery3.png")}
				/>
				<View style={styles.leftHeaderTextContainer}>
					<Text style={styles.text1}>Deliver Now!</Text>
					<View style={styles.text2Container}>
						<Text style={styles.text2}>Current Location</Text>

						<MaterialCommunityIcons
							name="chevron-down"
							size={24}
							color="#D70F64"
						/>
					</View>
				</View>
				<MaterialCommunityIcons
					name="clipboard-list"
					size={35}
					color="#D70F64"
				/>
			</View>
			{/* Search */}
			<View style={styles.headerBottom}>
				<View style={styles.search}>
					<Feather name="search" size={20} color="gray" />
					<TextInput
						placeholder="Restaurant and cuisines"
						keyboardType="default"
					/>
				</View>
			</View>
			{/* Body */}
			<ScrollView>
				{/* Categories */}
				<Categories></Categories>

				{/* Featured rows */}

				{featuredCategories?.map((category) => (
					<FeaturedRow
						key={category._id}
						title={category.name}
						description={category.short_description}
						id={category._id}
					/>
				))}

				{dishes?.map((dish) => (
					<Dishrow2
						key={dish._id}
						id={dish._id}
						name={dish.name}
						description={dish.short_description}
						price={dish.price}
						image={dish.image}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	// SafeAreaView only works on IOS and this is the workaround for Android.
	AndroidSafeArea: {
		flex: 1,
		backgroundColor: "white",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	logo: {
		height: 50,
		width: 50,
		padding: 16,
		borderRadius: 9999,
	},
	headerTop: {
		flexDirection: "row",
		padding: 10,
		alignItems: "center",
		marginHorizontal: 16,
	},
	leftHeaderTextContainer: {
		marginLeft: 8,
		flex: 1,
	},
	text1: {
		fontWeight: "bold",
		color: "rgb(156, 163, 143)",
		fontSize: 12,
		lineHeight: 16,
	},
	text2Container: {
		flexDirection: "row",
		alignItems: "center",
	},

	text2: {
		fontWeight: "bold",
		fontSize: 20,
		lineHeight: 28,
	},
	headerBottom: {
		flexDirection: "row",
		alignItems: "center",
		paddingBottom: 8,
		paddingHorizontal: 8,
	},
	search: {
		flexDirection: "row",
		flex: 1,
		alignItems: "center",
		marginHorizontal: 8,

		padding: 6,
		backgroundColor: "rgb(229, 231, 235)",
		borderRadius: 5,
	},
});
