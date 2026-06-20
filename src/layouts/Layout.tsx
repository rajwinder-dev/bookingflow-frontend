import { Button } from "@/components/ui/button";
import { Outlet, useNavigate } from "react-router";
import { ProjectLogo } from "../features/home/ProjectLogo";
import useAuth from "../features/auth/hooks";

const Layout = () => {
  const navigate = useNavigate();
  const { authDetails, logoutUser , isLoadingAuthDetails} = useAuth();
  console.log(isLoadingAuthDetails)
  return (
    /* Changed to a flex column with a minimum height of the full viewport screen */
    <div className="bg-background text-foreground font-sans antialiased flex flex-col min-h-screen">
      {/* --- Navigation --- */}
      <nav className="border-border bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md flex flex-col shrink-0">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <ProjectLogo />
          <div className="flex items-center gap-3">
            {authDetails?.data.id ? (
              <div className="flex items-center gap-4 text-sm font-medium">
                {/* Active/Logged-in green pulse indicator */}
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    Logged As
                  </span>
                  <span>{authDetails.data.email}</span>
                </div>

                {/* Added Sign Out Button */}
                <Button
                  size="sm"
                  variant="outline"
                  className="ml-2 border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => logoutUser()}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                className="bg-primary text-primary-foreground shadow-primary/10 px-5 shadow-lg hover:opacity-90"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* --- Main Content Area --- */}
      {/* flex-grow / flex-1 forces this element to claim all available space */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* --- Footer --- */}
      {/* shrink-0 prevents the footer from compressing if content overflows */}
      <footer className="border-border container mx-auto flex flex-col items-center justify-between gap-6 border-t px-6 py-12 md:flex-row shrink-0">
        <div className="text-muted-foreground text-sm font-medium">
          © {new Date().getFullYear()} TicketBook Demo. Built for presentation
          purposes.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
