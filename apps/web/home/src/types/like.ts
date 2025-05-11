type Target = "post" | "comment";

interface LikeBody {
  email: string;
  target: Target;
}

interface NewLikeBody {
  email: string;
  target: Target;
}

interface DeleteLikeParams {
  email: string;
  target: Target;
}

export type { LikeBody, NewLikeBody, DeleteLikeParams };
