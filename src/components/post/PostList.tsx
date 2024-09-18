import { db } from '@/firebase.config';
import { Post } from '@/utils/types';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import PostForm from './PostForm';
import PostItem from './PostItem';

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchAllPosts = async () => {
    try {
      const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
      const allPosts = await getDocs(q);
      const postsData = allPosts.docs.map((val) => ({
        id: val.id,
        ...val.data(),
      })) as Post[];
      setPosts(postsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div className="my-4 space-y-2 max-w-5xl mx-auto">
      <PostForm fetchAllPosts={fetchAllPosts} />
      <h1 className="text-center font-bold text-xl">All Posts</h1>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} fetchAllPosts={fetchAllPosts} />
      ))}
    </div>
  );
}

export default PostList;
