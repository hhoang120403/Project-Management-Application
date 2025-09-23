import type { User } from '@/types';
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null,
  isAuthenticated: !!localStorage.getItem('user'),
  isLoading: false,
};

export const login = createAsyncThunk<
  { user: User }, // kiểu dữ liệu trả về khi login thành công
  { data: any }, // params truyền vào
  { rejectValue: string }
>('auth/login', async ({ data }, { rejectWithValue }) => {
  try {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    return { user: data.user };
  } catch (error) {
    return rejectWithValue('Login failed');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    forceLogout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ user: User }>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.isAuthenticated = true;
        }
      )
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { forceLogout } = authSlice.actions;

export default authSlice.reducer;
