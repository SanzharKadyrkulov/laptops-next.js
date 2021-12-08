import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { MainLayout } from "../components/MainLayout";
import { NextPageContext } from "next";
import { Post } from "../types/post";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../store/actions/postAction";
import { wrapper } from "../pages/_app";

interface PostsPageProps {
  posts: Post[];
}

export default function Posts({ posts: serverPosts }: PostsPageProps) {
  // const [posts, setPosts] = useState(serverPosts);
  // useEffect(() => {
  //   async function load() {
  //     const response = await fetch(`${process.env.API_URL}/posts`);
  //     const json = await response.json();
  //     setPosts(json);
  //   }
  //   if (!serverPosts) load();
  // }, []);

  // if (!posts) {
  //   return (
  //     <MainLayout>
  //       <h1>Loading...</h1>
  //     </MainLayout>
  //   );
  // }

  const { posts } = useTypedSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      <MainLayout>
        <Head>
          <title>Posts Page</title>
        </Head>
        <h1>Posts Page</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/post/[id]`} as={`/post/${post.id}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </MainLayout>
    </>
  );
}

// Posts.getInitialProps = async ({ req, store }: NextPageContext) => {
//   if (!req) {
//     return { posts: null };
//   }
//   const response = await fetch(`${process.env.API_URL}/posts`);
//   const posts: Post[] = await response.json();
//   return {
//     posts,
//   };
// };

// Posts.getInitialProps = wrapper.getInitialPageProps(
//   (store) =>
//     ({ pathname, req, res }) => {
//       if (!req) {
//         return { posts: null };
//       }
//       let dispatch = store.dispatch
//       dispatch(fetchPosts())
//     }
// );
