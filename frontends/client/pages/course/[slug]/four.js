import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import Courses from "@/data/courses";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import  api from "/src/route/route"
import {useEffect, useState} from "react";
const CourseDetailsModulesFour = dynamic(() => import('@/modules/CourseDetails/Four'), {
  loading: () => <Preloader />,
});

export default function CourseDetails() {
	const router = useRouter();
	const { asPath } = router;
	const [code,setCode] = useState("");
	const [course, setCourse] = useState(null);
	useEffect(() => {
		if (!asPath.includes('?')) return;
		const queryCode = asPath.split('?')[1].slice(0,4);
		setCode(queryCode);
	}, [asPath]);
	useEffect(() => {
		if (!code) return;

		api.getCourse({ code, page: 0, size: 1 }).then((res) => {
			if (res.content.length > 0) {
				setCourse({
					author: res.content[0].name,
					authorName: res.content[0].name,
					bestSeller: false,
					category: res.content[0].categoryName,
					completePercent: "75",
					id: res.content[0].id,
					img: res.content[0].imageUrl,
					imgHeight: 210,
					imgWidth: 290,
					lessonCount: res.content[0].periods,
					level: res.content[0].aim,
					prevPrice: res.content[0].price,
					price: res.content[0].price - (res.content[0].discount * res.content[0].price) / 100,
					discount: res.content[0].discount,
					ratingCount: "4.6",
					slug: res.content[0].code,
					studentCount: "25",
					tag: res.content[0].categoryName,
					title: res.content[0].name,
					totalRating: "6",
					type: res.content[0].categoryName,
					updateDate: res.content[0].createdDate,
					description: res.content[0].description,
					code: res.content[0].code,
				});
			}
		});
	}, [code]);

	return (
		<main>
			<Header />

			<CourseDetailsModulesFour item={course} />

			<Footer />
		</main>
	)
}
