"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeApi = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3000` }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/api/user/login",
        method: "POST",
        body: data,
      }),
    }),
    signupUser: builder.mutation({
      query: (data) => ({
        url: "/api/user/signup",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/api/user/forgotPassword",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/api/user/resetPassword",
        method: "POST",
        body: data,
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/api/user/updatePassword",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
} = storeApi;
