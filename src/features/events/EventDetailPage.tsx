import { useState } from "react";
import { Calendar, MapPin, ArrowLeft, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import eventApi from "./api";
import useAuth from "../auth/hooks";
import { toast } from "sonner";

// Map incoming DB statuses to UI state design configs
const STATE_STYLES = {
  AVAILABLE:
    "bg-card border-border hover:border-primary text-muted-foreground cursor-pointer",
  SELECTED:
    "bg-primary border-primary text-primary-foreground scale-105 shadow-md shadow-primary/20 cursor-pointer",
  MINE: "bg-emerald-500/15 border-emerald-500 text-emerald-600 cursor-default",
  RESERVED:
    "bg-amber-500/10 border-amber-500/20 text-amber-500/60 cursor-not-allowed opacity-70",
  BOOKED:
    "bg-muted border-muted-foreground/10 text-muted-foreground/30 cursor-not-allowed opacity-40",
};

const EventDetailPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { authDetails } = useAuth();
  const queryClient = useQueryClient();

  // Seat IDs the user has picked locally but not yet reserved on the backend
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["event", { eventId }],
    queryFn: () => eventApi.getEventDetails({ eventId: eventId! }),
    enabled: !!eventId,
  });

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
  });

  const eventData = data?.data;
  const seats = eventData?.Seats;
  const pricePerSeat = 45; // Default fallback unit price

  // Seats already reserved by the logged-in user (from the backend)
  const mySeats =
    seats?.filter(
      (seat) =>
        seat.reservedBy === authDetails?.data.id && seat.status === "RESERVED",
    ) ?? [];

  const mySeatNumbers = mySeats.map((seat) => seat.seatNumber);

  const totalPrice =
    (selectedSeats.length + mySeatNumbers.length) * pricePerSeat;

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

  if (isLoading)
    return (
      <div className="p-10 text-center text-muted-foreground">
        Loading event map...
      </div>
    );
  if (error || !eventData)
    return (
      <div className="p-10 text-center text-destructive">
        Failed to load details.
      </div>
    );

  return (
    <div className="bg-background text-foreground min-h-screen font-sans antialiased">
      {/* Navigation Header */}
      <div className="border-border border-b bg-card/20">
        <div className="container mx-auto max-w-6xl px-6 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-muted-foreground gap-2 hover:text-foreground"
          >
            <ArrowLeft size={16} /> Back to Events
          </Button>
        </div>
      </div>

      <main className="container mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* LEFT COLUMN: Event Metrics Summary Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-none"
              >
                Live Event
              </Badge>
              <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl capitalize">
                {eventData.name}
              </h1>
            </div>

            <Card className="bg-card/50 border-border">
              <CardContent className="p-4 space-y-3 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar size={16} className="text-primary" />
                  <span className="font-medium text-foreground">
                    {new Date(eventData.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin size={16} className="text-primary" />
                  <span className="font-medium text-foreground capitalize truncate">
                    {eventData.venue}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Selection Summary Box */}
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
                <span className="text-muted-foreground">
                  Available Inventory Left:
                </span>
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
          </div>

          {/* RIGHT COLUMN: Responsive Live Grid Layout */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center border border-border rounded-2xl bg-card/30 p-6 md:p-10">
            {/* Screen / Stage Indicator */}
            <div className="w-full max-w-md mx-auto mb-12 text-center">
              <div className="h-1.5 w-full bg-primary/30 rounded-full shadow-[0_4px_12px_rgba(var(--primary),0.2)]"></div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground block mt-2">
                STAGE / FRONT
              </span>
            </div>

            {/* Seat Map Grid (Responsive grid layout automatically splitting columns) */}
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-3 mb-10 justify-items-center w-full max-w-md">
              {seats?.map((seat) => {
                const isUserSelected = selectedSeats.includes(seat.id);
                const isMine =
                  seat.reservedBy &&
                  seat.status === "BOOKED" &&
                  seat.reservedBy === authDetails?.data.id;
                console.log(authDetails?.data.id);
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

            {/* Dynamic Grid Rules Legend */}
            <div className="flex flex-wrap gap-4 justify-center border-t border-border/80 pt-6 w-full text-xs font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-card border border-border rounded" />
                <span>Available (${pricePerSeat})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-primary border border-primary rounded" />
                <span className="text-foreground">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-emerald-500/15 border border-emerald-500 rounded" />
                <span className="text-foreground">Your Reservation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-amber-500/10 border border-amber-500/20 rounded" />
                <span>Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-muted border border-muted-foreground/10 rounded" />
                <span>Booked</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetailPage;
