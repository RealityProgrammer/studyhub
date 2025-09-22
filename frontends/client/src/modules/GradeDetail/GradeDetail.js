import Courses from "@/data/courses.json";
import Link from "next/link";
import {useEffect, useState} from "react";
import CourseContent from "./CourseContent";
import CourseInfo from "./GradeInfor";
import FeatureCourse from "./FeatureCourse";
import CourseDetailsSidebar from "./Sidebar";
import api from "/src/route/route"
import GradeInfo from "./GradeInfor";

export default function GradeDetail(props) {
	let {type, item} = props;
	if (!item) {
		item = Courses[0]
	}
	if (!item || item.length < 1) {
		item = Courses[0];
	}

	const grade = item[0] || {};
	const teacher = item[1] || {};
	const [timetables, setTimetables] = useState([]);
	useEffect(() => {
		if (grade?.id) {
			api.getTimetable(grade.id)
				.then(res => {
					setTimetables(res.content || []);
				})
		}
	}, [grade.id]);

	const [activeTab, setActiveTab] = useState("timetable");

	function handleTab(tab) {
		setActiveTab(tab);
	}

	return (
		<>
			<div className="rts-course-area rts-section-gap">
				<div className="container">
					<div className="">
						<div className=" order-cl-1 order-lg-1 order-md-2 order-sm-2 order-2">
							<div className="course-top-enroll-area1 ">
							</div>

							<div className="course-details-btn-wrapper materials full-width pb--50">
								<ul className="nav nav-tabs" id="myTab" role="tablist">
									<li className="nav-item" role="presentation">
										<button 
											className={`nav-link meterals ${activeTab === "timetable" && 'active'}`}
											aria-selected={activeTab === "course"}
											onClick={() => handleTab('timetable')}
										>
											<i className="far fa-calendar"></i>
											Thời khóa biểu
										</button>
									</li>
									<li className="nav-item" role="presentation">
										<button 
											className={`nav-link meterals ${activeTab === "materials" && 'active'}`}
											aria-selected={activeTab === "materials"}
											onClick={() => handleTab('materials')}
										>
											<i className="fa-solid fa-calendar-week"></i>
											Chi tiết
										</button>
									</li>
								</ul>
							</div>
							<div>
								<a href="http://localhost:3002/react-rtc-demo" style={{  fontSize: "13px",width: "80px", height: "43px",marginTop: "1%",}} className="btn btn-success">Phòng học</a>
							</div>
							<div className="tab-content mt--50" id="myTabContent">
								{
									activeTab === "timetable" ?
										<>
											<GradeInfo item={timetables.length > 0 ? timetables : []} />
										</> :
												<CourseContent item={timetables.length > 0 ? timetables : []}/>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
			{/*<FeatureCourse />*/}
		</>
	)
}
