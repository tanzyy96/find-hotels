import { Hotel, HotelReview } from "@/types/hotel";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type Filter = {
  name: string;
  rating: number;
  minPrice: number;
  maxPrice: number;
};

export type Sort = {
  price: "asc" | "desc";
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const filterAndSort = (hotels: Hotel[], filters: Filter, sort: Sort) => {
  return hotels
    .filter((hotel) => {
      const name = hotel.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const rating = hotel.rating >= filters.rating;
      const minPrice = hotel.price >= filters.minPrice;
      const maxPrice = hotel.price <= filters.maxPrice;
      return name && rating && minPrice && maxPrice;
    })
    .sort((a, b) => {
      if (sort.price === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
};

export const filterSearch = (searchText: string, reviews: HotelReview[]) => {
  return reviews.filter((review) => {
    return review.title.toLowerCase().includes(searchText.toLowerCase());
  });
};
