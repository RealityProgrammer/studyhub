import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import Instructors from "@/data/instructors";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {useEffect, useState} from "react";
import api from "@/route/teacher";
 
const InstructorDetailsModules = dynamic(() => import('@/modules/InstructorDetails'), {
  loading: () => <Preloader />,
});

export default function InstructorDetails() {
	const router = useRouter();
	const { slug } = router.query;
	const [data, setData] = useState();

	useEffect(() => {
		if (slug) {
			api.getInforTeacher(slug)
				.then(res => {
					setData(res);
				})
				.catch(err => console.error(err));
		}
	}, [slug]);

	if (!data) {
		return <Preloader />;
	}
	return (
		<main>
			<Header />

			<InstructorDetailsModules item={data} />

			<Footer />
		</main>
	)
}
