import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogoScreen from "./screens/LogoScreen";
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import BasketScreen from "./screens/BasketScreen";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import { store } from "./store";
import { Provider } from "react-redux";
import SearchScreen from "./screens/SearchScreen";
import OrdersScreen from "./screens/OrdersScreen";

export type RootStackParam = {
	Logo: any;
	Home: any;
	Basket: any;
	PreparingOrderScreen: any;
	DeliveryScreen: any;
	Restaurant: {
		id: any;
		imgUrl: any;
		title: string;
		rating: number;
		genre: string;
		address: string;
		short_description: string;
		dishes: any[];
		long: number;
		lat: number;
	};
	Search: {
		text: string;
	};
	Orders: any;
};
const Stack = createNativeStackNavigator<RootStackParam>();

export default function App() {
	return (
		<NavigationContainer>
			<Provider store={store}>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="Logo" component={LogoScreen} />
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Search" component={SearchScreen} />
					<Stack.Screen name="Orders" component={OrdersScreen} />
					<Stack.Screen name="Restaurant" component={RestaurantScreen} />
					<Stack.Screen
						options={{ presentation: "modal" }}
						name="Basket"
						component={BasketScreen}
					/>
					<Stack.Screen
						name="PreparingOrderScreen"
						component={PreparingOrderScreen}
						options={{ presentation: "fullScreenModal" }}
					/>
					<Stack.Screen
						name="DeliveryScreen"
						component={DeliveryScreen}
						options={{ presentation: "fullScreenModal" }}
					/>
				</Stack.Navigator>
			</Provider>
		</NavigationContainer>
	);
}
