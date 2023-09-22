import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { studentLogout } from './studentLogin';

export const getProperGroups = createAsyncThunk(
  'getProperGroups',
  async ({ teacherId, level, gender }, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.get(
        `/groups/students?teacherId=${teacherId}&level=${level}&gender=${gender}`
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

export const joinToGroup = createAsyncThunk(
  'joinToGroup',
  async (info, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.post(`/groups/join/${info.groupId}?teacherOwner=${info.teacherOwner}`);
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

// export const leaveGroup = createAsyncThunk(
//   'leaveGroup',
//   async (info, thunkAPI) => {
//     const { rejectWithValue, dispatch } = thunkAPI;
//     try {
//       const { data } = await axios.put(
//         `/groups/leave-group?groupId=${info.groupId}`
//       );
//       return {
//         message: data.message,
//         studentId: info.studentId,
//         group: data.group,
//       };
//     } catch (error) {
//       if (error.response.data && error.response.data.message) {
//         if (error.response.data.message === 'مستخدم غير موثوق') {
//           rejectWithValue(error.response.data.message);
//           dispatch(studentLogout());
//         } else {
//           return rejectWithValue(error.response.data.message);
//         }
//       }
//       return rejectWithValue(error.message);
//     }
//   }
// );

const groupSlice = createSlice({
  name: 'groups',
  initialState: {
    groups: [],
  },

  extraReducers: (builder) => {
    builder.addCase(getProperGroups.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProperGroups.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.groups = action.payload;
    });

    builder.addCase(getProperGroups.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // join to group
    builder.addCase(joinToGroup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(joinToGroup.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(joinToGroup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // leave  group
    // builder.addCase(leaveGroup.pending, (state) => {
    //   state.loading = true;
    // });

    // builder.addCase(leaveGroup.fulfilled, (state, action) => {
    //   state.message = action.payload.message;
    //   state.loading = false;
    //   state.error = null;
    //   state.groups = state.groups.filter((g) =>
    //     g._id === action.payload.group._id ? action.payload.group : g
    //   );
    // });

    // builder.addCase(leaveGroup.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
  },
});

export default groupSlice.reducer;
