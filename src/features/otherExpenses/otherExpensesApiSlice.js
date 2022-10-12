import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const otherExpenses = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});

const initialState = otherExpenses.getInitialState();

export const otherExpensesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOtherExpenses: builder.query({
      query: (batchId) => ({
        url: `/batches/${batchId}/otherexpenses`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedOtherExpenses = responseData?.length
          ? responseData.map((expense) => {
              expense.id = expense._id;
              return expense;
            })
          : responseData;
        return otherExpenses.setAll(initialState, loadedOtherExpenses);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Feed", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Expense", id })),
          ];
        } else return [{ type: "Expense", id: "LIST" }];
      },
    }),
    addNewOtherExpense: builder.mutation({
      query: (payLoad) => ({
        url: `/batches/${payLoad.batchId}/otherexpenses`,
        method: "PUT",
        body: payLoad,
      }),
      invalidatesTags: [{ type: "Expense", id: "LIST" }],
    }),
    updateOtherExpense: builder.mutation({
      query: (payLoad) => ({
        url: `/batches/${payLoad.batchId}/otherexpenses`,
        method: "PATCH",
        body: payLoad,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Expense", id: arg.expenseId },
      ],
    }),
    deleteOtherExpense: builder.mutation({
      query: (payLoad) => ({
        url: `/batches/${payLoad.batchId}/otherexpenses/${payLoad.expenseId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Expense", id: arg.expenseId },
      ],
    }),
  }),
});

export const {
  useGetOtherExpensesQuery,
  useAddNewOtherExpenseMutation,
  useUpdateOtherExpenseMutation,
  useDeleteOtherExpenseMutation,
} = otherExpensesApiSlice;

// returns the query result object
export const selectExpensesResult =
  otherExpensesApiSlice.endpoints.getOtherExpenses.select();

// creates memoized selector
const selectExpensesData = createSelector(
  selectExpensesResult,
  (expensesResult) => expensesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllExpenses,
  selectById: selectExpenseById,
  selectIds: selectExpenseIds,
  // Pass in a selector that returns the notes slice of state
} = otherExpenses.getSelectors(
  (state) => selectExpensesData(state) ?? initialState
);
