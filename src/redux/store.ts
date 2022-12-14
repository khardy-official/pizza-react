import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './reducers/homeSlice';
import cartReducer from './reducers/cartSlice';
import pizzaReducer from './reducers/pizzaSlice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;