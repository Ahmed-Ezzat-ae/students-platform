import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContent = createAsyncThunk(
  'fetchContent',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get('/content');
      return data;
    } catch (error) {
   
      if (error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    content: {}
  },

  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.loading = false;
      state.content = action.payload;
    });
    builder.addCase(fetchContent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default contentSlice.reducer;
