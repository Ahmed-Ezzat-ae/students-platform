import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllTeachers = createAsyncThunk(
  'getAllTeachers',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get('/teachers');
      return data;
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        if (error.response.data.message === 'لا يوجد معلمين حتى الان') {
          rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.response.data.message);
        }
      }
      return rejectWithValue(error.message);
    }
  }
);

const teacherSlice = createSlice({
  name: 'teachers',
  initialState: {
    teachers: []
  },

  extraReducers: (builder) => {
    builder.addCase(getAllTeachers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllTeachers.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.teachers = action.payload;
    });
    builder.addCase(getAllTeachers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default teacherSlice.reducer;
