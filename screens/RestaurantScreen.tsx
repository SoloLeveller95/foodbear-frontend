import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Dishrow from "../components/Dishrow";
import BasketIcon from "../components/BasketIcon";
import { AntDesign, Entypo } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";
import { RootStackParam } from "../App";
import { urlFor } from "../sanity";

type Props = NativeStackScreenProps<RootStackParam, "Restaurant">;

const RestaurantScreen: React.FC<Props> = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const {
		params: {
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
		},
	} = useRoute<RouteProp<RootStackParam, "Restaurant">>();

	useEffect(() => {
		dispatch(
			setRestaurant({
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
			})
		);
	}, []);

	return (
		<>
			<BasketIcon />
			<ScrollView>
				<View>
					<Image style={styles.headerImage} source={{ uri: imgUrl }} />
					<TouchableOpacity
						style={styles.backArrow}
						onPress={navigation.goBack}
					>
						<AntDesign name="arrowleft" size={20} color="#D70F64" />
					</TouchableOpacity>
				</View>
				<View style={styles.descriptionContainer}>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>{title}</Text>
						<View style={styles.row}>
							<AntDesign name="star" size={16} color="#D70F64" />
							<Text style={styles.ratingText}>
								<Text>{rating}</Text> . {genre}
							</Text>
							<View style={styles.row}>
								<Entypo name="location" size={16} color="rgb(107, 114, 128)" />
								<Text style={styles.ratingText}>
									{" "}
									{lat} {long} . {address}
								</Text>
							</View>
						</View>
						<Text style={styles.shortDescription}>{short_description}</Text>
					</View>
				</View>
				<View style={{ paddingBottom: 120 }}>
					<Text style={styles.titleMenu}>Menu</Text>
					{dishes.map((dish) => (
						<Dishrow
							key={dish._id}
							id={dish._id}
							name={dish.name}
							description={dish.short_description}
							price={dish.price}
							imageUrl={dish.image}
							type={dish._type}
						/>
					))}
				</View>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 4,
	},
	container: {
		position: "relative",
	},
	descriptionContainer: {
		backgroundColor: "white",
	},
	titleContainer: {
		paddingHorizontal: 16,
		paddingTop: 16,
	},
	title: {
		fontSize: 30,
		lineHeight: 36,
		fontWeight: "bold",
	},
	headerImage: {
		width: "100%",
		height: 224,
		padding: 16,
	},
	backArrow: {
		position: "absolute",
		top: 56,
		left: 20,
		backgroundColor: "rgb(243, 244, 246)",
		borderRadius: 9999,
		padding: 8,
	},
	ratingText: {
		fontSize: 12,
		lineHeight: 16,
		color: "rgb(107, 114, 128)",
		marginLeft: 4,
	},
	shortDescription: {
		color: "rgb(107, 114, 128)",
		marginTop: 8,
		paddingBottom: 16,
	},
	titleMenu: {
		paddingHorizontal: 16,
		paddingTop: 24,
		marginBottom: 12,
		fontWeight: "bold",
		fontSize: 20,
		lineHeight: 28,
	},
});

export default RestaurantScreen;
