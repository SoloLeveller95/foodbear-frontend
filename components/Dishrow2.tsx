import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

interface Dishrow2Props {
	name: string;
	description: string;
	price: number;
	imgUrl: any;
}

export default function Dishrow2({
	name,
	description,
	price,
	imgUrl,
}: Dishrow2Props) {
	return (
		<>
			<TouchableOpacity
				style={{
					backgroundColor: "white",
					padding: 16,
					marginTop: 12,
					borderTopWidth: 1,
					borderColor: "rgb(229, 231, 235)",
				}}
			>
				<View style={{ flexDirection: "row" }}>
					<View style={{ flex: 1, paddingRight: 8 }}>
						<Text style={{ fontSize: 18, lineHeight: 28 }}>{name}</Text>
						<Text style={{ color: "rgb(156, 163, 175)" }}>{description}</Text>
						<Text style={{ color: "rgb(156, 163, 175)", marginTop: 8 }}>
							<Currency quantity={price} currency="MYR" />
						</Text>
					</View>

					<View>
						<Image
							style={{
								borderRadius: 10,
								height: 80,
								width: 80,
								padding: 16,
							}}
							source={{ uri: imgUrl }}
						/>
					</View>
				</View>
			</TouchableOpacity>
		</>
	);
}
