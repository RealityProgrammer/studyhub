import Preloader from '@/components/Preloader';
import Header from '@/layout/Header';
import dynamic from 'next/dynamic';

const SignInModule = dynamic(() => import('pages/auth/SignIn'), {
  loading: () => <Preloader />,
});


export default function Home() {

	return (
		<main>
			<Header 
				authenticationHeader
			/>
			
			<SignInModule />
		</main>
	)
}
