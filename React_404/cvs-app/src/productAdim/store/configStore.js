import { combineReducers, legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "./reduces/user";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root", // 로컬 스토리지에 저장되는 키
  storage,
};
const allReducers = combineReducers({
  user: userReducer,
});

//persistConfig에 따라 상태를 로컬 스토리지에 저장하고 관리.
const persistedReducer = persistReducer(persistConfig, allReducers);
const store = createStore(persistedReducer); // persistedReducer 이용해서 지속성 유지한다
const persistor = persistStore(store); //지속성 객체를 만든다.

export { store, persistor };
