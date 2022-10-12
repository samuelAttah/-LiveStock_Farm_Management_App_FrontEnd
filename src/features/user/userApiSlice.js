import { apiSlice } from "../../app/api/apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const user = createEntityAdapter({});

const initialState = user.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetail: builder.query({
      query: () => ({
        url: "/user/details",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData, meta, arg) => {
        const loadedDetails = responseData?.length
          ? responseData.map((detail) => {
              detail.id = detail._id;
              return detail;
            })
          : responseData;

        console.log("userDetails", loadedDetails);
        return user.setAll(initialState, loadedDetails);
      },
      providesTags: (result, error, arg) => {
        return [{ type: "User", id: "LIST" }];
      },
    }),
    updateUserDetail: builder.mutation({
      query: (payLoad) => ({
        url: "/user/updatedetails",
        method: "PUT",
        body: payLoad,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    verifyPassword: builder.mutation({
      query: (oldPassword) => ({
        url: "/user/verifypassword",
        method: "POST",
        body: oldPassword,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    resetPassword: builder.mutation({
      query: (payLoad) => ({
        url: "/user/resetpassword",
        method: "POST",
        body: payLoad,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    uploadProfilePicture: builder.mutation({
      query: (profilePicture) => ({
        url: "/user/profilepicture",
        method: "PUT",
        body: profilePicture,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    removeProfilePicture: builder.mutation({
      query: () => ({
        url: "/user/removeprofilepicture",
        method: "PUT",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUserDetailQuery,
  useUpdateUserDetailMutation,
  useVerifyPasswordMutation,
  useResetPasswordMutation,
  useUploadProfilePictureMutation,
  useRemoveProfilePictureMutation,
} = userApiSlice;

// returns the query result object
export const selectUserResult = userApiSlice.endpoints.getUserDetail.select();

// creates memoized selector
const selectUsersData = createSelector(
  selectUserResult,
  (usersResult) => usersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUserDetails,
  selectById: selectUserDetailById,
  selectIds: selectUserDetailsIds,
  selectTotal: selectUserDetailsTotal,
  // Pass in a selector that returns the notes slice of state
} = user.getSelectors((state) => selectUsersData(state) ?? initialState);
