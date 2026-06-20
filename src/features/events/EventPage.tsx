import { useState } from "react";
import { Search, MapPin, Calendar, ChevronRight, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import eventApi from "./api";
import type { EventItem } from "./event.zod";

const EventsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch real data from your API
  const { data, isLoading, isError } = useQuery({
    queryFn: eventApi.getEvents,
    queryKey: ["event"],
  });

  // Safely extract the events array from your JSON payload structure
  const eventsList: EventItem[] = data?.data || [];

  // Filtering Logic based on Name and Venue (City/Place)
  const filteredEvents = eventsList.filter((event) => {
    return (
      event.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        Loading events schedule...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-destructive">
        Failed to load experiences. Please try again later.
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen font-sans antialiased">
      {/* --- Page Header --- */}
      <header className="border-border border-b bg-card/30 py-12">
        <div className="container mx-auto max-w-6xl px-6">
          <Badge
            variant="outline"
            className="mb-3 border-primary/20 text-primary"
          >
            Live Schedule
          </Badge>
          <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
            Upcoming Experiences
          </h1>
          <p className="text-muted-foreground mt-2 text-sm max-w-xl">
            Select an event below to reserve your ticket. Simple booking,
            instant confirmation.
          </p>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-6 py-10">
        {/* --- Minimalist Filters Bar --- */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Search by event or venue..."
              className="pl-9 h-10 border-border bg-card"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* --- Events Grid Layout --- */}
        {filteredEvents.length === 0 ? (
          <div className="border border-dashed border-border rounded-xl p-16 text-center text-muted-foreground">
            No events found matching your search criteria.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => {
              const isSoldOut = event.seatsLeft === 0;

              // Format the ISO dynamic date safely
              const formattedDate = new Date(event.date).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                },
              );

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
                        <Calendar
                          size={14}
                          className="text-primary/70 shrink-0"
                        />
                        <span>{formattedDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin
                          size={14}
                          className="text-primary/70 shrink-0"
                        />
                        <span className="truncate capitalize">
                          {event.venue}
                        </span>
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
        )}
      </main>
    </div>
  );
};

export default EventsPage;
