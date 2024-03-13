import $news from "@/http/news";

export async function getNews(page, limit, searchQuery,sort) {
  return $news.get("/", {params: {
    page: page,
    limit: limit,
    searchQuery: searchQuery,
    sort: sort
  }});
}

export async function getNewsById(id) {
  return $news.get(`/${id}`);
}

export async function deleteNewsById(id) {
  return $news.delete(`/${id}`);
}

export async function addNews(news) {
  return $news.post("/", news);
}

export async function patchNews(newsId,news) {
  return $news.patch(`/${newsId}`, news);
}

export async function getCommentsForNews(newsId, sort) {
  return $news.get(`/${newsId}/comments`, {
    params: {
      sort: sort
    }
  });
}
