import Preloader from '@/components/Preloader';
import Header from '@/layout/Header';
import dynamic from 'next/dynamic';

const SignUpModule = dynamic(() => import('pages/auth/SignUp'), {
  loading: () => <Preloader />,
});


export default function Home() {

	return (
		<main>
			<Header
				authenticationHeader
			/>

			<SignUpModule />
		</main>
	)
}
