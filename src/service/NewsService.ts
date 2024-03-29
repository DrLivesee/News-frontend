import $news from "@/http/news";

import { AxiosResponse } from "axios";
import { INews, ApiNewsResponse,ApiCommentsResponse, GetNewsParams, IPostNews, IPatchNews } from "@/interfaces";

export async function getNews(params:GetNewsParams): Promise<AxiosResponse<ApiNewsResponse>> {
  return $news.get("/", {params: params});
}

export async function getNewsById(id: string): Promise<AxiosResponse<INews>> {
  return $news.get(`/${id}`);
}

export async function deleteNewsById(id: string): Promise<AxiosResponse<void>> {
  return $news.delete(`/${id}`);
}

export async function addNews(news: IPostNews): Promise<AxiosResponse<INews>> {
  return $news.post("/", news);
}

export async function patchNews(newsId: string, news: IPatchNews): Promise<AxiosResponse<INews>> {
  return $news.patch(`/${newsId}`, news);
}

export async function getCommentsForNews(newsId: string, sort: string): Promise<AxiosResponse<ApiCommentsResponse>> {
  return $news.get(`/${newsId}/comments`, {
    params: {
      sort: sort
    }
  });
}
