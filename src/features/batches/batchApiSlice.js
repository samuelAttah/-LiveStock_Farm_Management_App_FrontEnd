import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const batches = createEntityAdapter({
  sortComparer: (a, b) =>
    new Date(b.createdAt) > new Date(a.createdAt)
      ? 1
      : new Date(b.createdAt) < new Date(a.createdAt)
      ? -1
      : 0,
});

const initialState = batches.getInitialState();

export const batchesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBatches: builder.query({
      query: () => ({
        url: "/batches",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData, meta, arg) => {
        console.log("responseData", responseData);
        const loadedBatches = responseData?.length
          ? responseData.map((batch) => {
              batch.id = batch._id;
              return batch;
            })
          : responseData;
        return batches.setAll(initialState, loadedBatches);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Batch", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Batch", id })),
          ];
        } else return [{ type: "Batch", id: "LIST" }];
      },
    }),
    addNewBatch: builder.mutation({
      query: (batch) => ({
        url: "/batches",
        method: "POST",
        body: batch,
      }),
      invalidatesTags: [{ type: "Batch", id: "LIST" }],
    }),
    updateBatch: builder.mutation({
      query: (batch) => ({
        url: "/batches",
        method: "PATCH",
        body: batch,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Batch", id: arg.id }],
    }),
    endBatch: builder.mutation({
      query: (id) => ({
        url: "/batches",
        method: "PUT",
        body: id,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Batch", id: arg.id }],
    }),
    deleteBatch: builder.mutation({
      query: ({ id }) => ({
        url: `/batches/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Batch", id: arg.id }],
    }),
  }),
});

export const {
  useGetBatchesQuery,
  useAddNewBatchMutation,
  useUpdateBatchMutation,
  useDeleteBatchMutation,
  useEndBatchMutation,
} = batchesApiSlice;

// returns the query result object
export const selectBatchesResult =
  batchesApiSlice.endpoints.getBatches.select();

// creates memoized selector
const selectBatchesData = createSelector(
  selectBatchesResult,
  (batchesResult) => batchesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllBatches,
  selectById: selectBatchById,
  selectIds: selectBatchIds,
  selectTotal: selectBatchTotal,
  // Pass in a selector that returns the notes slice of state
} = batches.getSelectors((state) => selectBatchesData(state) ?? initialState);
