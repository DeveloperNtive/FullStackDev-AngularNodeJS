export interface NewPost {
  tittle: string;
  message: string;
  userId: string;
}
export interface IResponsePost {
  statusCode: string;
  token: string;
  post: {
    tittle: string;
    message: string;
  };
}

export interface IErrorResponsePost {
  statusCode: string;
  message: string;
}
