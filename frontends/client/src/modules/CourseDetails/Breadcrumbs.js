import Courses from "@/data/courses.json";
import Image from "next/image";
import Link from "next/link";

export default function CourseDetailsBreadcrumbs(props) {
	let {type, item} = props;

	if (!item) {
		item = Courses[0]
	}

	const { title, authorName, category, studentCount, ratingCount, updateDate, img } = item;

	return (
		<div className="course-details-breadcrumb-1 bg_image rts-section-gap">
			<style>
				{`.rts-section-gap {
					padding: 24px 0 !important;
				}`}
			</style>
			<div className="container">
				<div className="row">
					<div className={`col-lg-12 ${type==='three' && "center-align-course-breadcrumb"}`}>
						<div className="single-course-left-align-wrapper">
							<div className="meta-area">
								<Link href="/">Home</Link>
								<i className="fa-solid fa-chevron-right"></i>
								<a className="active" href="#">Course Details</a>
							</div>
							<h1 className="title">
								{title }
							</h1>
							<div className="rating-area">
								<div className="stars-area">
									<span>{ratingCount || 4.5}</span>
									<i className="fa-solid fa-star"></i>
									<i className="fa-solid fa-star"></i>
									<i className="fa-solid fa-star"></i>
									<i className="fa-solid fa-star"></i>
									<i className="fa-regular fa-star"></i>
								</div>
								<div className="students">
									<i className="far fa-users"></i>
									<span>{studentCount || "3054"} Học viên</span>
								</div>
								<div className="calender-area-stars">
									<i className="far fa-calendar-alt"></i>
									<span>Ngày cập nhật: {new Date(updateDate).toLocaleDateString("hi-IN") || "12/2024"}</span>
								</div>
							</div>
							<div className="author-area">
								<div className="author">
									<Image src={img } width="40" height="40" alt="breadcrumb" />
									<h6 className="name"> {authorName || "William U."}</h6>
								</div>
								<p> <span>Danh mục: </span> {category || "Web Developments"}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>					
	)
}
