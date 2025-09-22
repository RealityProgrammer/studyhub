import Instructors from "@/data/instructors.json";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import api from '../../route/teacher'
import ReactPaginate from "react-paginate";
export default function InstructorArea() {
	const [instructor,setInstructor] = useState([])
	const paginatePerPage = 4;
	const [totalPaginate, setTotalPaginate] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [forcePage, setForcePage] = useState(0);
	const totalPages = Math.ceil(totalPaginate / paginatePerPage);
	const handlePageChange = (event) => {
		const selectedPage = event.selected;
		setCurrentPage(selectedPage);
		setForcePage(selectedPage);
	};
	useEffect(() => {
		api.getAllTeacher(currentPage,paginatePerPage).then((data) => {
			setInstructor(data.content);
			setTotalPaginate(data.totalElements)
		})
	},[currentPage,paginatePerPage])
	return (
		<div className="instrustor-area rts-section-gap">
			<div className="container">
				<div className="row g-5">
					{
						instructor.map((instructor, index) => {
							return (
								<div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12">
									<div className="single-instructor">
										<div className="thumbnail-img">
											<Link href={`instructor/${instructor?.id || "details"}`} className="thumbnail">
												<Image
													src={instructor.accountDto.imageUrl || "/images/instructor/01.jpg"}
													alt={instructor?.accountDto.fullName}
													width={330}
													height={370}
													style={{
														objectFit: 'cover',
														width: '330px',
														height: '370px'
													}}
												/>
											</Link>
											<div className="social-img-instructor">
												<ul>
													<li><a href="#"><i className="fa-sharp fa-light fa-share-nodes"></i></a>
													</li>
													<li className="bottom"><a href="#"><i
														className="fa-brands fa-skype"></i></a></li>
													<li className="bottom"><a href="#"><i
														className="fa-brands fa-linkedin"></i></a></li>
													<li className="bottom"><a href="#"><i
														className="fa-brands fa-facebook-f"></i></a></li>
												</ul>
											</div>
										</div>

										<Link href={`instructor/${instructor?.id || "details"}`}>
											<h5 className="title">{instructor?.accountDto.fullName || "Elizabeth Olsen"}</h5>
										</Link>
										<p>
											{instructor?.birthday
												? new Date(instructor.birthday).toLocaleDateString("vi-VN")
												: "Assistant Teacher"}
										</p>

									</div>
								</div>
							);
						}).slice(0, 8)
					}
				</div>
				<div className="pagination-full-width">
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
	)
}
