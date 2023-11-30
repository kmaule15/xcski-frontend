export interface CommentInterface {
  id: number;
  content: string;
  userId: number;
  postId?: number | null;
  trailId?: number | null;
  createdAt: string;
  updatedAt: string;
  childComments?: CommentInterface[];
}
