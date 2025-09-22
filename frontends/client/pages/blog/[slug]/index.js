
import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import Blogs from "@/data/blogs";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
 
const BlogDetailsModules = dynamic(() => import('@/modules/BlogDetails'), {
  loading: () => <Preloader />,
});

export default function BlogDetails() {
	const router = useRouter();
	const { asPath } = router;
	const blogSlug = asPath.split('/')[2];

	const singleBlog = Blogs.find((blog) => {
        return blog?.slug === blogSlug;
    });

	console.log('blogSlug : ', blogSlug );

	return (
		<main>
			<Header />

			<BlogDetailsModules item={singleBlog} />

			<Footer />
		</main>
	)
}
