import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const animalsales = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});

const initialState = animalsales.getInitialState();

export const animalSalesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnimalSales: builder.query({
      query: (batchId) => ({
        url: `/batches/${batchId}/animalsale`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedAnimalSales = responseData?.length
          ? responseData.map((sale) => {
              sale.id = sale._id;
              return sale;
            })
          : responseData;
        return animalsales.setAll(initialState, loadedAnimalSales);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "AnimalSale", id: "LIST" },
            ...result.ids.map((id) => ({ type: "AnimalSale", id })),
          ];
        } else return [{ type: "AnimalSale", id: "LIST" }];
      },
    }),
    addNewAnimalSale: builder.mutation({
      query: (payLoad) => ({
        url: `/batches/${payLoad.batchId}/animalsale`,
        method: "PUT",
        body: payLoad,
      }),
      invalidatesTags: [{ type: "AnimalSale", id: "LIST" }],
    }),
    updateAnimalSale: builder.mutation({
      query: (payLoad) => ({
        url: `/batches/${payLoad.batchId}/animalsale`,
        method: "PATCH",
        body: payLoad,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "AnimalSale", id: arg.animalSaleId },
      ],
    }),
    deleteAnimalSale: builder.mutation({
      query: (payLoad) => ({
        url: `/batches/${payLoad?.batchId}/animalsale/${payLoad?.animalSaleId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "AnimalSale", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetAnimalSalesQuery,
  useAddNewAnimalSaleMutation,
  useUpdateAnimalSaleMutation,
  useDeleteAnimalSaleMutation,
} = animalSalesApiSlice;

// returns the query result object
export const selectAnimalSalesResult =
  animalSalesApiSlice.endpoints.getAnimalSales.select();

// creates memoized selector
const selectAnimalSalesData = createSelector(
  selectAnimalSalesResult,
  (animalSalesResult) => animalSalesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllAnimalsales,
  selectById: selectAnimalsalesById,
  selectIds: selectAnimalsalesIds,
  // Pass in a selector that returns the notes slice of state
} = animalsales.getSelectors(
  (state) => selectAnimalSalesData(state) ?? initialState
);
