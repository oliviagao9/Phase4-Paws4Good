import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./Session.jsx";

export default configureStore({
    reducer: {
        session: sessionReducer
    }
});