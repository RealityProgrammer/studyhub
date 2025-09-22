import Courses from "@/data/courses.json";
import Link from "next/link";
import { useState } from "react";
import CourseContent from "./CourseContent";
import CourseInfo from "./CourseInfo";
import FeatureCourse from "./FeatureCourse";
import CourseDetailsSidebar from "./Sidebar";
import {formatCurrency} from "@/utils/utils";
import api from "/src/route/route"
import bill from "/src/route/bill";

export default function CourseDetailsAreaFour(props) {
	let {type, item} = props;
	if (!item) {
		item = Courses[0]
	}
	bill.getCourseInBill({courseId:item.id})
		.then(response => {
			if (response.data != null) {
				api.getGradeByCourseAndUser({id : item.id})
					.then(response => {
						if(response.code == 200) {
							document.getElementById("checkGrade").innerHTML = `<button class="rts-btn btn-primary " style="padding: 1%;margin-bottom : 1%"> ${response.data.name} </button>`
						}
					})
			}else {
				const element = document.querySelector(".course-top-enroll-area1");
				if (element) {
					element.setAttribute("class", "d-none");
				}

				// document.querySelector(".course-top-enroll-area1").setAttribute("class","d-none")
			}
		})


	const [activeTab, setActiveTab] = useState("course");

	function handleTab(tab) {
		setActiveTab(tab);
	}

	return (
		<>
			<div className="rts-course-area rts-section-gap">
				<div className="container">
					<div className="row g-5">
						<div className="col-lg-8 order-cl-1 order-lg-1 order-md-2 order-sm-2 order-2">
							<div className="course-top-enroll-area1 ">
								<div className="single-course-top " id="checkGrade">
									<a href="/dashboard/enrolled" className="rts-btn btn-primary" style={{padding: "1%",marginBottom : "1%"}}> Đăng kí lớp </a>
								</div>

							</div>

							<div className="course-details-btn-wrapper materials full-width pb--50">
								<ul className="nav nav-tabs" id="myTab" role="tablist">
									<li className="nav-item" role="presentation">
										<button 
											className={`nav-link meterals ${activeTab === "course" && 'active'}`} 
											aria-selected={activeTab === "course"}
											onClick={() => handleTab('course')}
										>
											<i className="far fa-calendar"></i>
											Mô tả
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

							<div className="tab-content mt--50" id="myTabContent">
								{
									activeTab === "course" ?
										<>
											<CourseInfo item={item} />
										</> :
												<CourseContent item={item}/>
								}
							</div>
						</div>
						<div className="col-lg-4 order-cl-2 order-lg-2 order-md-1 order-sm-1 order-1  rts-sticky-column-item">
							<CourseDetailsSidebar
								type={type}
								item={item}
							/>
						</div>
					</div>
				</div>
			</div>
			{/*<FeatureCourse />*/}
		</>
	)
}
