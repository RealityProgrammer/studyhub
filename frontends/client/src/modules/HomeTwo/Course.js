import Courses from "@/data/courses.json";
import Image from "next/image";
import Link from "next/link";
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {useEffect, useRef, useState} from 'react';

import SingleCourse from "@/components/Course";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import api from "/src/route/route"
SwiperCore.use([Navigation, Pagination]);

export default function Course() {
	const [currentPage, setCurrentPage] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(8);
	const [courses, setCourses] = useState([]);
	useEffect(() => {
		api.getCourseBestSeller({page: currentPage, size: itemsPerPage}).then((res) => {
			setCourses(res.content);
		})
	}, []);
	const sliderOptions = {
		slidesPerView: 4,
		spaceBetween: 30,
		centeredSlides: false,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			clickable: true,
		},
		breakpoints: {
			1240: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
			740: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			320: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
		},
	};


	return (
		<div className="course-area-two rts-section-gapBottom">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="title-between-area align-items-end">
							<div className="title-area-left-style">
								<div className="pre-title">
									<Image src="/images/banner/bulb.png" alt="icon" width="22" height="22" />
									<span>Các khóa học</span>
								</div>
								<h2 className="title mb--5">Khoá học nổi bật</h2>
								<p className="disc">
									Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và nâng cao
								</p>
							</div>
							<Link href="/course" className="rts-btn with-arrow p-0">Xem tất cả khóa học <i className="fa-light fa-arrow-right"></i></Link>
						</div>
					</div>
				</div>
				<div className="row g-5 mt--20">
					  <Swiper {...sliderOptions} className="mySwiper-category-1 swiper-float-right-course">
						{
							courses.map((course, index) => {
								return (
									<SwiperSlide key={index}>
										<SingleCourse
											Slug={course.code}
											Img={course.imageUrl}
											Category={course.categoryName}
											lessonCount={course.periods}
											studentCount="20"
											Title={course.name}
											Author={"Mục tiêu: "+course.aim}
											ratingCount={"5"}
											prevPrice={course.price}
											Price={course.price - course.price*course.discount/100}
										/>
									</SwiperSlide>
								)
							}).slice(0, courses.length)
						}
						<div className="swiper-button-next"><i className="fa-solid fa-chevron-right"></i></div>
						<div className="swiper-button-prev"><i className="fa-solid fa-chevron-left"></i></div>
					</Swiper>
				</div>
			</div>
		</div>
	)
}

