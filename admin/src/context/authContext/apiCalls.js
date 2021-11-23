import axios from "axios";
import { loginStart, loginFailure, loginSuccess, logout } from "./authAction";

export const login = async (user, dispatch) => {
    dispatch(loginStart());

    try {
        const res = await axios.post("/auth/login", user);
        res.data.isAdmin && dispatch(loginSuccess(res.data));
        if (!res.data.isAdmin) {
            dispatch(loginFailure({ response: { data: "Admin Only can access" } }));
        }
    } catch (error) {
        dispatch(loginFailure(error))
    }
};

export const logOut = async (dispatch) => {
    dispatch(logout());
};