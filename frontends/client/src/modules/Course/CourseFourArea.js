import CourseSidebar from "@/components/Course/CourseSidebar";
import SingleCourseThree from "@/components/Course/Three";
import PagiCourse from "../../../pages/course/[slug]/pagiCourse";
import SingleCourse from "@/components/Course";

export default function CourseFourArea() {

	return (
		<div className="rts-course-default-area rts-section-gap">
			<div className="container">
				<div className="row g-5">
					<div className="col-lg-3">
						<CourseSidebar />
					</div>
					<div className="col-lg-9">
						<PagiCourse/>
					</div>
				</div>
			</div>
		</div>
	)
}
