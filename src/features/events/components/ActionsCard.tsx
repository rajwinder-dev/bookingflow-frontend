import { Button } from "@/components/ui/button";
import type { EventData } from "../event.zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import eventApi from "../api";
import { toast } from "sonner";
import { Lock } from "lucide-react";

interface props {
  mySeatNumbers: number[];
  pricePerSeat: number;
  selectedSeats: string[];
  eventData: EventData;
  setSelectedSeats: React.Dispatch<React.SetStateAction<string[]>>;
}
export const ActionCard = ({
  pricePerSeat,
  mySeatNumbers,
  selectedSeats,
  eventData,
  setSelectedSeats,
}: props) => {
  const totalPrice =
    (selectedSeats.length + mySeatNumbers.length) * pricePerSeat;
  const eventId = eventData.id;
  const queryClient = useQueryClient();
  const {
    mutate: reserveSeats,
    isPending: isReserving,
    error: reserveError,
  } = useMutation({
    mutationFn: () =>
      eventApi.reserveSeats({ eventId: eventId!, seatIds: selectedSeats }),
    onSuccess: () => {
      setSelectedSeats([]);
      queryClient.invalidateQueries({ queryKey: ["event", { eventId }] });
      toast.success("Seats reserved successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    mutate: confirmReservation,
    isPending: isConfirming,
    error: confirmError,
  } = useMutation({
    mutationFn: () => eventApi.confirmReservation({ eventId: eventId! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event", { eventId }] });
      toast.success("Reservation confirmed successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="bg-muted/40 rounded-xl p-5 border border-border space-y-4">
      {mySeatNumbers.length > 0 && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">
            Your Reserved Seats ({mySeatNumbers.length}):
          </span>
          <span className="font-mono font-bold text-emerald-600">
            {mySeatNumbers.sort((a, b) => a - b).join(", ")}
          </span>
        </div>
      )}
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">Seats Selected:</span>
        <span className="font-mono font-bold text-primary">
          {selectedSeats.length > 0 ? selectedSeats.length : "None"}
        </span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">Available Inventory Left:</span>
        <span className="font-mono font-medium">
          {eventData.seatsLeft} / {eventData.totalSeats}
        </span>
      </div>
      <div className="flex justify-between items-center border-t border-border/60 pt-3">
        <span className="text-sm font-medium">Total Balance:</span>
        <span className="text-xl font-bold font-mono text-primary">
          ${totalPrice}
        </span>
      </div>

      {/* Reserve button — locks in the currently selected (not-yet-reserved) seats */}
      <Button
        className="w-full h-11 text-sm font-semibold"
        variant="secondary"
        disabled={selectedSeats.length === 0 || isReserving}
        onClick={() => reserveSeats()}
      >
        {isReserving
          ? "Reserving..."
          : `Reserve ${selectedSeats.length || ""} Seat${selectedSeats.length === 1 ? "" : "s"}`}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        reservations will be expire in 10 min if not booked
      </p>
      {reserveError && (
        <p className="text-xs text-destructive text-center">
          {reserveError.message}
        </p>
      )}
      {/* Checkout button — only enabled once the user has confirmed reservations */}
      <Button
        className="w-full h-11 text-sm font-semibold"
        disabled={mySeatNumbers.length === 0 || isConfirming}
        onClick={() => confirmReservation()}
      >
        {isConfirming ? (
          "Confirming..."
        ) : (
          <span className="flex items-center gap-2">
            <Lock size={14} /> Confirm Checkout ({mySeatNumbers.length})
          </span>
        )}
      </Button>

      {confirmError && (
        <p className="text-xs text-destructive text-center">
          {confirmError.message}
        </p>
      )}
    </div>
  );
};
