import { Filter, Sort, filterAndSort, filterSearch } from "@/lib/utils";
import { Hotel } from "@/types/hotel";
import { expect, test } from "vitest";

test("filterAndSort with minPrice and maxPrice", () => {
  const hotels: Hotel[] = [
    {
      id: 1,
      name: "Hotel 1",
      rating: 4,
      stars: 4,
      address: "Address 1",
      photo: "photo1",
      price: 100,
      description: "Description 1",
      reviews: [],
    },
    {
      id: 2,
      name: "Hotel 2",
      rating: 3,
      stars: 3,
      address: "Address 2",
      photo: "photo2",
      price: 200,
      description: "Description 2",
      reviews: [],
    },
    {
      id: 3,
      name: "Hotel 3",
      rating: 5,
      stars: 5,
      address: "Address 3",
      photo: "photo3",
      price: 150,
      description: "Description 3",
      reviews: [],
    },
  ];

  const filters: Filter = { name: "", rating: 0, minPrice: 150, maxPrice: 200 };
  const sort: Sort = { price: "asc" };
  const result = filterAndSort(hotels, filters, sort);
  expect(result).toEqual([
    {
      id: 3,
      name: "Hotel 3",
      rating: 5,
      stars: 5,
      address: "Address 3",
      photo: "photo3",
      price: 150,
      description: "Description 3",
      reviews: [],
    },
    {
      id: 2,
      name: "Hotel 2",
      rating: 3,
      stars: 3,
      address: "Address 2",
      photo: "photo2",
      price: 200,
      description: "Description 2",
      reviews: [],
    },
  ]);

  const filters2: Filter = {
    name: "",
    rating: 0,
    minPrice: 150,
    maxPrice: 200,
  };
  const sort2: Sort = { price: "desc" };
  const result2 = filterAndSort(hotels, filters2, sort2);
  expect(result2).toEqual([
    {
      id: 2,
      name: "Hotel 2",
      rating: 3,
      stars: 3,
      address: "Address 2",
      photo: "photo2",
      price: 200,
      description: "Description 2",
      reviews: [],
    },
    {
      id: 3,
      name: "Hotel 3",
      rating: 5,
      stars: 5,
      address: "Address 3",
      photo: "photo3",
      price: 150,
      description: "Description 3",
      reviews: [],
    },
  ]);
});

test("filterAndSort with name filter", () => {
  const hotels: Hotel[] = [
    {
      id: 1,
      name: "Hotel 1",
      rating: 4,
      stars: 4,
      address: "Address 1",
      photo: "photo1",
      price: 100,
      description: "Description 1",
      reviews: [],
    },
    {
      id: 2,
      name: "Hotel 2",
      rating: 3,
      stars: 3,
      address: "Address 2",
      photo: "photo2",
      price: 200,
      description: "Description 2",
      reviews: [],
    },
    {
      id: 3,
      name: "Hotel 3",
      rating: 5,
      stars: 5,
      address: "Address 3",
      photo: "photo3",
      price: 150,
      description: "Description 3",
      reviews: [],
    },
  ];
  const filters: Filter = {
    name: "hotel 1",
    rating: 0,
    minPrice: 0,
    maxPrice: 200,
  };
  const sort: Sort = { price: "asc" };
  const result = filterAndSort(hotels, filters, sort);
  expect(result).toEqual([
    {
      id: 1,
      name: "Hotel 1",
      rating: 4,
      stars: 4,
      address: "Address 1",
      photo: "photo1",
      price: 100,
      description: "Description 1",
      reviews: [],
    },
  ]);
});

test("filterAndSort with desc order", () => {
  const hotel: Hotel[] = [
    {
      id: 1,
      name: "Hotel 1",
      rating: 4,
      stars: 4,
      address: "Address 1",
      photo: "photo1",
      price: 100,
      description: "Description 1",
      reviews: [],
    },
    {
      id: 2,
      name: "Hotel 2",
      rating: 3,
      stars: 3,
      address: "Address 2",
      photo: "photo2",
      price: 200,
      description: "Description 2",
      reviews: [],
    },
    {
      id: 3,
      name: "Hotel 3",
      rating: 5,
      stars: 5,
      address: "Address 3",
      photo: "photo3",
      price: 150,
      description: "Description 3",
      reviews: [],
    },
  ];
  const filters: Filter = { name: "", rating: 0, minPrice: 0, maxPrice: 200 };
  const sort: Sort = { price: "desc" };
  const result = filterAndSort(hotel, filters, sort);
  expect(result).toEqual([
    {
      id: 2,
      name: "Hotel 2",
      rating: 3,
      stars: 3,
      address: "Address 2",
      photo: "photo2",
      price: 200,
      description: "Description 2",
      reviews: [],
    },
    {
      id: 3,
      name: "Hotel 3",
      rating: 5,
      stars: 5,
      address: "Address 3",
      photo: "photo3",
      price: 150,
      description: "Description 3",
      reviews: [],
    },
    {
      id: 1,
      name: "Hotel 1",
      rating: 4,
      stars: 4,
      address: "Address 1",
      photo: "photo1",
      price: 100,
      description: "Description 1",
      reviews: [],
    },
  ]);
});

test("filterSearch with lowercase", () => {
  const reviews = [
    {
      rating: 5,
      user: {
        name: "User 1",
        location: "Location 1",
      },
      title: "Review 1",
      description: "Description 1",
    },
    {
      user: {
        name: "User 2",
        location: "Location 2",
      },
      rating: 3,
      title: "Review 2",
      description: "Description 2",
    },
  ];
  const result = filterSearch("review 1", reviews);
  expect(result).toEqual([
    {
      rating: 5,
      user: {
        name: "User 1",
        location: "Location 1",
      },
      title: "Review 1",
      description: "Description 1",
    },
  ]);
});
