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
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import Dishrow2 from "../components/Dishrow2";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import client from "../sanity";
import { RootStackParam } from "../App";
import axios from "axios";

export default function HomeScreen() {
	const [featuredCategories, setFeaturedCategories] = useState<any[]>([]);
	const [dishes, setDishes] = useState<any[]>([]);
	const [text, onChangeText] = useState("");
	const [limit, setLimit] = useState(3);
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

	useEffect(() => {
		// client
		// 	.fetch(
		// 		`*[_type == "featured"] {
		//   ...,
		//   restaurants[]->{
		//     ...,
		//     dishes[]->,
		// type-> {
		//   name
		// }
		//   }
		// }`
		// 	)
		// 	.then((data: any) => {
		// 		// setFeaturedCategories(data);
		// 		console.log(data);
		// 	});

		axios
			.get("http://10.0.2.2:3001/api/v1/featureds")
			.then((res) => {
				console.log(res.data);
				setFeaturedCategories(res.data);
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

	useEffect(() => {
		// 		client
		// 			.fetch(
		// 				`*[_type == "dish"] {
		// name, price, short_description,image,_id
		// }[0...$items]`,
		// 				{ items: items }
		// 			)
		// 			.then((data: any) => {
		// 				setDishes(data);

		axios
			.get(`http://10.0.2.2:3001/api/v1/dishes?limit=${limit}`)
			.then((res) => {
				setDishes(res.data);
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
		// 			});
	}, [limit]);

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
				<TouchableOpacity onPress={() => navigation.navigate("Orders")}>
					<MaterialCommunityIcons
						name="clipboard-list"
						size={35}
						color="#D70F64"
					/>
				</TouchableOpacity>
			</View>
			{/* Search */}
			<View style={styles.headerBottom}>
				<View style={styles.search}>
					<Feather name="search" size={20} color="gray" />
					<TextInput
						placeholder="Indianfoodtest"
						keyboardType="default"
						onChangeText={onChangeText}
						onSubmitEditing={() => navigation.navigate("Search", { text })}
						returnKeyType="go"
						style={{ marginLeft: 10 }}
					/>
				</View>
			</View>
			{/* Body */}
			<ScrollView>
				{/* Categories */}
				<Categories></Categories>

				{/* Featured rows */}

				{featuredCategories?.map((featured) => (
					<FeaturedRow
						key={featured._id}
						title={featured.name}
						description={featured.short_description}
						id={featured._id}
						type={featured.type}
					/>
				))}

				{dishes?.map((dish) => (
					<Dishrow2
						key={dish._id}
						name={dish.name}
						description={dish.short_description}
						price={dish.price}
						imgUrl={dish.image}
					/>
				))}

				<TouchableOpacity
					style={{ justifyContent: "center", alignItems: "center" }}
					onPress={() => setLimit(limit + 5)}
				>
					<Text
						style={{
							color: "white",
							width: 100,
							fontSize: 16,
							lineHeight: 16,
							marginTop: 10,
							marginBottom: 40,
							paddingVertical: 10,
							backgroundColor: "#d70f64",
							textAlign: "center",
							justifyContent: "center",
							borderRadius: 10,
						}}
					>
						Load more
					</Text>
				</TouchableOpacity>
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
