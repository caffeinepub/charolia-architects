import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PortfolioItem {
    id: bigint;
    title: string;
    displayOrder: bigint;
    createdAt: bigint;
    imageUrl: string;
    caption: string;
    category: string;
}
export interface ContactInquiry {
    id: bigint;
    name: string;
    isRead: boolean;
    message: string;
    timestamp: bigint;
    phone: string;
}
export interface UserProfile {
    name: string;
}
export interface Testimonial {
    id: bigint;
    clientName: string;
    reviewText: string;
    isActive: boolean;
    rating: bigint;
    location: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addPortfolioItem(title: string, category: string, imageUrl: string, caption: string, displayOrder: bigint): Promise<bigint>;
    addTestimonial(clientName: string, location: string, rating: bigint, reviewText: string, isActive: boolean): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deletePortfolioItem(id: bigint): Promise<void>;
    deleteTestimonial(id: bigint): Promise<void>;
    getActiveTestimonials(): Promise<Array<Testimonial>>;
    getAllInquiries(): Promise<Array<ContactInquiry>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPortfolioItems(): Promise<Array<PortfolioItem>>;
    getSiteStats(): Promise<Array<[string, bigint]>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    markInquiryRead(id: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedInitialData(): Promise<void>;
    submitInquiry(name: string, phone: string, message: string): Promise<bigint>;
    updatePortfolioItem(id: bigint, newTitle: string, newCategory: string, newImageUrl: string, newCaption: string, newOrder: bigint): Promise<void>;
    updateStat(stat: string, value: bigint): Promise<void>;
    updateTestimonial(id: bigint, clientName: string, location: string, rating: bigint, reviewText: string, isActive: boolean): Promise<void>;
}
