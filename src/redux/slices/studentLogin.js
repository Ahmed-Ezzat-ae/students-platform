import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const studentLogin = createAsyncThunk(
  'studentLogin',
  async (info, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post('/students/login', info);

      return {
        message: data.message,
        student: data.data,
        token: data.token,
      };
    } catch (error) {

      if (error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const loginSlice = createSlice({
  name: 'student',
  initialState: {
    studentData: JSON.parse(localStorage.getItem('studentData')) || {},
  },

  reducers: {
    studentLogout: () => {
      localStorage.removeItem('studentData');
    },
    resetLogin: () => {
      return {};
    },
  },

  extraReducers: (builder) => {
    builder.addCase(studentLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(studentLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      state.studentData = action.payload.student;
      localStorage.setItem(
        'studentData',
        JSON.stringify({
          ...action.payload.student,
          token: action.payload.token,
        })
      );
    });
    builder.addCase(studentLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetLogin, studentLogout } = loginSlice.actions;
export default loginSlice.reducer;
