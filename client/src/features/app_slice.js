import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const serverHost = "http://localhost:5000";

export const getUser = createAsyncThunk("user/getAllUser", async () => {
    const response = await axios.get(`${serverHost}/user`);
    return response.data;
});

export const addUser = createAsyncThunk("user/addUser", async ({ name, email, mobile, birthday, address }) => {
    const response = await axios
        .post(`${serverHost}/user`, {
            name,
            email,
            mobile,
            birthday,
            address,
        })
        .catch((error) => {
            console.log("error add User");
        });
    return await response.data;
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
    await axios.delete(`${serverHost}/user/${id}`);
    return id;
});

export const getUserbyId = createAsyncThunk("user/getById", async () => {
    const response = await axios.get(`${serverHost}/user`);
    return response.data;
});

export const updateUser = createAsyncThunk("user/updateUser", async ({ id, data }) => {
    const response = await axios
        .patch(`${serverHost}/user/${id}`, {
            data,
        })
        .then((res) => res.data)
        .catch((error) => console.log("gagal update user"));
    return await response.data;
});

const userEntity = createEntityAdapter({
    selectId: (user) => user.id,
});

const app_slice = createSlice({
    name: "app_slice",
    initialState: userEntity.getInitialState(),
    extraReducers: {
        [getUser.fulfilled]: (state, action) => {
            userEntity.setAll(state, action.payload);
        },
        [addUser.fulfilled]: (state, action) => {
            userEntity.addOne(state, action.payload);
        },
        [deleteUser.fulfilled]: (state, action) => {
            userEntity.removeOne(state, action.payload);
        },
        [updateUser.fulfilled]: (state, action) => {
            userEntity.updateOne(state, { id: action.id, updates: action.data });
        },
        [getUserbyId.fulfilled]: (state, action) => {
            userEntity.addOne(state, action.payload);
        },
    },
});
export const userSelector = userEntity.getSelectors((state) => state.app_slice);

export default app_slice.reducer;
