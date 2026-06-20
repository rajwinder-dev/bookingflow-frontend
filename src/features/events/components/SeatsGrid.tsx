import { useGlobalContext } from "@/context/GlobalContext";
import type { Seat } from "../event.zod";
import { STATE_STYLES } from "../constants";
import { CheckCircle2 } from "lucide-react";

interface SeatsGridProps {
  seats: Seat[];
  selectedSeats: string[];
  setSelectedSeats: React.Dispatch<React.SetStateAction<string[]>>;
}
export const SeatsGrid = ({
  selectedSeats,
  seats,
  setSelectedSeats,
}: SeatsGridProps) => {
  const { authDetails } = useGlobalContext();
  const handleSeatClick = (
    seatId: string,
    status: string,
    reservedBy?: string,
  ) => {
    // Already reserved by me, reserved by someone else, or booked -> no-op
    if (status !== "AVAILABLE" || reservedBy) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId],
    );
  };

  return (
    <div className="grid grid-cols-6 sm:grid-cols-8 gap-3 mb-10 justify-items-center w-full max-w-md">
      {seats?.map((seat) => {
        const isUserSelected = selectedSeats.includes(seat.id);
        const isMine =
          seat.reservedBy &&
          seat.status === "BOOKED" &&
          seat.reservedBy === authDetails?.data.id;
        let visualState: keyof typeof STATE_STYLES = seat.status;
        if (isMine) visualState = "MINE";
        else if (isUserSelected) visualState = "SELECTED";

        return (
          <button
            key={seat.id}
            disabled={seat.status !== "AVAILABLE" || !!seat.reservedBy}
            onClick={() =>
              handleSeatClick(seat.id, seat.status, seat.reservedBy)
            }
            className={`h-10 w-10 text-xs font-mono font-bold rounded-md border flex items-center justify-center transition-all ${STATE_STYLES[visualState]}`}
            title={
              isMine
                ? `Seat ${seat.seatNumber} (Reserved by you)`
                : `Seat ${seat.seatNumber} (${seat.status})`
            }
          >
            {visualState === "SELECTED" || visualState === "MINE" ? (
              <CheckCircle2 size={14} />
            ) : (
              seat.seatNumber
            )}
          </button>
        );
      })}
    </div>

  );
};
