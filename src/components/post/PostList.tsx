import { db } from '@/firebase.config';
import { Post } from '@/utils/types';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import PostForm from './PostForm';
import PostItem from './PostItem';
import { Button } from '../ui/button';

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [lastFetchedPost, setLastFetchedPost] = useState<any | null>(null);
  console.log(lastFetchedPost);
  const fetchAllPosts = async () => {
    try {
      const q = query(
        collection(db, 'posts'),
        orderBy('timestamp', 'desc'),
        limit(3)
      );
      const allPosts = await getDocs(q);
      const lastVisible = allPosts.docs[allPosts.docs.length - 1];
      setLastFetchedPost(lastVisible);
      const postsData = allPosts.docs.map((val) => ({
        id: val.id,
        ...val.data(),
      })) as Post[];
      setIsEmpty(allPosts.size < 3);
      setPosts(postsData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOnLoadMore = async () => {
    try {
      const q = query(
        collection(db, 'posts'),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedPost),
        limit(3)
      );
      const allPosts = await getDocs(q);
      const lastVisible = allPosts.docs[allPosts.docs.length - 1];
      setLastFetchedPost(lastVisible);
      const postsData = allPosts.docs.map((val) => ({
        id: val.id,
        ...val.data(),
      })) as Post[];
      setIsEmpty(allPosts.size < 3);
      setPosts((prev) => [...prev, ...postsData]);
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
      <div className="text-center">
        {!isEmpty && <Button onClick={fetchOnLoadMore}>Load more</Button>}
      </div>
    </div>
  );
}

export default PostList;
