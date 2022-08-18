import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import {
	addToBasket,
	removeFromBasket,
	selectBasketItemsWithId,
} from "../features/basketSlice";

interface DishrowProps {
	id: string;
	name: string;
	description: string;
	price: number;
	image: any;
}

export default function Dishrow({
	id,
	name,
	description,
	price,
	image,
}: DishrowProps) {
	const [isPressed, setIsPressed] = useState<boolean>(false);
	const items = useSelector((state) => selectBasketItemsWithId(state, id));
	const dispatch = useDispatch();

	const addItemToBasket = () => {
		dispatch(addToBasket({ id, name, description, price, image }));
	};

	const removeItemFromBasket = () => {
		if (items.length <= 0) return;
		dispatch(removeFromBasket({ id }));
	};

	return (
		<>
			<TouchableOpacity
				onPress={() => setIsPressed(!isPressed)}
				style={{
					backgroundColor: "white",
					padding: 16,

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
							source={{ uri: urlFor(image).url() }}
						/>
					</View>
				</View>
			</TouchableOpacity>

			{isPressed && (
				<View
					style={{
						backgroundColor: "white",
						paddingHorizontal: 16,
						borderBottomWidth: 0.5,
						borderColor: "rgb(229, 231, 235)",
					}}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							paddingBottom: 12,
						}}
					>
						<TouchableOpacity
							disabled={!items.length}
							onPress={removeItemFromBasket}
						>
							<AntDesign
								name="minuscircle"
								size={24}
								color={items.length > 0 ? "#D70F64" : "gray"}
							/>
						</TouchableOpacity>

						<Text style={{ marginHorizontal: 8 }}>{items.length}</Text>

						<TouchableOpacity onPress={addItemToBasket}>
							<AntDesign name="pluscircle" size={24} color="#D70F64" />
						</TouchableOpacity>
					</View>
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({});
