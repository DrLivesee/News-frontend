import $comments from "@/http/comments";
import { AxiosResponse } from "axios";
import { IComment, ApiCommentsResponse,IPostComment, IPatchComment } from "@/interfaces";

export async function getComments(): Promise<AxiosResponse<ApiCommentsResponse>>  {
  return $comments.get("/");
}

export async function getCommentById(id: string): Promise<AxiosResponse<IComment>> {
  return $comments.get(`/${id}`);
}

export async function deleteCommentById(id: string): Promise<AxiosResponse<void>> {
  return $comments.delete(`/${id}`);
}

export async function addComment(comment: IPostComment): Promise<AxiosResponse<IComment>> {
  return $comments.post("/", comment);
}

export async function patchComment(commentId: string, comment: IPatchComment): Promise<AxiosResponse<IComment>> {
  return $comments.patch(`/${commentId}`, comment);
}
