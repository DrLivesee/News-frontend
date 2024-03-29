export interface UserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  isAdmin: boolean;
}

export interface UserDataToValidate {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserDataToSignIn {
  email: string;
  password: string;
}

export interface IComment extends Document {
  _id: string;
  createdAt: Date;
  name: string;
  avatar: string;
  text: string;
  userId: string;
  newsId: string;
}

export interface INews extends Document {
  _id: string;
  author: string;
  published: string;
  image: string;
  title: string;
  description: string;
  content: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface ErrorResponse {
  message: string;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface ApiNewsResponse {
  news: INews[];
  totalDocuments: number;
}

export interface ApiCommentsResponse {
  comments: IComment[];
  totalDocuments: number;
}

export interface ApiValidateResponse {
  isValid: boolean;
  errors: { [key: string]: string } | {};
}

export interface PostImageResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface LoadingIconProps {
  size?: string;
  marginTop?: string;
  alignSelf?: string;
}

export interface GetNewsParams {
  page: number;
  limit: number;
  searchQuery: string;
  sort: string;
}


export interface IPostNews {
  author: string;
  image: string;
  title: string;
  description: string;
  content: string;
}

export interface IPatchNews {
  image?: string;
  title?: string;
  description?: string;
  content?: string;
}

export interface IPostComment {
  name: string;
  avatar: string;
  text: string;
  userId: string;
  newsId: string;
}

export interface IPatchComment {
  text: string;
}