import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
	items: any[];
}

const initialState: InitialState = {
	items: [],
};

export const basketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
		addToBasket: (state, action) => {
			state.items = [...state.items, action.payload];
		},
		removeFromBasket: (state, action) => {
			const index = state.items.findIndex(
				(item) => item.id === action.payload.id
			);

			let newBasket = [...state.items];
			if (index >= 0) {
				newBasket.splice(index, 1);
			} else {
				console.log(
					`Cant remove product (id : ${action.payload.id}) as its not in the basket!`
				);
			}

			state.items = newBasket;
		},
	},
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectBasketItems = (state: any) => state.basket.items;

export const selectBasketItemsWithId = (state: any, id: any) =>
	state.basket.items.filter((item: any) => item.id === id);

export const selectBasketTotal = (state: any) =>
	state.basket.items.reduce(
		(total: any, item: any) => (total += item.price),
		0
	);

export default basketSlice.reducer;
