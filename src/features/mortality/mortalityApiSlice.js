import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const mortalitys = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});

const initialState = mortalitys.getInitialState();

export const mortalitysApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMortalitys: builder.query({
      query: (batchId) => ({
        url: `/batches/${batchId}/mortality`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedMortalitys = responseData?.length
          ? responseData.map((mortality) => {
              mortality.id = mortality._id;
              return mortality;
            })
          : responseData;
        return mortalitys.setAll(initialState, loadedMortalitys);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Mortality", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Mortality", id })),
          ];
        } else return [{ type: "Mortality", id: "LIST" }];
      },
    }),
    addNewMortality: builder.mutation({
      query: (mortality) => ({
        url: `/batches/${mortality.batchId}/mortality`,
        method: "PUT",
        body: mortality,
      }),
      invalidatesTags: [{ type: "Mortality", id: "LIST" }],
    }),
    updateMortality: builder.mutation({
      query: (mortality) => ({
        url: `/batches/${mortality.batchId}/mortality`,
        method: "PATCH",
        body: mortality,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Mortality", id: arg.mortalityId },
      ],
    }),
    deleteMortality: builder.mutation({
      query: (mortality) => ({
        url: `/batches/${mortality.batchId}/mortality/${mortality.mortalityId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Mortality", id: arg.mortalityId },
      ],
    }),
  }),
});

export const {
  useGetMortalitysQuery,
  useAddNewMortalityMutation,
  useUpdateMortalityMutation,
  useDeleteMortalityMutation,
} = mortalitysApiSlice;

// returns the query result object
export const selectMortalitysResult =
  mortalitysApiSlice.endpoints.getMortalitys.select();

// creates memoized selector
const selectMortalitysData = createSelector(
  selectMortalitysResult,
  (mortalitysResult) => mortalitysResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllMortalitys,
  selectById: selectMortalityById,
  selectIds: selectMortalityIds,
  // Pass in a selector that returns the notes slice of state
} = mortalitys.getSelectors(
  (state) => selectMortalitysData(state) ?? initialState
);
