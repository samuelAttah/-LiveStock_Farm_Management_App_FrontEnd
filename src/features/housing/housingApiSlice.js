import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const housings = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});

const initialState = housings.getInitialState();

export const housingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHousings: builder.query({
      query: (batchId) => ({
        url: `/batches/${batchId}/housing`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedHousing = responseData?.length
          ? responseData.map((house) => {
              house.id = house._id;
              return house;
            })
          : responseData;
        return housings.setAll(initialState, loadedHousing);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Housing", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Housing", id })),
          ];
        } else return [{ type: "Housing", id: "LIST" }];
      },
    }),
    addNewHousing: builder.mutation({
      query: (house) => ({
        url: `/batches/${house.batchId}/housing`,
        method: "PUT",
        body: house,
      }),
      invalidatesTags: [{ type: "Housing", id: "LIST" }],
    }),
    updateHousing: builder.mutation({
      query: (house) => ({
        url: `/batches/${house.batchId}/housing`,
        method: "PATCH",
        body: house,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Feed", id: arg.housingId },
      ],
    }),
    deleteHousing: builder.mutation({
      query: (house) => ({
        url: `/batches/${house.batchId}/housing/${house.housingId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Feed", id: arg.housingId },
      ],
    }),
  }),
});

export const {
  useGetHousingsQuery,
  useAddNewHousingMutation,
  useUpdateHousingMutation,
  useDeleteHousingMutation,
} = housingsApiSlice;

// returns the query result object
export const selectHousingsResult =
  housingsApiSlice.endpoints.getHousings.select();

// creates memoized selector
const selectHousingsData = createSelector(
  selectHousingsResult,
  (housingsResult) => housingsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllHousings,
  selectById: selectHousingById,
  selectIds: selectHousingIds,
  // Pass in a selector that returns the notes slice of state
} = housings.getSelectors((state) => selectHousingsData(state) ?? initialState);
