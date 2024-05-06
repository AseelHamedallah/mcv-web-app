import { configureStore } from '@reduxjs/toolkit';
import filteredItemsReducer from './reducers/filteredItemsSlice';

const store = configureStore({
  reducer: {
    filteredItems: filteredItemsReducer,
  },
});

export default store;
