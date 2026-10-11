import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getEvent, listEvents, updateEvent } from '../api/mockServer';

function toQueryError(error) {
  return {
    status: 'CUSTOM_ERROR',
    error: error instanceof Error ? error.message : 'The mock server request failed.',
  };
}

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Event'],
  endpoints: (builder) => ({
    getEvents: builder.query({
      async queryFn() {
        try {
          return { data: await listEvents() };
        } catch (error) {
          return { error: toQueryError(error) };
        }
      },
      providesTags: (result) => [
        { type: 'Event', id: 'LIST' },
        ...(result || []).map((event) => ({ type: 'Event', id: event.id })),
      ],
    }),
    getEvent: builder.query({
      async queryFn(eventId) {
        try {
          const event = await getEvent(eventId);
          return event ? { data: event } : { error: { status: 'CUSTOM_ERROR', error: `Event ${eventId} was not found.` } };
        } catch (error) {
          return { error: toQueryError(error) };
        }
      },
      providesTags: (result, _error, eventId) => [{ type: 'Event', id: result?.id || eventId }],
    }),
    updateEvent: builder.mutation({
      async queryFn({ id, changes }) {
        try {
          return { data: await updateEvent(id, changes) };
        } catch (error) {
          return { error: toQueryError(error) };
        }
      },
      // Both the collection and this item's detail provide this entity tag.
      // A failed update returns no tags, so it cannot report success or trigger invalidation.
      invalidatesTags: (result, _error, { id }) => (
        result ? [{ type: 'Event', id }] : []
      ),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventQuery,
  useUpdateEventMutation,
} = eventsApi;
