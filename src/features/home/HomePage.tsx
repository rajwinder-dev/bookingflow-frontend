import { Ticket, Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="container mx-auto flex flex-col items-center px-6 py-20 text-center lg:py-32">
        <Badge
          variant="outline"
          className="border-primary/20 text-primary bg-primary/5 mb-6 px-4 py-1"
        >
          🎟️ Demo Mode Active
        </Badge>
        <h1 className="font-heading mb-8 max-w-4xl text-5xl leading-[1.1] font-bold tracking-tight md:text-7xl">
          Book your next experience in{" "}
          <span className="text-primary italic">just three clicks.</span>
        </h1>
        <p className="text-muted-foreground mb-10 max-w-[600px] text-lg leading-relaxed md:text-xl">
          A lightning-fast, zero-friction booking experience. Select your event,
          pick your seats, and get your tickets instantly.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            onClick={() => navigate("/events")}
            className="shadow-primary/20 h-14 rounded-xl px-10 text-lg font-bold shadow-2xl transition-all hover:-translate-y-1"
          >
            Explore Events
          </Button>
        </div>
      </section>

      {/* --- How it Works Section --- */}
      <section
        id="how-it-works"
        className="border-border container mx-auto border-t px-6 py-24"
      >
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div>
            <h2 className="font-heading mb-6 text-3xl font-bold md:text-4xl">
              Simple, transparent booking.
            </h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-primary/10 text-primary mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-lg font-bold">Choose an Event</h4>
                  <p className="text-muted-foreground text-sm">
                    Browse our curated list of upcoming concerts, sports games,
                    and local shows.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary/10 text-primary mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-lg font-bold">Select Seats & Quantity</h4>
                  <p className="text-muted-foreground text-sm">
                    Interactive seat map allows you to pick your perfect view
                    with no hidden fees.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary/10 text-primary mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-lg font-bold">Instant Digital Tickets</h4>
                  <p className="text-muted-foreground text-sm">
                    Get your secure QR code ticket sent instantly to your
                    account and email app.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Ticket Mockup */}
          <div className="group relative">
            <div className="from-primary/30 absolute -inset-1 rounded-2xl bg-gradient-to-r to-transparent opacity-50 blur transition duration-1000 group-hover:opacity-100"></div>
            <Card className="bg-card border-border relative overflow-hidden shadow-2xl">
              <div className="bg-muted/50 border-border flex items-center justify-between border-b px-4 py-2">
                <div className="flex items-center gap-2">
                  <Ticket size={16} className="text-primary" />
                  <span className="text-muted-foreground font-mono text-[11px] uppercase tracking-wider">
                    Your Active Ticket
                  </span>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[10px] font-bold">
                  Confirmed
                </Badge>
              </div>
              <CardContent className="space-y-4 p-6">
                <div>
                  <h3 className="text-xl font-bold tracking-tight">
                    Summer Music Festival 2026
                  </h3>
                  <p className="text-muted-foreground text-xs mt-1">
                    Main Stage Outdoor Arena
                  </p>
                </div>

                <hr className="border-border border-dashed" />

                <div className="grid grid-cols-2 gap-4 font-sans text-xs">
                  <div className="space-y-1">
                    <span className="text-muted-foreground block">
                      Date & Time
                    </span>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Calendar size={12} /> July 24, 2026
                    </div>
                    <div className="flex items-center gap-1.5 font-medium text-muted-foreground">
                      <Clock size={12} /> 18:00 PM
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground block">
                      Location
                    </span>
                    <div className="flex items-center gap-1.5 font-medium">
                      <MapPin size={12} /> Central Park, NY
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-3 text-center font-mono text-[11px] tracking-widest text-muted-foreground">
                  [ BARCODE / QR CODE DEMO ]
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
