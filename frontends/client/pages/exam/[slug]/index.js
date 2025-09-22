import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import Courses from "@/data/courses";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import ExamEnrolled from "@/modules/Exam/index";
 
const CourseDetailsModules = dynamic(() => import('src/modules/GradeDetail'), {
  loading: () => <Preloader />,
});

export default function CourseDetails() {
	const router = useRouter();
	const { asPath } = router;
	const courseSlug = asPath.split('/')[2];
	return (
		<main>
			<Header />

			<ExamEnrolled />

			<Footer />
		</main>
	)
}
