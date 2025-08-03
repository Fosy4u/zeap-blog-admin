import { createApi } from "@reduxjs/toolkit/query/react";
import fetchBaseQuery from "./baseQuery";
import responseHandler from "./responseHandler";

export default createApi({
  reducerPath: "zeapApi",
  baseQuery: fetchBaseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: [
    "Users",
    "User",
    "Blog",
  ],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (arg) => {
        const { userId } = arg;
        return {
          url: `user/`,
          params: { userId },
        };
      },
      providesTags: ["User"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getAuthUser: builder.query({
      query: (arg) => {
        const { uid } = arg;
        return {
          url: `userByUid/`,
          params: { uid },
        };
      },
      providesTags: ["User"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getUsers: builder.query({
      query: (arg) => {
        return {
          url: `users/`,
          params: { ...arg },
        };
      },
      providesTags: ["Users"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    createUser: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `user/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Users"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "User Successfully Created",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),

    updateUser: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `user/update`,
          method: "PUT",
          body: payload,
          params: { _id: payload._id },
        };
      },
      invalidatesTags: ["User"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "User Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    updateUserProfilePic: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `user/update/profilePic`,
          method: "PUT",
          body: payload,
          params: { _id: payload._id },
        };
      },
      invalidatesTags: ["User"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "User Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    
    createBlogPost: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `blog/post/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Blog"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Blog Post Successfully Created",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    updateBlogPost: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `blog/post/update`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Blog"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Blog Post Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    updateBlogPostStatus: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `blog/post/update/status`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Blog"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Blog Post Status Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deleteBlogPost: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `blog/post/delete`,
          method: "DELETE",
          body: payload,
        };
      },
      invalidatesTags: ["Blog"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Blog Post Successfully Deleted",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    getBlogPosts: builder.query({
      query: (arg) => {
        return {
          url: `blog/posts/`,
          params: { ...arg },
        };
      },
      providesTags: ["Blog"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getBlogAnalytics: builder.query({
      query: (arg) => {
        return {
          url: `blog/analytics`,
          params: { ...arg },
        };
      },
      providesTags: ["Blog"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getBlogPost: builder.query({
      query: (arg) => {
        return {
          url: `blog/post/`,
          params: { ...arg },
        };
      },
      providesTags: ["Blog"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getBlogPostComments: builder.query({
      query: (arg) => {
        return {
          url: `blog/post/comments`,
          params: { ...arg },
        };
      },
      providesTags: ["Blog"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    makeUserBlogAuthor: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `blog/post/author/make`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Blog","Users"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "User Successfully Made Blog Author",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    removeUserBlogAuthor: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `blog/post/author/remove`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Blog","Users"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "User Successfully Removed as Blog Author",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    createBlogPostComment: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `blog/post/comment/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Blog"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Comment Successfully Added to Blog Post",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    replyBlogPostComment: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `blog/post/comment/reply`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Blog"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Reply Successfully Added to Blog Post Comment",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
  }),
});
