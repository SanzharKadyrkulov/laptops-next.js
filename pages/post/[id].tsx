/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { MainLayout } from '../../components/MainLayout';
import Link from 'next/link';
import { NextPageContext } from 'next';
import { MyPost } from '../../interfaces/post';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchOnePost } from '../../store/actions/postAction';

interface PostPageProps {
	post: MyPost;
}

export default function Post({ post: serverPost }: PostPageProps) {
	const { query } = useRouter();
	const dispatch = useDispatch();
	// const [post, setPost] = useState(serverPost);
	// useEffect(() => {
	//   const load = async () => {
	//     const response = await fetch(
	//       `${process.env.API_URL}/posts/${router.query.id}`
	//     );
	//     const data = await response.json();
	//     setPost(data);
	//   };
	//   if (!serverPost) {
	//     load();
	//   }
	// }, []);
	// if (!post) {
	//   return (
	//     <MainLayout>
	//       <h1>Loading...</h1>
	//     </MainLayout>
	//   );
	// }
	const { post } = useTypedSelector((state) => state.post);
	useEffect(() => {
		dispatch(fetchOnePost(+query.id));
	}, []);
	return (
		<>
			<MainLayout>
				<h1>{post?.title}</h1>
				<p>{post?.body}</p>
				<Link href='/posts'>
					<a>Back to all posts</a>
				</Link>
			</MainLayout>
		</>
	);
}

interface PostNextPageContext extends NextPageContext {
	query: {
		id: string;
	};
}
Post.getInitialProps = async ({ query, req }: PostNextPageContext) => {
	// if (!req) {
	//   return { post: null };
	// }
	const response = await fetch(`${process.env.API_URL}/posts/${query.id}`);
	const post: MyPost = await response.json();

	return {
		post,
	};
};

// export async function getServerSideProps({ query, req }) {
//   // if (!req) {
//   //   return { post: null };
//   // }
//   const response = await fetch(`http://localhost:4200/posts/${query.id}`);
//   const post = await response.json();

//   return {
//     props: { post },
//   };
// }
