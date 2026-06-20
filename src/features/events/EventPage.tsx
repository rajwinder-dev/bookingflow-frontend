import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import eventApi from "./api";
import type { EventItem } from "./event.zod";
import {  EventGrid } from "./components/EventCard";

const EventsPage = () => {
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
          <EventGrid filteredEvents={filteredEvents} />
        )}
      </main>
    </div>
  );
};

export default EventsPage;
