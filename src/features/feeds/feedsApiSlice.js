import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const feeds = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});

const initialState = feeds.getInitialState();

export const feedsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeeds: builder.query({
      query: (batchId) => ({
        url: `/batches/${batchId}/feed`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedFeeds = responseData?.length
          ? responseData.map((feed) => {
              feed.id = feed._id;
              return feed;
            })
          : responseData;
        return feeds.setAll(initialState, loadedFeeds);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Feed", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Feed", id })),
          ];
        } else return [{ type: "Feed", id: "LIST" }];
      },
    }),
    addNewFeed: builder.mutation({
      query: (feed) => ({
        url: `/batches/${feed.batchId}/feed`,
        method: "PUT",
        body: feed,
      }),
      invalidatesTags: [{ type: "Feed", id: "LIST" }],
    }),
    updateFeed: builder.mutation({
      query: (feed) => ({
        url: `/batches/${feed.batchId}/feed`,
        method: "PATCH",
        body: feed,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Feed", id: arg.feedId },
      ],
    }),
    deleteFeed: builder.mutation({
      query: (feed) => ({
        url: `/batches/${feed.batchId}/feed/${feed.feedId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Feed", id: arg.feedId },
      ],
    }),
  }),
});

export const {
  useGetFeedsQuery,
  useAddNewFeedMutation,
  useUpdateFeedMutation,
  useDeleteFeedMutation,
} = feedsApiSlice;

// returns the query result object
export const selectFeedsResult = feedsApiSlice.endpoints.getFeeds.select();

// creates memoized selector
const selectFeedsData = createSelector(
  selectFeedsResult,
  (feedsResult) => feedsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllFeeds,
  selectById: selectFeedById,
  selectIds: selectFeedIds,
  // Pass in a selector that returns the notes slice of state
} = feeds.getSelectors((state) => selectFeedsData(state) ?? initialState);
