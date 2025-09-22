import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import dynamic from 'next/dynamic';

const CourseFourModule = dynamic(() => import('@/modules/Course/Four'), {
	loading: () => <Preloader />,
});

export default function Course() {
	return (
		<main>
			<CourseFourModule />
		</main>
	)
}
