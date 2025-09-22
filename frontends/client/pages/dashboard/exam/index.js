import Preloader from '@/components/Preloader';
import DashboardLayout from '@/layout/Dashboard';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import dynamic from 'next/dynamic';
 
const DashboardExam = dynamic(() => import('@/modules/Dashboard/Exam'), {
  loading: () => <Preloader />,
});

export default function Exam() {
	useAuthRedirect();
	
	return (
		<DashboardLayout>
			<DashboardExam />
		</DashboardLayout>
	)
}
