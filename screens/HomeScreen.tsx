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
import React from "react";
import {
	MaterialCommunityIcons,
	Feather,
	FontAwesome5,
} from "@expo/vector-icons";

export default function HomeScreen() {
	return (
		<SafeAreaView style={styles.AndroidSafeArea}>
			{/* Header */}
			<View style={styles.headerTop}>
				<Image style={styles.logo} source={require("../assets/logo.png")} />
				<View style={styles.leftHeaderTextContainer}>
					<Text style={styles.text1}>Deliver Now!</Text>
					<View style={styles.text2Container}>
						<Text style={styles.text2}>Current Location</Text>

						<MaterialCommunityIcons
							name="chevron-down"
							size={24}
							color="#00CCBB"
						/>
					</View>
				</View>
				<Feather name="user" size={35} color="#00CCBB" />
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
				<Feather name="filter" size={24} color="#00CCBB" />
			</View>
			{/* Body */}
			<ScrollView>
				{/* Categories */}
				{/* Featured rows */}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	// SafeAreaView only works on IOS and this is the workaround for Android.
	AndroidSafeArea: {
		// flex: 1,
		backgroundColor: "white",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	logo: {
		height: 28,
		width: 28,
		padding: 16,
		borderRadius: 9999,
	},
	headerTop: {
		flexDirection: "row",
		paddingBottom: 3,
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
		marginRight: 8,

		padding: 6,
		backgroundColor: "rgb(229, 231, 235)",
		borderRadius: 5,
	},
});
