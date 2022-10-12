import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const drugs = createEntityAdapter({
  sortComparer: (a, b) => a.id - b.id,
});

const initialState = drugs.getInitialState();

export const drugsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDrugs: builder.query({
      query: (batchId) => ({
        url: `/batches/${batchId}/drug`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedDrugs = responseData?.length
          ? responseData.map((drug) => {
              drug.id = drug._id;
              return drug;
            })
          : responseData;

        return drugs.setAll(initialState, loadedDrugs);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Drug", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Drug", id })),
          ];
        } else return [{ type: "Drug", id: "LIST" }];
      },
    }),
    addNewDrug: builder.mutation({
      query: (drug) => ({
        url: `/batches/${drug.batchId}/drug`,
        method: "PUT",
        body: drug,
      }),
      invalidatesTags: [{ type: "Drug", id: "LIST" }],
    }),
    updateDrug: builder.mutation({
      query: (drug) => ({
        url: `/batches/${drug.batchId}/drug`,
        method: "PATCH",
        body: drug,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Feed", id: arg.housingId },
      ],
    }),
    deleteDrug: builder.mutation({
      query: (drug) => ({
        url: `/batches/${drug.batchId}/drug/${drug.drugId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Drug", id: arg.drugId },
      ],
    }),
  }),
});

export const {
  useGetDrugsQuery,
  useAddNewDrugMutation,
  useUpdateDrugMutation,
  useDeleteDrugMutation,
} = drugsApiSlice;

// returns the query result object
export const selectDrugsResult = drugsApiSlice.endpoints.getDrugs.select();

// creates memoized selector
const selectDrugsData = createSelector(
  selectDrugsResult,
  (drugsResult) => drugsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllDrugs,
  selectById: selectDrugById,
  selectIds: selectDrugIds,
  // Pass in a selector that returns the notes slice of state
} = drugs.getSelectors((state) => selectDrugsData(state) ?? initialState);
