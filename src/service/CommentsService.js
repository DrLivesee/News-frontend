import $comments from "@/http/comments";

export async function getComments() {
  return $comments.get("/");
}

export async function getCommentById(id) {
  return $comments.get(`/${id}`);
}

export async function deleteCommentById(id) {
  return $comments.delete(`/${id}`);
}

export async function addComment(comment) {
  return $comments.post("/", comment);
}

export async function patchComment(commentId, comment) {
  return $comments.patch(`/${commentId}`, comment);
}
