export interface IMyPostsResponse {
  token: string;
  posts: posts;
  totalPosts: number;
}

export interface IPosts {
  tittle: string;
  message: string;
  date: string;
  hour: string;
  autor: string;
}

export interface posts {
  data: IPosts[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}
