import { configureStore } from '@reduxjs/toolkit';
import registerSlice from './slices/studentRegister';
import loginSlice from './slices/studentLogin';
import teacherSlice from './slices/teachersSlice';
import groupSlice from './slices/groups';
import eContentSlice from './slices/groupContent';
import profileSlice from './slices/profile';
import resetPasswordSlice from './slices/resetPassword';
import contentSlice from "./slices/content"

const store = configureStore({
  reducer: {
    studentRegister: registerSlice,
    studentLogin: loginSlice,
    teachers: teacherSlice,
    group: groupSlice,
    eContentSlice,
    profile: profileSlice,
    resetPasswordSlice,
    contentSlice
  },
});

export default store;
