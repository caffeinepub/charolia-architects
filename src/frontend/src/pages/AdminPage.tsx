import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard, Loader2, Lock, LogOut } from "lucide-react";
import { useState } from "react";
import AdminInquiries from "../components/admin/AdminInquiries";
import AdminPortfolio from "../components/admin/AdminPortfolio";
import AdminTestimonials from "../components/admin/AdminTestimonials";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsCallerAdmin } from "../hooks/useQueries";

function AdminLoginScreen() {
  const { login, loginStatus } = useInternetIdentity();
  const isLoggingIn = loginStatus === "logging-in";

  return (
    <div className="min-h-screen bg-brand-charcoal flex items-center justify-center p-4">
      <div className="bg-white rounded-sm shadow-luxury p-10 max-w-sm w-full text-center">
        <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="h-7 w-7 text-brand-gold" />
        </div>
        <img
          src="/assets/uploads/Screenshot_20260305-010019-1.png"
          alt="Charolia Architects"
          className="h-12 w-12 object-contain rounded-full mx-auto mb-4"
        />
        <h1 className="font-display text-2xl font-semibold text-brand-charcoal mb-2">
          Admin Portal
        </h1>
        <p className="font-body text-sm text-muted-foreground mb-8">
          Sign in with Internet Identity to manage your website.
        </p>
        <Button
          onClick={() => login()}
          disabled={isLoggingIn}
          className="w-full bg-brand-charcoal hover:bg-brand-dark text-white font-body font-semibold tracking-widest uppercase h-11"
          data-ocid="admin.primary_button"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
        <a
          href="/"
          className="block mt-4 font-body text-xs text-muted-foreground hover:text-brand-gold transition-colors"
          data-ocid="admin.link"
        >
          ← Back to website
        </a>
      </div>
    </div>
  );
}

function AccessDeniedScreen() {
  const { clear } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return (
    <div className="min-h-screen bg-brand-charcoal flex items-center justify-center p-4">
      <div className="bg-white rounded-sm shadow-luxury p-10 max-w-sm w-full text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="h-7 w-7 text-red-400" />
        </div>
        <h1 className="font-display text-2xl font-semibold text-brand-charcoal mb-2">
          Access Denied
        </h1>
        <p className="font-body text-sm text-muted-foreground mb-8">
          Your account does not have admin privileges for this site.
        </p>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full font-body"
          data-ocid="admin.secondary_button"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
        <a
          href="/"
          className="block mt-4 font-body text-xs text-muted-foreground hover:text-brand-gold transition-colors"
          data-ocid="admin.link"
        >
          ← Back to website
        </a>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const { clear, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("portfolio");

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster position="top-right" />

      {/* Top bar */}
      <header className="bg-brand-charcoal text-white px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/assets/uploads/Screenshot_20260305-010019-1.png"
            alt="Logo"
            className="h-8 w-8 object-contain rounded-full bg-white/10"
          />
          <div>
            <span className="font-display text-sm font-semibold tracking-widest uppercase">
              Charolia
            </span>
            <span className="font-body text-[10px] text-brand-gold tracking-widest uppercase block">
              Admin
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1 ml-4 bg-white/5 rounded-sm px-3 py-1.5">
            <LayoutDashboard className="h-3.5 w-3.5 text-brand-gold/70" />
            <span className="font-body text-xs text-white/60">Dashboard</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {identity && (
            <span className="hidden sm:block font-body text-xs text-white/40 truncate max-w-[120px]">
              {identity.getPrincipal().toString().slice(0, 12)}…
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-white/60 hover:text-white hover:bg-white/10 font-body text-xs"
            data-ocid="admin.secondary_button"
          >
            <LogOut className="h-3.5 w-3.5 mr-1.5" />
            Sign Out
          </Button>
          <a
            href="/"
            className="font-body text-xs text-white/40 hover:text-white transition-colors hidden sm:block"
            data-ocid="admin.link"
          >
            ← Site
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-display text-2xl font-semibold text-brand-charcoal mb-8">
          Site Management
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 bg-brand-beige/50 p-1 rounded-sm h-auto gap-1">
            <TabsTrigger
              value="portfolio"
              className="font-body text-xs tracking-wider uppercase data-[state=active]:bg-brand-charcoal data-[state=active]:text-white rounded-sm px-5 py-2"
              data-ocid="admin.tab"
            >
              Portfolio
            </TabsTrigger>
            <TabsTrigger
              value="testimonials"
              className="font-body text-xs tracking-wider uppercase data-[state=active]:bg-brand-charcoal data-[state=active]:text-white rounded-sm px-5 py-2"
              data-ocid="admin.tab"
            >
              Testimonials
            </TabsTrigger>
            <TabsTrigger
              value="inquiries"
              className="font-body text-xs tracking-wider uppercase data-[state=active]:bg-brand-charcoal data-[state=active]:text-white rounded-sm px-5 py-2"
              data-ocid="admin.tab"
            >
              Inquiries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio">
            <AdminPortfolio />
          </TabsContent>
          <TabsContent value="testimonials">
            <AdminTestimonials />
          </TabsContent>
          <TabsContent value="inquiries">
            <AdminInquiries />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default function AdminPage() {
  const { identity } = useInternetIdentity();
  const { isFetching: actorFetching } = useActor();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();

  const isAuthenticated = !!identity;

  // Not logged in
  if (!isAuthenticated) {
    return <AdminLoginScreen />;
  }

  // Loading admin check
  if (actorFetching || adminLoading) {
    return (
      <div className="min-h-screen bg-brand-charcoal flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-brand-gold animate-spin" />
      </div>
    );
  }

  // Not admin
  if (!isAdmin) {
    return <AccessDeniedScreen />;
  }

  return <AdminDashboard />;
}
