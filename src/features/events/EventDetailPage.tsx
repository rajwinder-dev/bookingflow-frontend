import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import eventApi from "./api";
import useAuth from "../auth/hooks";
import { EvenetDetailCard } from "./components/EventDetailCard";
import { SeatsGrid } from "./components/SeatsGrid";
import { GridRuleLegend } from "./components/GridRuleLegend";
import { ActionCard } from "./components/ActionsCard";

const EventDetailPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { authDetails } = useAuth();

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["event", { eventId }],
    queryFn: () => eventApi.getEventDetails({ eventId: eventId! }),
    enabled: !!eventId,
  });
  const eventData = data?.data;
  const seats = eventData?.Seats ?? [];
  const pricePerSeat = 45; // Default fallback unit price


  const mySeatNumbers = seats?.filter(
      (seat) =>
        seat.reservedBy === authDetails?.data.id && seat.status === "RESERVED",
    ).map((seat) => seat.seatNumber);

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
          <div className="lg:col-span-5 space-y-6">
            <EvenetDetailCard eventData={eventData} />
            <ActionCard
              pricePerSeat={pricePerSeat}
              mySeatNumbers={mySeatNumbers}
              selectedSeats={selectedSeats}
              eventData={eventData}
              setSelectedSeats={setSelectedSeats}
            />
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

            <SeatsGrid
              seats={seats}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
            />
            <GridRuleLegend pricePerSeat={pricePerSeat} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetailPage;
