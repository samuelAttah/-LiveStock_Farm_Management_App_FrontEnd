import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const revenues = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});

const initialState = revenues.getInitialState();

export const revenuesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRevenues: builder.query({
      query: (batchId) => ({
        url: `/batches/${batchId}/revenue`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedRevenues = responseData?.length
          ? responseData.map((revenue) => {
              revenue.id = revenue._id;
              return revenue;
            })
          : responseData;
        return revenues.setAll(initialState, loadedRevenues);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Revenue", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Revenue", id })),
          ];
        } else return [{ type: "Revenue", id: "LIST" }];
      },
    }),
    addNewRevenue: builder.mutation({
      query: (revenue) => ({
        url: `/batches/${revenue.batchId}/revenue`,
        method: "PUT",
        body: revenue,
      }),
      invalidatesTags: [{ type: "Revenue", id: "LIST" }],
    }),
    updateRevenue: builder.mutation({
      query: (revenue) => ({
        url: `/batches/${revenue.batchId}/revenue`,
        method: "PATCH",
        body: revenue,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Revenue", id: arg.revenueId },
      ],
    }),
    deleteRevenue: builder.mutation({
      query: (revenue) => ({
        url: `/batches/${revenue?.batchId}/revenue/${revenue?.revenueId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Revenue", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetRevenuesQuery,
  useAddNewRevenueMutation,
  useUpdateRevenueMutation,
  useDeleteRevenueMutation,
} = revenuesApiSlice;

// returns the query result object
export const selectRevenuesResult =
  revenuesApiSlice.endpoints.getRevenues.select();

// creates memoized selector
const selectRevenuesData = createSelector(
  selectRevenuesResult,
  (revenuesResult) => revenuesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllRevenues,
  selectById: selectRevenueById,
  selectIds: selectRevenueIds,
  // Pass in a selector that returns the notes slice of state
} = revenues.getSelectors((state) => selectRevenuesData(state) ?? initialState);
