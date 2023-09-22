import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { studentLogout } from './studentLogin';

export const groupEContent = createAsyncThunk(
  'groupEContent',
  async (groupId, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.get(
        `/groups/group-e-content?groupId=${groupId}`
      );

      return data;
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        if (error.response.data.message === 'مستخدم غير موثوق') {
          rejectWithValue(error.response.data.message);
          dispatch(studentLogout());
        } else {
          return rejectWithValue(error.response.data.message);
        }
      }
      return rejectWithValue(error.message);
    }
  }
);

export const downloadEContent = createAsyncThunk(
  'downloadEContent',
  async ({ groupId, teacherId, filename }, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.get(
        `groups/download-e-content?groupId=${groupId}&teacherId=${teacherId}&filename=${filename}`,
        {
          responseType: 'blob',
        }
      );
      return data;
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        if (error.response.data.message === 'مستخدم غير موثوق') {
          rejectWithValue(error.response.data.message);
          dispatch(studentLogout());
        } else {
          return rejectWithValue(error.response.data.message);
        }
      }
      return rejectWithValue(error.message);
    }
  }
);

const eContentSlice = createSlice({
  name: 'e-content',
  initialState: {
    groupContent: []
  },

  extraReducers: (builder) => {
    builder.addCase(groupEContent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(groupEContent.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.groupContent = action.payload;
    });
    builder.addCase(groupEContent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default eContentSlice.reducer;
