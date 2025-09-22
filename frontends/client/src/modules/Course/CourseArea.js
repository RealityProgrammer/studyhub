import CourseSidebar from "@/components/Course/CourseSidebar";
import SingleCourseList from "@/components/Course/List";
import SingleCourseTwo from "@/components/Course/Two";
import Courses from "@/data/courses.json";
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';

export default function CourseArea() {
	const paginatePerPage = 9;
	
	const [ activeTab, setActiveTab ] = useState('grid');
	const [ filteredCourses, setFilteredCourses ] = useState(Courses);
	const [ totalPaginate, setTotalPaginate ] = useState( filteredCourses.length );
	const [ startItemCount, setStartItemCount ] = useState( 0 );
	const [ endItemCount, setEndItemCount ] = useState( paginatePerPage );
	const [ paginationKey, setPaginationKey ] = useState(Date.now());
	const [ forcePage, setForcePage ] = useState( 0 );

	function handleTab(tab) {
		setActiveTab(tab);
	}
	const handlePageChange = ( event ) => {
		const selectedPage = event.selected + 1;
		const startPage = selectedPage * paginatePerPage - paginatePerPage;
		const endPage = selectedPage * paginatePerPage;
		setStartItemCount( startPage );
		setEndItemCount( endPage > filteredCourses.length ? filteredCourses.length : endPage );
	};

	const handlePaginateReset = () => {
		setPaginationKey(Date.now());
		handlePageChange({ selected: 0 });

		const resetPaginate = paginatePerPage > filteredCourses.length ? filteredCourses.length : paginatePerPage

		setEndItemCount( resetPaginate );
	}

	const filterData = useSelector((state) => state.filter.data);

	const applyFilters = () => {
		let updatedCourses = Courses;
	
		// Filter by search
		if (filterData?.search) {
		  updatedCourses = updatedCourses.filter((course) =>
			course.title.toLowerCase().includes(filterData?.search?.toLowerCase())
		  );
		}
	
		// Filter by type
		if (filterData?.type?.length) {
		  updatedCourses = updatedCourses.filter((course) =>
			filterData?.type?.includes(course.type)
		  );
		}
	
		// Filter by category
		if (filterData?.category?.length) {
		  updatedCourses = updatedCourses.filter((course) =>
			filterData?.category?.includes(course.category.toLowerCase().replace(/\s+/g, "-"))
		  );
		}
	
		// Filter by level
		if (filterData?.level?.length && !filterData.level.includes("all")) {
			updatedCourses = updatedCourses.filter((course) =>
				filterData.level.includes(course.level.toLowerCase())
			);
		}
	
		// Filter by author
		if (filterData?.author?.length) {
		  updatedCourses = updatedCourses.filter((course) =>
			filterData?.author?.includes(course.authorName.toLowerCase())
		  );
		}
	
		// Filter by tags
		if (filterData?.tags?.length) {
		  updatedCourses = updatedCourses.filter((course) =>
			filterData?.tags?.includes(course.tag.toLowerCase())
		  );
		}
	
		// Filter by price (free or paid)
		if (filterData?.price?.length) {
		  updatedCourses = updatedCourses.filter(
			(course) =>
			  (filterData?.price?.includes("free") && course.price === "0") ||
			  (filterData?.price?.includes("paid") && course.price !== "0")
		  );
		}
	
		setFilteredCourses(updatedCourses);
		setTotalPaginate(updatedCourses.length);
		console.log('Updated Courses:', updatedCourses);
	};


	useEffect(() => {
		applyFilters();
	}, [filterData]);

	useEffect(() => {
		handlePaginateReset();
	}, [filteredCourses]);


	return (
		<div className="rts-course-default-area rts-section-gap">
			<div className="container">
				<div className="row g-5">
					<div className="col-lg-3">
						<CourseSidebar />
					</div>
					<div className="col-lg-9">
						<div className="filter-small-top-full">
							<div className="left-filter">
								<span>Short By</span>
								<div className="nice-select-wrap">
									<select className="nice-select" name="price">
										<option>All Category</option>
										<option value="asc">Design</option>
										<option value="desc">Development</option>
										<option value="pop">Popularity</option>
										<option value="low">Price</option>
										<option value="high">Stars</option>
									</select>
								</div>
							</div>
							<div className="right-filter">
								{
									filteredCourses.length > 0 ? (
										<span>Showing {startItemCount + 1} - {endItemCount} of {filteredCourses.length} results</span>
									) :
									<span>No results found</span>
								}
								<ul className="nav nav-tabs" id="myTab" role="tablist">
									<li className="nav-item">
										<button 
											className={`nav-link ${activeTab === "grid" && 'active'}`}
											onClick={()=> {handleTab('grid')}}
										>
											<i className="fas fa-th-large"></i>
											<span>Grid</span>
										</button>
									</li>
									<li className="nav-item">
										<button 
											className={`nav-link ${activeTab === "list" && 'active'}`}
											onClick={()=> {handleTab('list')}}
										>
											<i className="fa-light fa-list"></i>
											<span> List</span>
										</button>
									</li>
								</ul>
							</div>
						</div>
						<div className="row g-5 mt--10">
							{
								filteredCourses.length > 0 ? (
									activeTab === "grid" ?
									filteredCourses.map((course, index) => {
										return (
											<div key={index} className="col-lg-4 col-md-6 col-sm-12 col-12">
												<SingleCourseTwo
													Slug={course.slug}
													Img={course.img}
													Category={course.category}
													lessonCount={course.lessonCount}
													studentCount={course.studentCount}
													Title={course.title}
													Author={course.authorName}
													ratingCount={course.ratingCount}
													prevPrice={course.prevPrice}
													Price={course.price}
													imgWidth={course.imgWidth}
													imgHeight={course.imgHeight}
													bestSeller={course.bestSeller}
												/>
											</div>
										);
									}).slice(startItemCount,endItemCount) :
									<div className="col-lg-12">
										{
											filteredCourses.map((course) => {
												return (
													<SingleCourseList
														Slug={course.slug}
														Img={course.img}
														Category={course.category}
														lessonCount={course.lessonCount}
														studentCount={course.studentCount}
														Title={course.title}
														Author={course.authorName}
														ratingCount={course.ratingCount}
														prevPrice={course.prevPrice}
														Price={course.price}
														imgWidth={course.imgWidth}
														imgHeight={course.imgHeight}
													/>
												);
											}).slice(startItemCount,endItemCount)
										}
									</div>
								) : 
								<div className="col-lg-12">
									<p>No courses found</p>
								</div>
							}
						</div>
						{
							totalPaginate > paginatePerPage && (
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
							)
						}
					</div>
				</div>
			</div>
		</div>
	)
}
