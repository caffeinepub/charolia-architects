import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ContactInquiry, PortfolioItem, Testimonial } from "../backend.d";
import { useActor } from "./useActor";

// ─── Portfolio ────────────────────────────────────────────────────────────────

export function useGetPortfolioItems() {
  const { actor, isFetching } = useActor();
  return useQuery<PortfolioItem[]>({
    queryKey: ["portfolioItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPortfolioItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddPortfolioItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      title: string;
      category: string;
      imageUrl: string;
      caption: string;
      displayOrder: bigint;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addPortfolioItem(
        params.title,
        params.category,
        params.imageUrl,
        params.caption,
        params.displayOrder,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolioItems"] });
    },
  });
}

export function useUpdatePortfolioItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      id: bigint;
      title: string;
      category: string;
      imageUrl: string;
      caption: string;
      displayOrder: bigint;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updatePortfolioItem(
        params.id,
        params.title,
        params.category,
        params.imageUrl,
        params.caption,
        params.displayOrder,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolioItems"] });
    },
  });
}

export function useDeletePortfolioItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deletePortfolioItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolioItems"] });
    },
  });
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export function useGetActiveTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["activeTestimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActiveTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      clientName: string;
      location: string;
      rating: bigint;
      reviewText: string;
      isActive: boolean;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addTestimonial(
        params.clientName,
        params.location,
        params.rating,
        params.reviewText,
        params.isActive,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeTestimonials"] });
      queryClient.invalidateQueries({ queryKey: ["allTestimonials"] });
    },
  });
}

export function useUpdateTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      id: bigint;
      clientName: string;
      location: string;
      rating: bigint;
      reviewText: string;
      isActive: boolean;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateTestimonial(
        params.id,
        params.clientName,
        params.location,
        params.rating,
        params.reviewText,
        params.isActive,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeTestimonials"] });
      queryClient.invalidateQueries({ queryKey: ["allTestimonials"] });
    },
  });
}

export function useDeleteTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteTestimonial(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeTestimonials"] });
      queryClient.invalidateQueries({ queryKey: ["allTestimonials"] });
    },
  });
}

// ─── Site Stats ───────────────────────────────────────────────────────────────

export function useGetSiteStats() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<[string, bigint]>>({
    queryKey: ["siteStats"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSiteStats();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Contact / Inquiries ──────────────────────────────────────────────────────

export function useSubmitInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (params: {
      name: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitInquiry(params.name, params.phone, params.message);
    },
  });
}

export function useGetAllInquiries() {
  const { actor, isFetching } = useActor();
  return useQuery<ContactInquiry[]>({
    queryKey: ["allInquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMarkInquiryRead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.markInquiryRead(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allInquiries"] });
    },
  });
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSeedInitialData() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.seedInitialData();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolioItems"] });
      queryClient.invalidateQueries({ queryKey: ["activeTestimonials"] });
      queryClient.invalidateQueries({ queryKey: ["siteStats"] });
    },
  });
}
