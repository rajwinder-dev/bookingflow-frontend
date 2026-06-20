interface props {
  pricePerSeat: number;
}

export const GridRuleLegend = ({ pricePerSeat }: props) => {
  return (
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
  );
};
