import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticatedRoutes />
    </QueryClientProvider>
  );
}

export default App;
