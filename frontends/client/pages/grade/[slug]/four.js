import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import Courses from "@/data/courses";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import  api from "/src/route/account"
import {useEffect, useState} from "react";
import GradeDetailsModulesFour from "@/modules/GradeDetail/Four";
const CourseDetailsModulesFour = dynamic(() => import('@/modules/GradeDetail/Four'), {
  loading: () => <Preloader />,
});

export default function CourseDetails() {
	const router = useRouter();
	const { asPath } = router;
	const [Grade, setGrade] = useState(null);
	const [teacher, setTeacher] = useState(null);

	useEffect( () => {
		if (!asPath.includes('?')) return;
		const queryCode = asPath.split('?')[1];
		setGrade(JSON.parse(decodeURIComponent(queryCode))	);
	}, [asPath]);
	useEffect(()=>{
		if (Grade !== null) {
			api.getAccount(Number(Grade.teacherId)).then(response => {
				setTeacher(response);
			})
		}
	},[Grade])
	return (
		<main>
			<Header />

			<GradeDetailsModulesFour item={[Grade,teacher]} />

			<Footer />
		</main>
	)
}
