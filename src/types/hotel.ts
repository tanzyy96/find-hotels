export interface Hotel {
  id: number;
  name: string;
  rating: number;
  stars: number;
  address: string;
  photo: string;
  price: number;
  description: string;
  reviews: HotelReview[];
}

export interface HotelReview {
  rating: number;
  title: string;
  description: string;
  user: User;
}

export interface User {
  name: string;
  location: string;
}
