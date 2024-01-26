export interface GetUserSearches {
  user_id?: number;
}

export interface CreateSearches {
  user_id: number;
  url: string;
  description: string;
  query?: string;
}
