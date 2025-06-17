import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Goal } from "./types";
import { createGoal, deleteGoal, fetchGoals, updateGoal} from "./goalThunk";


export const goalAdapter = createEntityAdapter<Goal>();

const initialState = goalAdapter.getInitialState({
    loading: false,
    error: null as string | null
});

const goalSlice = createSlice({
  name: 'goal',
  initialState: initialState,
  reducers: {
    // addGoal: (state, action: PayloadAction<Goal>) => {
    //   goalAdapter.addOne(state, action.payload);
    //   saveGoalToStorageMock({
    //     userId: action.payload.userId,
    //     goals: Object.values(state.entities)
    //   });
    // },
    // updateGoal: (state, action: PayloadAction<{ id: string; changes: Partial<Goal> }>) => {
    //   goalAdapter.updateOne(state, action.payload);
    //   const updated = state.entities[action.payload.id];
    //   if (updated) {
    //     saveGoalToStorageMock({
    //       userId: updated.userId,
    //       goals: Object.values(state.entities)
    //     })
    //   }
    // },
    // deleteGoal: (state, action: PayloadAction<string>) => {
    //   const id = action.payload;
    //   const userId = state.entities[id]?.userId;
    //   goalAdapter.removeOne(state, action.payload);
    //   if (userId) {
    //     saveGoalToStorageMock({
    //       userId,
    //       goals: Object.values(state.entities)
    //     })
    //   }
    // }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.loading = false;
        goalAdapter.setAll(state, action.payload);
      })
      .addCase(fetchGoals.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGoals.rejected, state => {
        state.loading = false;
        state.error = 'Failed to fetch goals'
      })

      .addCase(createGoal.fulfilled, (state, action) => {
        state.loading = false;
        goalAdapter.addOne(state, action.payload)
      })
      .addCase(createGoal.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGoal.rejected, state => {
        state.loading = false;
        state.error = 'Failed to create goal'
      })

      .addCase(updateGoal.fulfilled, (state, action) => {
        state.loading = false;
        goalAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload
        })
      })
      .addCase(updateGoal.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGoal.rejected, state => {
        state.loading = false;
        state.error = 'Failed to update goal'
      })

      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.loading = false;
        goalAdapter.removeOne(state, action.payload)
      })
      .addCase(deleteGoal.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGoal.rejected, state => {
        state.loading = false;
        state.error = 'Failed to delete goal'
      })
  }
})

// export const { addGoal, updateGoal, deleteGoal } = goalSlice.actions;
export default goalSlice.reducer;