import SingleCourseTwo from "@/components/Course/Two";
import SwiperCore from 'swiper';
import {Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

import Courses from "@/data/courses.json";
import {useEffect, useState} from "react";
import ReactPaginate from 'react-paginate';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import apiBill from "/src/route/bill"
import api from "/src/route/route"
import {useSelector} from "react-redux";
import {formatDatee} from "@/utils/dateUtils";
import {formatCurrency} from "@/utils/utils";
SwiperCore.use([Navigation, Pagination]);
export default function DashboardEnrolled() {
	const [activeTab, setActiveTab] = useState("enrolled");
	const [Courses, setCourses] = useState([]);

	const [ totalPaginate, setTotalPaginate ] = useState( 0 );
	const [currentPage, setCurrentPage] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(6);
	const [ paginationKey, setPaginationKey ] = useState(Date.now());
	const [ forcePage, setForcePage ] = useState( 0 );
	const [openModal, setOpenModal] = useState(false);
	const paginatePerPage = 6;
	const [Grades, setGrade] = useState([]);
	const [checked, setChecked] = useState(forcePage);
	useEffect(() => {
			apiBill.getAllCourseEnrolled({page: currentPage,size:itemsPerPage}).then((res) => {
				setCourses(res.content);
				setTotalPaginate(res.totalPages)
			})
	}, [ currentPage, checked]);
	const sliderOptions = {
		slidesPerView: 6,
		spaceBetween: 20,
		loop: false,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			clickable: true,
			type: "fraction"
		},
		grid: {
			rows: 2,
			fill: "row",
		},
		breakpoints: {
			1240: {
				slidesPerView: 6,
				spaceBetween: 20,
			},
			740: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			320: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
		},
	};
	const callbackFunction = (data) => {
		api.getGradeByCourseId({id: data}).then((res) => {
			const gradeArray = []
			for (const grade of res.data) {
				const a = {
					id: grade.id,
					name: grade.name,
					remain_student: grade.remain_student,
					start_date: grade.start_date,
					study_date: grade.study_date,
					study_time: grade.study_time,
					url: grade.url,
					teacher: ""
				}
				for (const acc of grade.accountDto){
					for (const acc of grade.accountDto) {
						if (acc.roles.some(role => role.code === "TEACHER")) {
							a.teacher =  acc.fullName
						}
					}
				}
				gradeArray.push(a)
			}
			setGrade(gradeArray);
		}).then(setOpenModal(true))
	}
	function handleTab(tab) {
		setActiveTab(tab);
	}
	const handlePageChange = ( event ) => {
		const selectedPage = event.selected + 1;
		setStartItemCount( selectedPage * paginatePerPage - paginatePerPage );
		setEndItemCount( selectedPage * paginatePerPage );
	};

	const handlePaginateReset = () =>{
		setPaginationKey(Date.now());
		handlePageChange({ selected: 0 });
	}
	const signInGrade = async (e) => {
		e.preventDefault();
		const id = document.querySelector(".selectGrade").value
		api.signInGrade(id).then((res) => {
			if (res.code == 200) {
				setOpenModal(false)
				setChecked(prev => !prev)
			}
		})
	}
	return (
		<div className="exrolled-course-wrapper-dashed">
			<style jsx>{`
				.modal-overlay {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: rgba(0, 0, 0, 0.6);
					display: flex;
					align-items: center;
					justify-content: center;
					z-index: 1000;
				}
				.search-modal {
					width: 100%;
					background: white;
					padding: 25px;
					border-radius: 10px;
					max-width: 70%;
					box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
					position: relative;
					text-align: center;
					animation: fadeIn 0.3s ease-in-out;
				}
				@keyframes fadeIn {
					from {
						transform: scale(0.8);
						opacity: 0;
					}
					to {
						transform: scale(1);
						opacity: 1;
					}
				}
				.search-close-icon {
					position: absolute;
					top: 10px;
					right: 15px;
					font-size: 24px;
					cursor: pointer;
					color: #555;
					transition: color 0.3s;
				}

				.search-close-icon:hover {
					color: red;
				}
			`}</style>
			<div>
				{openModal && (
					<div className="modal-overlay" >
						<div className={"search-modal"}>
							<h5>Danh sách lớp học</h5>
							<select className="form-control form-control-lg selectGrade	">
								{
									Grades.map((grade, index) => {
										return(
											<option value={grade.id}>{grade.name} - {grade.teacher} - Còn: {grade.remain_student} học viên -
												Khai giảng: {formatDatee(grade.start_date)} - {grade.study_time} Thứ {grade.study_date}</option>
										)
									})
								}
							</select>
							<div className={"w-100"} style={{textAlign: "right"}}>
								<button className={"btn btn-primary w-25"} style={{fontSize: "14px", marginTop: "2%"}}
										onClick={(e)=>signInGrade(e)}>Đăng kí</button>
							</div>
							<div className="search-close-icon" onClick={() => setOpenModal(false)}>
								<i className="far fa-times"></i>
							</div>
						</div>
					</div>
				)}
			</div>
			{/*<h5 className="title">Lớp đăng kí</h5>*/}
			<ul className="nav nav-tabs" id="myTab" role="tablist">
				<li className="nav-item" role="presentation">
					<button 
						className={`nav-link ${activeTab === "enrolled" ? "active" : ""}`} 
						role="tab" 
						aria-selected={activeTab === "enrolled"}
						onClick={()=>{setActiveTab("enrolled")}}
					>
						Lớp
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button 
						className={`nav-link ${activeTab === "completed" ? "active" : ""}`} 
						role="tab" 
						aria-selected={activeTab === "completed"}
						onClick={()=>{setActiveTab("completed")}}
					>
						Đã hoàn thành
					</button>
				</li>
			</ul>
			<div className="tab-content mt--30">
				<div className={`tab-pane fade ${activeTab === "enrolled" ? "show active" : ""}`} role="tabpanel">
					<div className="row g-5">
						<style>{
								   `.swiper-slide { height: 20%; flex-basis: 31%; margin-bottom: 1%; } 
								   .mySwiper-category-1 .swiper-pagination {display: none }`
						}</style>
						<Swiper {...sliderOptions} className="mySwiper-category-1 swiper-float-right-course">
							{
								Courses.map((course, index) => {
									return (
										<SwiperSlide key={index}>
										<SingleCourseTwo
											id={course.id}
											parentCallback = {callbackFunction}
											Slug={course.code}
											Img={course.imageUrl}
											Category={course.categoryName}
											lessonCount={course.periods}
											studentCount="20"
											Title={course.name}
											Author={"Mục tiêu: "+course.aim}
											ratingCount={"5"}
											prevPrice={formatCurrency(course.price)}
											Price={formatCurrency(course.price - course.price*course.discount/100)}
											Level={course.aim}
											courseClass="single-course-style-three enroll-course"
											completePercent="80"
											status={course.status}
										/>
										</SwiperSlide>
									)
								}).slice(0, 6)
							}
						</Swiper>
					</div>
					<div className="col-lg-12 d-flex justify-content-center mt-3">
						<div
							onClick={() => currentPage > 0 && setCurrentPage(prev => prev - 1)}
							className={`mx-2 ${currentPage === 0 ? "disabled" : ""}`}
							style={{ cursor: currentPage === 0 ? "not-allowed" : "pointer", opacity: currentPage === 0 ? 0.5 : 1 }}
						>
							<i className="fa-solid fa-chevron-left" style={{ fontSize: "20px", color: "#553cdf" }}></i>
						</div>

						<span className="mx-2" style={{ fontSize: "18px", fontWeight: "bold" }}>
                        	{currentPage + 1} / {totalPaginate}
                 		</span>

						<div
							onClick={() => currentPage + 1 < totalPaginate && setCurrentPage(prev => prev + 1)}
							className={`mx-2 ${currentPage + 1 === totalPaginate ? "disabled" : ""}`}
							style={{ cursor: currentPage + 1 === totalPaginate ? "not-allowed" : "pointer", opacity: currentPage + 1 === totalPaginate ? 0.5 : 1 }}
						>
							<i className="fa-solid fa-chevron-right" style={{ fontSize: "20px", color: "#553cdf" }}></i>
						</div>
					</div>
				</div>
				<div className={`tab-pane fade ${activeTab === "completed" ? "show active" : ""}`} role="tabpanel">
					<div className="row g-5">
						{
							Courses.map((course, index) => {
								return (
									<div key={index} className="col-lg-4 col-md-6 col-sm-12 col-12">
										<SingleCourseTwo
											courseClass="single-course-style-three enroll-course"
											Slug={course.slug}
											Img={course.img}
											Category={course.category}
											lessonCount={course.lessonCount}
											studentCount={course.studentCount}
											Title={course.title}
											Author={course.authorName}
											ratingCount={course.ratingCount}
											prevPrice={course.prevPrice}
											Price={formatCurrency(course.price)}
											imgWidth={course.imgWidth}
											imgHeight={course.imgHeight}
											bestSeller={course.bestSeller}
											type="dashboard"
											completePercent={course.completePercent}
										/>
									</div>
								);
							}).slice(4,10)
						}
					</div>
					<div className="row mt--30">
						<div className="col-lg-12">
							<div className="rts-pagination-area-2">
								<ReactPaginate
									key={`${activeTab}-${paginationKey}`}
									breakLabel="..."
									onPageChange={ handlePageChange }
									nextLabel={ <i className="fa-solid fa-chevron-right"></i> }
									previousLabel={ <i className="fa-solid fa-chevron-left"></i> }
									pageRangeDisplayed={ 3 }
									forcePage={ forcePage }
									pageCount={ Math.ceil(
										totalPaginate / paginatePerPage
									) }
									renderOnZeroPageCount={ null }
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
