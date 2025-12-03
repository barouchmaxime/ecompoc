import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
export interface CartSliceState {
  addedIds: number[]
  quantityById: {
    [key:number]: number;
  }
}

const initialState: CartSliceState = {
  addedIds: [],
  quantityById: {}
}

const addedIds = (state = initialState.addedIds, action: { productId: number; }) => {
  if (state.indexOf(action.productId) !== -1) {
    return state
  }
  return [...state, action.productId]
}

const quantityById = (state = initialState.quantityById, action: { productId: number; }) => {
  const { productId } = action
  return { ...state, [productId]: (state[productId] || 0) + 1 }
}
const updateAddedIdsAfterDecrementQty = (state = initialState, action: { productId: number; }) => {
  if (state.quantityById[action.productId] <= 1) {
    return [...state.addedIds.filter((id) => id !== action.productId)]
  }
  return state.addedIds;
}

const decrementQuantityById = (state = initialState.quantityById, action: { productId: number; }) => {
  const { productId } = action
  const newQuantityById = { ...state}
  if(newQuantityById[productId] <= 1) {
    delete newQuantityById[productId];
    return newQuantityById;
  }
  return { ...state, [productId]: state[productId] - 1 }
}

const deleteFromAddedIds = (state = initialState.addedIds, action: { productId: number; }) => {
  if (state.indexOf(action.productId) === -1) {
    return state
  }
  return [...state.filter((id) => id !== action.productId)]
}

const deleteFromQuantityById = (state = initialState.quantityById, action: { productId: number; }) => {
  const { productId } = action
  const newQuantityById = { ...state}
  delete newQuantityById[productId];
  return newQuantityById;
}


// If you are not using async thunks you can use the standalone `createSlice`.
export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    addToCart: create.reducer(
      (state, action: PayloadAction<{productId: number}>) => {
      return {
        addedIds: addedIds(state.addedIds, action.payload),
        quantityById: quantityById(state.quantityById, action.payload)
      }
    }),
    decrementToCart: create.reducer(
      (state, action: PayloadAction<{productId: number}>) => {
      return {
        addedIds: updateAddedIdsAfterDecrementQty(state, action.payload),
        quantityById: decrementQuantityById(state.quantityById, action.payload)
      }
    }),
    deleteToCart: create.reducer(
      (state, action: PayloadAction<{productId: number}>) => {
      return {
        addedIds: deleteFromAddedIds(state.addedIds, action.payload),
        quantityById: deleteFromQuantityById(state.quantityById, action.payload)
      }
    }),
    resetCart: create.reducer(
      () => {
        return {
          ...initialState,
        }
      }
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectAddedIds: state => state.addedIds,
    selectQuantityById: state => state.quantityById,
    /* selectProductC: createSelector([selectAddedIds, selectQuantityById], (a, b) => {
      // do something with a, b, and c, and return a result
      return a + b + c
    }) */
    selectProductCount: state => {
      const addedIds: number[] = state.addedIds ?? [];
      return addedIds.reduce(
        (total: number, id) =>
          total + state.quantityById[id],
        0
      );
    },
  }
})

// Action creators are generated for each case reducer function.
export const { addToCart, decrementToCart, deleteToCart, resetCart } = cartSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectAddedIds, selectQuantityById, selectProductCount } = cartSlice.selectors

