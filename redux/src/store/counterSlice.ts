import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  age: number;
}

interface CounterState {
  value: number;
  users: User[];
}

const initialState: CounterState = {
  value: 0,
  users: [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 16 },
    { id: 3, name: "Doe", age: 50 },
  ],
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  selectors: {
    countUsers: (state) => {
      const newUsers = state.users.filter((user) => user.age >= 18);
      return newUsers.length;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const { countUsers } = counterSlice.selectors;
// export const counter = (state: RootState) => state.counter.value;
export default counterSlice.reducer;
