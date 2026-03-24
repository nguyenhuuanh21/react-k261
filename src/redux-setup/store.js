import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart";
import authReducer from "./reducers/auth";
import { persistReducer,persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
    key: 'vietpro',
    storage:storage
}
const persistedCartReducer = persistReducer(persistConfig,cartReducer);
const persistedAuthReducer = persistReducer(persistConfig,authReducer);
const store = configureStore({
    reducer: {
        cart:persistedCartReducer,
        auth:persistedAuthReducer
    }
});
export default store;
export const persistor = persistStore(store);