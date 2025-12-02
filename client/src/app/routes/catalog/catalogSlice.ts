import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface CatalogSliceState {
    searchText: string;
}

const initialState: CatalogSliceState = {
    searchText: "",
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const catalogSlice = createSlice({
  name: "catalog",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    setSearchText: create.reducer(
      (state, action: PayloadAction<{searchText: string}>) => {
      return {
        searchText: action.payload.searchText,
      }
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectSearchText: state => state.searchText,
  }
})

// Action creators are generated for each case reducer function.
export const { setSearchText } = catalogSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectSearchText} = catalogSlice.selectors

