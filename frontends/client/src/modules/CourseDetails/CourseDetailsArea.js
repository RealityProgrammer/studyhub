import Courses from "@/data/courses.json";
import { useState } from "react";
import CourseContent from "./CourseContent";
import CourseInfo from "./CourseInfo";
import CourseInstructor from "./CourseInstructor";
import CourseReview from "./CourseReview";
import RelatedCourse from "./RelatedCourse";
import CourseDetailsSidebar from "./Sidebar";

export default function CourseDetailsArea(props) {
	let {item} = props;
	if (!item) {
		item = Courses[0]
	}
	
	const [activeTab, setActiveTab] = useState("info");

	function handleTab(tab) {
		setActiveTab(tab);
	}

	return (
		<div className="rts-course-area rts-section-gap">
			<div className="container">
				<div className="row g-5">
					<div className="col-lg-8 order-cl-1 order-lg-1 order-md-2 order-sm-2 order-2">
						<div className="course-details-btn-wrapper pb--50">
							<ul className="nav nav-tabs" id="myTab" role="tablist">
								<li className="nav-item" role="presentation">
									<button className={`nav-link ${activeTab === "info" && 'active'}`} onClick={() => handleTab('info')}>Course Information</button>
								</li>
								<li className="nav-item" role="presentation">
									<button className={`nav-link ${activeTab === "content" && 'active'}`} onClick={() => handleTab('content')}>Course Content</button>
								</li>
								<li className="nav-item" role="presentation">
									<button className={`nav-link ${activeTab === "instructor" && 'active'}`} onClick={() => handleTab('instructor')}>Instructor</button>
								</li>
								<li className="nav-item" role="presentation">
									<button className={`nav-link ${activeTab === "review" && 'active'}`} onClick={() => handleTab('review')}>Review</button>
								</li>
							</ul>
						</div>
						<div className="tab-content mt--50" id="myTabContent">
							{
								activeTab === "content" ?
									<CourseContent /> :
									activeTab === "instructor" ?
										<CourseInstructor /> :
										activeTab === "review" ?
											<CourseReview /> :
											<CourseInfo />
							}
						</div>
						<RelatedCourse />
					</div>
					<div className="col-lg-4 order-cl-2 order-lg-2 order-md-1 order-sm-1 order-1  rts-sticky-column-item">
						<CourseDetailsSidebar
							item={item}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
