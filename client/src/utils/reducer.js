import { useReducer } from "react";
import { LOAD_HOUSE, SHOW_MODAL_EXAMPLE } from "./actions";

export const reducer = (state, action) => {
	switch (action.type) {
		case SHOW_MODAL_EXAMPLE:
			return {
				...state,
				setModalExample: !state.setModalExample,
			};

		case LOAD_HOUSE:
			return {
				...state,
				house: action.house,
			};

		default:
			return state;
	}
};

export function useGlobalReducer(initialState) {
	return useReducer(reducer, initialState);
}
