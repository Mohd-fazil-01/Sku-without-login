import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create user
export const createUser = createAsyncThunk(
  "users/create",
  async (userData) => {
    const res = await axios.post("http://localhost:7000/api/users", userData);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
  },
});

export default userSlice.reducer;
