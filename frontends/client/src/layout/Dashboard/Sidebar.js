import { clearUserData } from '@/redux/user/actionCreator';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export default function DashboardSidebar() {
	const router = useRouter();
	const { asPath } = router;
	const dashboardSlug = asPath.split('/')[1];
	const dashboardItemSlug = asPath.split('/')[2];

	const dispatch = useDispatch();


	return (
		<div className="left-sindebar-dashboard theiaStickySidebar">
			<div className="dashboard-left-single-wrapper">
				{/* single item */}
				{/*<Link*/}
				{/*	href="/dashboard" */}
				{/*	className={`single-item ${dashboardSlug === "dashboard" && dashboardItemSlug === undefined ? "active" : ""}`}*/}
				{/*>*/}
				{/*	<i className="fa-light fa-house"></i>*/}
				{/*	<p>Dashboard</p>*/}
				{/*</Link>*/}
				{/* single item end */}
				{/* single item */}
				<Link
					href="/dashboard/profile" 
					className={`single-item ${dashboardItemSlug === "profile" ? "active" : ""}`}
				>
					<i className="fa-regular fa-user"></i>
					<p>Thông tin cá nhân</p>
				</Link>
				<Link
					href="/dashboard/order"
					className={`single-item ${dashboardItemSlug === "order" ? "active" : ""}`}
				>
					<i className="fa-sharp fa-light fa-bag-shopping"></i>
					<p>Khóa học đã mua </p>
				</Link>
				{/* single item end */}
				{/* single item */}
				<Link
					href="/dashboard/enrolled" 
					className={`single-item ${dashboardItemSlug === "enrolled" ? "active" : ""}`}
				>
					<i className="fa-light fa-graduation-cap"></i>
					<p>Lớp</p>
				</Link>
				{/* single item end */}
				<Link
					href="/dashboard/point"
					className={`single-item ${dashboardItemSlug === "point" ? "active" : ""}`}
				>
					<i className="fa fa-chart-line" style={{fontSize: '18px', color: 'currentColor'}}></i>
					<p>Điểm</p>
				</Link>
			</div>
		</div>
	)
}
