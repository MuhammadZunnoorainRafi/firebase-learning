import { db } from '@/firebase.config';
import { Post } from '@/utils/types';
import {
  Pencil2Icon,
  ReloadIcon,
  SectionIcon,
  StarFilledIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import PostForm from './PostForm';

type Props = {
  post: Post;
  fetchAllPosts: () => Promise<void>;
};
function PostItem({ post, fetchAllPosts }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deletePost = async (id: string) => {
    setIsDeleting(true);
    const docRef = doc(db, 'posts', id);
    await deleteDoc(docRef);
    await fetchAllPosts();
    setIsDeleting(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEdit(false);
    }
  };

  const onEditChange = () => {
    if (isEdit) {
      setIsEdit(false);
    }
  };

  document.addEventListener('keydown', onKeyDown);

  if (isEdit) {
    return (
      <PostForm
        fetchAllPosts={fetchAllPosts}
        post={post}
        onEditChange={onEditChange}
      />
    );
  }
  return (
    <div>
      <Card className="flex items-center justify-between p-2">
        <div className="flex items-center justify-center gap-[2px] flex-[0.2]">
          {post.imageUrls.map((url) => (
            <img key={url} src={url} alt="img err" className="w-7 h-7" />
          ))}
        </div>
        <div className="flex-[0.2]">
          <h1 className="font-semibold">{post.title}</h1>
          <p>{post.description}</p>
        </div>
        <div className="flex items-center justify-center gap-1 flex-[0.1]">
          <SectionIcon className="h-5 w-5" />
          <p className="uppercase">{post.category}</p>
        </div>
        <div className="flex items-center justify-center gap-1 flex-[0.1]">
          <StarFilledIcon className="h-5 w-5" />
          <p>{post.star}</p>
        </div>
        <div className="flex-[0.1]">$ {post.price}</div>
        <Button
          asChild
          size="icon"
          variant="ghost"
          className="hover:cursor-pointer"
          //   onClick={likeClick}
        >
          <div className="flex items-center justify-center gap-1">
            {/* {post.Like.find(
            (val) => val.userId === user?.id && val.postId === post.id
          ) ? (
            <HeartFilledIcon className="h-4 w-4 text-red-500" />
          ) : (
            <HeartIcon className="h-4 w-4 text-red-500" />
          )} */}

            {/* <p className="text-sm">{post.Like.length}</p> */}
          </div>
        </Button>
        <Button
          asChild
          size="icon"
          variant="ghost"
          className="hover:cursor-pointer"
          onClick={() => setIsEdit(true)}
        >
          <div className="flex items-center justify-center gap-1">
            <Pencil2Icon className="h-4 w-4 " />
          </div>
        </Button>
        <Button
          disabled={isDeleting}
          onClick={() => deletePost(post.id)}
          asChild
          size="icon"
          variant="ghost"
          className="hover:cursor-pointer hover:bg-red-500"
        >
          <div className="flex items-center justify-center gap-1">
            {isDeleting ? (
              <ReloadIcon className="h-4 w-4 animate-spin" />
            ) : (
              <TrashIcon className="h-4 w-4" />
            )}
          </div>
        </Button>
      </Card>
    </div>
  );
}

export default PostItem;
