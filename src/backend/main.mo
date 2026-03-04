import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Time "mo:core/Time";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  // Authorization component
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profile types and state
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Portfolio types and state
  public type PortfolioItem = {
    id : Nat;
    title : Text;
    category : Text;
    imageUrl : Text;
    caption : Text;
    displayOrder : Nat;
    createdAt : Int;
  };

  module PortfolioItem {
    public func compareByDisplayOrder(a : PortfolioItem, b : PortfolioItem) : Order.Order {
      Nat.compare(a.displayOrder, b.displayOrder);
    };
  };

  var nextPortfolioId = 1;
  let portfolioState = Map.empty<Nat, PortfolioItem>();

  // Portfolio functions
  public query ({ caller }) func getPortfolioItems() : async [PortfolioItem] {
    portfolioState.values().toArray().sort(PortfolioItem.compareByDisplayOrder);
  };

  public shared ({ caller }) func addPortfolioItem(title : Text, category : Text, imageUrl : Text, caption : Text, displayOrder : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add portfolio items");
    };
    let item : PortfolioItem = {
      id = nextPortfolioId;
      title;
      category;
      imageUrl;
      caption;
      displayOrder;
      createdAt = Time.now();
    };
    portfolioState.add(nextPortfolioId, item);
    nextPortfolioId += 1;
    item.id;
  };

  public shared ({ caller }) func updatePortfolioItem(id : Nat, newTitle : Text, newCategory : Text, newImageUrl : Text, newCaption : Text, newOrder : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update portfolio items");
    };
    switch (portfolioState.get(id)) {
      case (null) { Runtime.trap("Portfolio item not found") };
      case (?existing) {
        let updated : PortfolioItem = {
          id;
          title = newTitle;
          category = newCategory;
          imageUrl = newImageUrl;
          caption = newCaption;
          displayOrder = newOrder;
          createdAt = existing.createdAt;
        };
        portfolioState.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func deletePortfolioItem(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete portfolio items");
    };
    if (not portfolioState.containsKey(id)) {
      Runtime.trap("Portfolio item not found");
    };
    portfolioState.remove(id);
  };

  // Testimonials types and state
  public type Testimonial = {
    id : Nat;
    clientName : Text;
    location : Text;
    rating : Nat;
    reviewText : Text;
    isActive : Bool;
  };

  var nextTestimonialId = 1;
  let testimonialState = Map.empty<Nat, Testimonial>();

  // Testimonial functions
  public query ({ caller }) func getActiveTestimonials() : async [Testimonial] {
    let testimonials = testimonialState.values().toArray();
    let filtered = testimonials.filter(func(t) { t.isActive });
    filtered;
  };

  public shared ({ caller }) func addTestimonial(clientName : Text, location : Text, rating : Nat, reviewText : Text, isActive : Bool) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add testimonials");
    };
    let testimonial : Testimonial = {
      id = nextTestimonialId;
      clientName;
      location;
      rating;
      reviewText;
      isActive;
    };
    testimonialState.add(nextTestimonialId, testimonial);
    nextTestimonialId += 1;
    testimonial.id;
  };

  public shared ({ caller }) func updateTestimonial(id : Nat, clientName : Text, location : Text, rating : Nat, reviewText : Text, isActive : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update testimonials");
    };
    switch (testimonialState.get(id)) {
      case (null) { Runtime.trap("Testimonial not found") };
      case (?_) {
        testimonialState.add(id, {
          id;
          clientName;
          location;
          rating;
          reviewText;
          isActive;
        });
      };
    };
  };

  public shared ({ caller }) func deleteTestimonial(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete testimonials");
    };
    if (not testimonialState.containsKey(id)) {
      Runtime.trap("Testimonial not found");
    };
    testimonialState.remove(id);
  };

  // Contact inquiry types and state
  public type ContactInquiry = {
    id : Nat;
    name : Text;
    phone : Text;
    message : Text;
    timestamp : Int;
    isRead : Bool;
  };

  var nextInquiryId = 1;
  let inquiryState = Map.empty<Nat, ContactInquiry>();

  public shared ({ caller }) func submitInquiry(name : Text, phone : Text, message : Text) : async Nat {
    let inquiry : ContactInquiry = {
      id = nextInquiryId;
      name;
      phone;
      message;
      timestamp = Time.now();
      isRead = false;
    };
    inquiryState.add(nextInquiryId, inquiry);
    nextInquiryId += 1;
    inquiry.id;
  };

  public query ({ caller }) func getAllInquiries() : async [ContactInquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    inquiryState.values().toArray();
  };

  public shared ({ caller }) func markInquiryRead(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can mark inquiries");
    };
    switch (inquiryState.get(id)) {
      case (null) { Runtime.trap("Inquiry not found") };
      case (?existing) {
        let updated : ContactInquiry = {
          id = existing.id;
          name = existing.name;
          phone = existing.phone;
          message = existing.message;
          timestamp = existing.timestamp;
          isRead = true;
        };
        inquiryState.add(id, updated);
      };
    };
  };

  // Site stats types and state
  type SiteStats = Map.Map<Text, Nat>;
  let siteStats : SiteStats = Map.empty<Text, Nat>();

  public query ({ caller }) func getSiteStats() : async [(Text, Nat)] {
    siteStats.toArray();
  };

  public shared ({ caller }) func updateStat(stat : Text, value : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update stats");
    };
    siteStats.add(stat, value);
  };

  // Initial seed data setup function
  public shared ({ caller }) func seedInitialData() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can seed data");
    };

    if (portfolioState.isEmpty() and testimonialState.isEmpty()) {
      // Seed portfolio items
      let now = Time.now();
      let items : [PortfolioItem] = [
        {
          id = 1;
          title = "Modern Villa";
          category = "Residential";
          imageUrl = "/images/portfolio1.jpg";
          caption = "Spacious modern villa design";
          displayOrder = 1;
          createdAt = now;
        },
        {
          id = 2;
          title = "Office Complex";
          category = "Commercial";
          imageUrl = "/images/portfolio2.jpg";
          caption = "Contemporary office spaces";
          displayOrder = 2;
          createdAt = now;
        },
        {
          id = 3;
          title = "Luxury Apartments";
          category = "Residential";
          imageUrl = "/images/portfolio3.jpg";
          caption = "High-end apartment units";
          displayOrder = 3;
          createdAt = now;
        },
        {
          id = 4;
          title = "Retail Plaza";
          category = "Commercial";
          imageUrl = "/images/portfolio4.jpg";
          caption = "Shopping and retail spaces";
          displayOrder = 4;
          createdAt = now;
        },
        {
          id = 5;
          title = "Eco Home";
          category = "Residential";
          imageUrl = "/images/portfolio5.jpg";
          caption = "Sustainable eco-friendly house";
          displayOrder = 5;
          createdAt = now;
        },
        {
          id = 6;
          title = "Clinic Design";
          category = "Healthcare";
          imageUrl = "/images/portfolio6.jpg";
          caption = "Modern healthcare clinic";
          displayOrder = 6;
          createdAt = now;
        },
        {
          id = 7;
          title = "Educational Center";
          category = "Institutional";
          imageUrl = "/images/portfolio7.jpg";
          caption = "Learning and development center";
          displayOrder = 7;
          createdAt = now;
        },
      ];

      for (item in items.values()) {
        portfolioState.add(item.id, item);
        nextPortfolioId += 1;
      };

      // Seed testimonials
      let testimonials : [Testimonial] = [
        {
          id = 1;
          clientName = "John Smith";
          location = "Delhi";
          rating = 5;
          reviewText = "Excellent service and stunning designs!";
          isActive = true;
        },
        {
          id = 2;
          clientName = "Megha Patel";
          location = "Mumbai";
          rating = 4;
          reviewText = "Professional team, happy with the results";
          isActive = true;
        },
        {
          id = 3;
          clientName = "Rajesh Kumar";
          location = "Bangalore";
          rating = 5;
          reviewText = "On-time project delivery and great attention to detail";
          isActive = true;
        },
        {
          id = 4;
          clientName = "Sita Gupta";
          location = "Chennai";
          rating = 4;
          reviewText = "Creative and innovative solutions for our space";
          isActive = true;
        },
      ];

      for (test in testimonials.values()) {
        testimonialState.add(test.id, test);
        nextTestimonialId += 1;
      };

      // Seed site stats
      let stats : [(Text, Nat)] = [
        ("projectsCompleted", 150),
        ("yearsExperience", 10),
        ("happyClients", 120),
      ];

      for ((stat, value) in stats.values()) {
        siteStats.add(stat, value);
      };
    } else {
      Runtime.trap("Data has already been seeded");
    };
  };
};
