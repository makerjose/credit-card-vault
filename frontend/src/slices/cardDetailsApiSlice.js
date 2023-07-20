import { apiSlice } from './apiSlice';

const CARD_DETAILS_URL = '/api/cardDetails';

export const cardDetailsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCardDetails: builder.mutation({
      query: (data) => ({
        url: `${CARD_DETAILS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateCardDetails: builder.mutation({
      query: (data) => ({
        url: `${CARD_DETAILS_URL}/${data.id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteCardDetails: builder.mutation({
      query: (id) => ({
        url: `${CARD_DETAILS_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateCardDetailsMutation,
  useUpdateCardDetailsMutation,
  useDeleteCardDetailsMutation,
} = cardDetailsApiSlice;


