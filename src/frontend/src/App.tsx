import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { useActor } from "./hooks/useActor";
import { useSeedInitialData } from "./hooks/useQueries";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";

function SeedInitializer() {
  const { actor, isFetching } = useActor();
  const seedMutation = useSeedInitialData();

  // biome-ignore lint/correctness/useExhaustiveDependencies: seedMutation is intentionally excluded to prevent infinite loops
  useEffect(() => {
    if (!actor || isFetching) return;
    const seeded = localStorage.getItem("charoliaSeeded");
    if (!seeded) {
      seedMutation.mutate(undefined, {
        onSuccess: () => {
          localStorage.setItem("charoliaSeeded", "true");
        },
      });
    }
  }, [actor, isFetching]);

  return null;
}

function RootLayout() {
  return (
    <>
      <SeedInitializer />
      <Toaster position="top-right" />
      <Outlet />
    </>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([homeRoute, adminRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
