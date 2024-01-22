import { Post, PostType } from "../Post/Post";

type Props = {
  posts: PostType[];
};

export const PostList = ({ posts }: Props) => (
  <div>
    {posts.map((post) => (
      <Post key={post.id} post={post}></Post>
    ))}
  </div>
);
