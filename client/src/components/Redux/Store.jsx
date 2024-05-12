import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./Session.jsx";
import pawReducer from './Paw';

export default configureStore({
    reducer: {
        session: sessionReducer,
        paw: pawReducer
    }
});