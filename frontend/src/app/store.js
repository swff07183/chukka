import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import adminReducer from '../features/admin/adminSlice';
import lectureReducer from '../features/lecture/lectureSlice';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    lecture: lectureReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
