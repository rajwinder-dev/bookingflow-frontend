import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, ChevronRight, MapPin, Ticket } from "lucide-react";
import type { EventItem } from "../event.zod";
import { useNavigate } from "react-router";
interface props {
  filteredEvents: EventItem[];
}
export const EventGrid = ({ filteredEvents }: props) => {
  const navigate = useNavigate();
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredEvents.map((event) => {
        const isSoldOut = event.seatsLeft === 0;

        // Format the ISO dynamic date safely
        const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        return (
          <Card
            key={event.id}
            className={`bg-card border-border hover:shadow-md transition-all flex flex-col justify-between ${
              isSoldOut ? "opacity-75" : ""
            }`}
          >
            <div>
              <CardHeader className="space-y-2 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Ticket size={13} className="text-primary/70" />
                    <span>{event.totalSeats} Total Seats</span>
                  </div>
                  {isSoldOut ? (
                    <Badge className="bg-destructive/10 text-destructive border-none text-[10px] font-bold">
                      Sold Out
                    </Badge>
                  ) : (
                    <span className="text-xs text-primary font-medium">
                      {event.seatsLeft} left
                    </span>
                  )}
                </div>
                <CardTitle className="font-heading text-lg leading-snug font-bold">
                  {event.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-2.5 text-sm font-medium pb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar size={14} className="text-primary/70 shrink-0" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={14} className="text-primary/70 shrink-0" />
                  <span className="truncate capitalize">{event.venue}</span>
                </div>
              </CardContent>
            </div>

            <CardFooter className="border-border border-t bg-muted/20 flex items-center justify-between px-6 py-4 rounded-b-xl">
              <div>
                <span className="text-xs text-muted-foreground block">
                  Admission
                </span>
                <span className="text-sm font-bold text-foreground">
                  General Entry
                </span>
              </div>

              <Button
                size="sm"
                disabled={isSoldOut}
                onClick={() => navigate(`/events/${event.id}`)}
                variant={isSoldOut ? "outline" : "default"}
                className="gap-1 font-medium text-xs h-9 px-4"
              >
                {isSoldOut ? "Unavailable" : "Book Spot"}
                {!isSoldOut && <ChevronRight size={14} />}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
