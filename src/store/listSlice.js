import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fs } from '../firebase/firebase';

export const fetchList = createAsyncThunk(
  'products/fetchList',
  async ({ email }) => {
    console.log(email);
    const collectionRef = fs.collection(`myList-${email}`);
    const snapshot = await collectionRef.get();
    const data = snapshot.docs.map(doc => doc.data());
    console.log(data);
    return data;
  }
);

const listSlice = createSlice({
  name: 'products',
  initialState:{
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearData: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default listSlice.reducer;

