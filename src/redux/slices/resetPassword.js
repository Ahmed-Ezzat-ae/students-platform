import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const resetPassword = createAsyncThunk(
  'resetPassword',
  async (resetData, thunkAPI) => {
    const {  rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.put('/students/reset-password', resetData);
      return data;
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

const resetPasswordSlice = createSlice({
  name: 'reset-password',
  initialState: {},

  extraReducers: (builder) => {
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default resetPasswordSlice.reducer;
