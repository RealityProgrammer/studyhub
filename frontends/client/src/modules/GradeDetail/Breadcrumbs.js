import Courses from "@/data/courses.json";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GradeDetailsBreadcrumbs(props) {
	let { type, item } = props;

	if (!item || item.length < 1) {
		item = Courses[0];
	}

	const grade = item[0] || {};
	const teacher = item[1] || {};

	const {
		id,
		name = "Khóa học mặc định",
		remain_student,
		start_date,
		teacherName = "Giáo viên không xác định",
		teacherId,
		url,
	} = grade;

	const imageUrl = teacher.imageUrl || "/default-avatar.jpg";

	return (
		<div className="course-details-breadcrumb-1 bg_image rts-section-gap">
			<style>
				{`.rts-section-gap {
					padding: 24px 0 !important;
				}`}
			</style>
			<div className="container">
				<div className="row">
					<div className={`col-lg-12 ${type === "three" && "center-align-course-breadcrumb"}`}>
						<div className="single-course-left-align-wrapper">
							<div className="meta-area">
								<Link href="/">Home</Link>
								<i className="fa-solid fa-chevron-right"></i>
								<a className="active" href="#">Grade</a>
							</div>
							<h1 className="title">{name}</h1>
							<div className="author-area">
								<div className="author">
									<Image src={imageUrl} width="40" height="40" alt="breadcrumb" />
									<h6 className="name">{teacherName}</h6>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
