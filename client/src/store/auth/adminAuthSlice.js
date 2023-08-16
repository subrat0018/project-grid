import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  signUpStatus: 'idle',
  loading: false,
  admin: null,
  errorSignUp: null,
  errorLogIn: null,
};

// Sign Up
export const adminSignup = createAsyncThunk(
  'admin/adminSignup',
  async (dataObj, thunkAPI) => {
    try {
      const adminEmail = 'admin@blockducts.com';
      const adminPassword = 'admin@bd';

      if (dataObj.email === adminEmail && dataObj.password === adminPassword) {
        // save the user to local storage
        localStorage.setItem('admin', JSON.stringify({ adminEmail }));

        return { adminEmail };
      } else {
        return thunkAPI.rejectWithValue({
          error: 'Not Matching',
        });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Log In
export const adminLogin = createAsyncThunk(
  'admin/adminLogin',
  async (dataObj, thunkAPI) => {
    try {
      const adminEmail = 'admin@blockducts.com';
      const adminPassword = 'admin@bd';

      if (dataObj.email === adminEmail && dataObj.password === adminPassword) {
        // save the user to local storage
        localStorage.setItem('admin', JSON.stringify({ adminEmail }));

        return { adminEmail };
      } else {
        return thunkAPI.rejectWithValue({
          error: 'Not Matching',
        });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Log Out
export const adminLogOut = () => (dispatch) => {
  // remove the admin from local storage
  localStorage.removeItem('admin');
  dispatch(adminLogOutAction());
};

// Check if there is a admin in local storage when the app first loads
export const checkAdmin = () => (dispatch) => {
  const admin = JSON.parse(localStorage.getItem('admin'));

  if (admin) {
    dispatch(setAdmin(admin));
  }
};

const adminAuthSlice = createSlice({
  initialState,
  name: 'admin',
  reducers: {
    adminLogOutAction: (state) => {
      state.admin = null;
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(adminSignup.pending, (state) => {
        state.signUpStatus = 'loading';
        state.loading = true;
        state.admin = null;
        state.errorSignUp = null;
      })
      .addCase(adminSignup.fulfilled, (state, action) => {
        state.signUpStatus = 'succeeded';
        state.loading = false;
        state.admin = action.payload;
        state.errorSignUp = null;
      })
      .addCase(adminSignup.rejected, (state, action) => {
        state.signUpStatus = 'failed';
        state.loading = false;
        state.admin = null;
        state.errorSignUp = action.payload.error;
      })

      // Log In
      .addCase(adminLogin.pending, (state) => {
        state.signUpStatus = 'loading';
        state.loading = true;
        state.admin = null;
        state.errorLogIn = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.signUpStatus = 'succeeded';
        state.loading = false;
        state.admin = action.payload;
        state.errorLogIn = null;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.signUpStatus = 'failed';
        state.loading = false;
        state.admin = null;
        state.errorLogIn = action.payload.error;
      });
  },
});

export const { adminLogOutAction, setAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
