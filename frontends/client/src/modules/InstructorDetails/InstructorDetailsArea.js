import SingleCourse from "@/components/Course";
import Image from "next/image";
import {useEffect, useState} from "react";
import api from '../../route/teacher'
import ReactPaginate from "react-paginate";

export default function InstructorDetailsArea({item}) {
    if (!item) {
        return null;
    }
    const {img, name, position, biography, studentCount, lectureCount, ratingCount} = item.data;
    const paginatePerPage = 6;
    const [totalPaginate, setTotalPaginate] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [forcePage, setForcePage] = useState(0);
    const totalPages = Math.ceil(totalPaginate / paginatePerPage);
    const handlePageChange = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
        setForcePage(selectedPage);
    };
    const email = item.data.accountDto.email;
    const [course, setCourse] = useState([])
    useEffect(() => {
        api.getAllCourseByEmail(currentPage, paginatePerPage, email).then((res) => {
            setCourse(res.content);
            setTotalPaginate(res.totalElements)
        })
    }, [currentPage, paginatePerPage, email])
    return (
        <>
            <div className="dashboard-banner-area-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="dashboard-banner-area-start bg_image">
                                <div className="author-profile-image-and-name">
                                    <div className="profile-pic">
                                        <Image
                                            src={item.data.accountDto.imageUrl || "/images/dashboard/01.png"}
                                            width="200"
                                            height="200"
                                            alt="dashboard"
                                            style={{
                                                borderRadius: '50%', // Bo tròn ảnh
                                                objectFit: 'cover', // Căn chỉnh vừa khung
                                                width: '200px',
                                                height: '200px'
                                            }}
                                        />
                                    </div>

                                    <div className="name-desig">
                                        <h1 className="title">{item.data.accountDto.fullName || "Jon Adam"}</h1>
                                        <div className="course-vedio">
                                            <div className="single">
                                                <i className="fa-regular fa-calendar-days"></i>
                                                <span>
                                                    Ngày sinh:{" "}
                                                    {item.data?.birthday
                                                        ? new Date(item.data.birthday).toLocaleDateString("vi-VN")
                                                        : "Assistant Teacher"}
                                                </span>
                                            </div>
                                            <div className="single">
                                                <i className="fa-regular fa-envelope"></i>
                                                <span>
                                                    Email: {item.data?.accountDto?.email?.trim()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rts-instructor-profile rts-section-gapBottom pt--50">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">

                        </div>
                        <div className="col-lg-9">
                            <div className="instructor-profile-right-area-start">
                                <div className="bio-graphyarea">
                                    <h5 className="title">Tiểu sử</h5>
                                    <p className="disc">
                                        Là một giảng viên tiếng Anh, tôi hết lòng cống hiến để định hình sự nhạy bén về
                                        ngôn ngữ và văn học của học sinh. Với niềm đam mê sâu sắc với giáo dục ngôn ngữ,
                                        tôi sử dụng các phương pháp giảng dạy năng động và sáng tạo để truyền cảm hứng
                                        cho tình yêu văn học và giao tiếp hiệu quả. Cam kết của tôi vượt ra ngoài chương
                                        trình giảng dạy, nuôi dưỡng một môi trường nơi học sinh phát triển các kỹ năng
                                        tư duy phản biện và sự đánh giá sâu sắc đối với các sắc thái của tiếng Anh.
                                    </p>
                                    <h5>Danh sách các khóa học của tôi</h5>
                                </div>
                                <div className="row g-5 mt--10">
                                    {
                                        course.map((course, index) => {
                                            return (
                                                <div key={index} className="col-lg-4 col-md-6 col-sm-12 col-12">
                                                    <SingleCourse
                                                        Slug={course.code}
                                                        Img={course.imageUrl}
                                                        Category={course.categoryName}
                                                        lessonCount={course.periods}
                                                        studentCount={course.studentCount}
                                                        Title={course.name}
                                                        Author={'Mục tiêu : ' + course.aim}
                                                        ratingCount={course.ratingCount}
                                                        prevPrice={course.price}
                                                        Price={course.price * (1 - course.discount / 100)}
                                                        discount={course.discount}
                                                        imgWidth={course.imgWidth}
                                                        imgHeight={course.imgHeight}
                                                    />
                                                </div>
                                            )
                                        }).slice(0, 6)
                                    }
                                </div>
                                <div className="pagination-full-width mt--20">
                                    <span>Page {currentPage + 1} of {totalPages}</span>
                                    <div className="pagination">
                                        <ReactPaginate
                                            key={totalPages}
                                            breakLabel="..."
                                            onPageChange={handlePageChange}
                                            nextLabel={<i className="fa-solid fa-chevron-right"></i>}
                                            previousLabel={<i className="fa-solid fa-chevron-left"></i>}
                                            pageRangeDisplayed={3}
                                            forcePage={forcePage}
                                            pageCount={Math.ceil(
                                                totalPaginate / paginatePerPage
                                            )}
                                            renderOnZeroPageCount={null}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
