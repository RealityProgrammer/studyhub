import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function MenuItems(props) {
	const isLoggedIn = useSelector((state) => state.user.admin);
	
	return (
		<div className="main-nav-one">
			<nav>
				<ul>
					<li>
						<Link className="nav-link" href="/">Trang chủ</Link>
					</li>

					<li className="">
						<Link className="nav-link" href="/course">Khóa học</Link>
					</li>
					<li className="">
						<Link className="nav-link" href="/exam/exam">Luyện đề</Link>
					</li>
					<li className="">
						<Link className="nav-link" href="/instructor">Giáo viên</Link>
					</li>

			


				</ul>
			</nav>
		</div>
	)
}
