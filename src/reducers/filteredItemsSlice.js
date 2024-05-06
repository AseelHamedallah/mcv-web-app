import { createSlice } from '@reduxjs/toolkit';

const filteredItemsSlice = createSlice({
  name: 'filteredItems',
  initialState: [],
  reducers: {
    setFilteredItems(state, action) {
      return action.payload;
    },
  },
});

export const { setFilteredItems } = filteredItemsSlice.actions;

export default filteredItemsSlice.reducer;


