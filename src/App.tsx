import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import { RouterProvider } from "react-router";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import router from "./router";
const queryclient = new QueryClient({
  // mutationCache: new MutationCache({
  //   onError: (error: any) => {
  //     console.log(error);
  //   },
  // }),
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        console.log(error);
        if ((error as AxiosError)?.status === 403) return false;
        return failureCount < 3;
      },
    },
  },
});
function App() {
  return (
    <>
      <QueryClientProvider client={queryclient}>
        <TooltipProvider>
          <RouterProvider router={router} />
          <Toaster />
          <ReactQueryDevtools />
        </TooltipProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
