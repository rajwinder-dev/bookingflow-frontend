import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import type { EventData } from "../event.zod";

interface props {
  eventData: EventData;
}
export const EvenetDetailCard = ({ eventData }: props) => {
  return (
    <>
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
    </>
  );
};
