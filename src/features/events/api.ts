import { getRequest, patchRequest, postRequest } from "@/utils/axis";
import type {
  CreateEventInput,
  EventData,
  EventItem,
  UpdateEventInput,
} from "./event.zod";

const eventApi = {
  create: async (data: CreateEventInput) => {
    return postRequest({ path: "/event", data });
  },
  upate: async (data: UpdateEventInput) => {
    return patchRequest({ path: "/event", data });
  },
  getEvents: async () => {
    return getRequest<EventItem[]>({ path: "/event" });
  },
  getEventDetails: async ({ eventId }: { eventId: string }) => {
    return getRequest<EventData>({ path: `/event/${eventId}` });
  },
  reserveSeats: async ({
    eventId,
    seatIds,
  }: {
    eventId: string;
    seatIds: string[];
  }) => {
    return postRequest({
      path: `/booking/${eventId}/reserve`,
      data: { seatIds },
    });
  },
  confirmReservation: async ({ eventId }: { eventId: string }) => {
    return patchRequest({ path: `/booking/${eventId}/confirm` });
  },
};
export default eventApi;
