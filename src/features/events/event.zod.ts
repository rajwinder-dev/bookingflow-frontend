import z from "zod";

export const createEventSchema = {
  bodySchema: z.object({
    name: z.string(),
    venue: z.string(),
    date: z.coerce.date(),
    totalSeats: z.number(),
  }),
};

export const updateEventSchema = {
  bodySchema: z.object({
    name: z.string().optional(),
    venue: z.string().optional(),
    date: z.coerce.date().optional(),
    // totalSeats: z.number().optional(),
  }),
};

export type CreateEventInput = z.infer<typeof createEventSchema.bodySchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema.bodySchema>;

export interface EventItem {
  id: string;
  name: string;
  date: string;
  venue: string;
  totalSeats: number;
  seatsLeft: number;
  createdAt: string;
}
export type SeatStatus = "AVAILABLE" | "RESERVED" | "BOOKED";

export type Seat = {
  id: string;
  seatNumber: number;
  reservedBy?: string;
  status: SeatStatus;
};

export type EventData =  {
  id: string;
  name: string;
  date: string; // ISO Date String (e.g., "2022-01-01T00:00:00.000Z")
  venue: string;
  totalSeats: number;
  seatsLeft: number;
  createdAt: string; // ISO Date String
  Seats: Seat[];
}


