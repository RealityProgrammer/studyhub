import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ex from '@/route/exam';

const ExamDetails = dynamic(() => import('@/modules/ShowExamDetails'), {
    loading: () => <Preloader />,
});

export default function QuizDetails() {
    useAuthRedirect();
    const router = useRouter();
    const { slug } = router.query;
    const [data, setData] = useState();

    useEffect(() => {
        if (slug) {
            console.log('ID:', slug);
            ex.getExamByCode(slug)
                .then(res => {
                    console.log('Exam details:', res);
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
            <ExamDetails item={data} />
            <Footer CTAEnable="one" />
        </main>
    );
}
