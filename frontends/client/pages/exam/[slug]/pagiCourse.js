import {useEffect, useState} from "react";
import SwiperCore from 'swiper';
import {Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

import SingleCourseThree from "@/components/Course/Three";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import api from "/src/route/route"
import {useSelector} from "react-redux";
SwiperCore.use([Navigation, Pagination]);

export default function PagiCourse() {

    const [ totalPaginate, setTotalPaginate ] = useState( 0 );
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [Courses, setCourses] = useState([]);

    const filters = useSelector(state => state.filter);
    const [checks,SetChecks] = useState(null);

    useEffect(() => {
        if(filters.data !== undefined){
                api.getCourse({page: currentPage,size:itemsPerPage,name: filters.data.search,aim: filters.data.aim, category: filters.data.category, status: 'Đã Duyệt'}).then((res) => {
                    setCourses(res.content);
                    setTotalPaginate(res.totalPages)
                })
        }
    }, [filters, currentPage]);
    const sliderOptions = {
        slidesPerView: 6,
        spaceBetween: 20,
        // centeredSlides: false,
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
    return(
        <div>
            <div className="row g-5 mt--10">
                <style>{
                    `.swiper-slide { height: 50%; flex-basis: 31%; margin-bottom: 1%; }`
                }</style>
                <Swiper {...sliderOptions} className="mySwiper-category-1 swiper-float-right-course">
                    {
                        Courses.map((course, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <SingleCourseThree
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
                                        Level={course.aim}
                                    />
                                </SwiperSlide>
                            )
                        }).slice(0, Courses.length)
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
    )
}