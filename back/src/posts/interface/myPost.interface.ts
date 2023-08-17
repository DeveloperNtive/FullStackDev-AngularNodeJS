export interface IMyPost {
  tittle: string;
  message: string;
  date: string;
  hour: string;
  autor: string;
}

export interface IAllPost {
  tittle: string;
  message: string;
  date: string;
  hour: string;
  autor: string;
}

export interface IResponseMyPost {
  statusCode: string;
  token: string;
  posts: IMyPost[];
}

export interface IErrorResponseMyPost {
  statusCode: string;
  message: string;
}

export interface Post {
  data: IMyPost[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}
