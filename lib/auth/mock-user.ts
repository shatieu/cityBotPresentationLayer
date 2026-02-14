export interface MockUser {
  id: string;
  name: string;
  email: string;
  preferences: {
    favorite_domains: string[];
    dietary_filters: string[];
    favorite_places: string[];
  };
}

export const defaultMockUser: MockUser = {
  id: "user-1",
  name: "Jan Novotný",
  email: "jan@example.com",
  preferences: {
    favorite_domains: ["restaurants", "wine", "events"],
    dietary_filters: ["vegetarian"],
    favorite_places: ["restaurace-u-karla", "znovin-znojmo"],
  },
};
