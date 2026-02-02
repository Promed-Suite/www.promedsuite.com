/* eslint-disable no-console */
import { useQuery } from "@tanstack/react-query";
import { client } from "@workspace/api-client";

export type ContactPersonAPIResponse = {
  data: Daum[];
  pagination: Pagination;
};

export type Daum = {
  id: number;
  email: string;
  username: string;
  name: Name;
  address: Address;
  phone: string;
  orders: number[];
};

export type Name = {
  firstname: string;
  lastname: string;
};

export type Address = {
  street: string;
  city: string;
  zipcode: string;
  country: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
};

export function useGetCorporates() {
  const query = useQuery({
    queryKey: ["corporates"],
    queryFn: async () => {
      const response = await client.corporate.$get();

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries()),
      );

      // Call .json() ONCE and return the result
      const data = await response.json();
      console.log("Parsed data:", data);

      return data;
    },
  });

  return query;
}

// export function useGetCorporates() {
//   const query = useQuery({
//     queryKey: ["corporates"],
//     queryFn: async () => {
//       // await new Promise((resolve) => setTimeout(resolve, 5000));

//       const response = await client.benefits.$get();
//       // const response = await fetch("http://localhost:4000/");

//       console.log("Benefits>>>>>", response.json());
//       console.log("Benefits>>>>>", response);

//       return response.json();

//       // const response = await fetch("https://fakeapi.net/users");

//       // if (!response.ok) {
//       //   throw new Error("Failed to fetch corporates");
//       // }

//       // return response.json();
//     },
//   });

//   return query;
// }
