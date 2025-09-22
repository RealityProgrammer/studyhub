import Image from "next/image";
import { useState } from "react";

export default function CourseInfo() {
	const [ activeTab, setActiveTab ] = useState(true)
	const [ activeSettings, setActiveSettings ] = useState('general')

	return (
		<div className="accordion" id="accordionExample">
			{/* single accordion nitem area start */}
			<div className="accordion-item">
				<h2 className="accordion-header" id="headingOne">
					<button 
						className="accordion-button" 
						aria-expanded={activeTab} 
						aria-controls="collapseOne"
						onClick={()=>{setActiveTab(!activeTab)}}
					>
						Course Info
					</button>
				</h2>
				<div id="collapseOne" className={`accordion-collapse collapse ${activeTab && "show"}`}>
					<div className="accordion-body">
						<div className="course-information-area">
							<form action="#" className="top-form-create-course">
								<div className="single-input">
									<label for="name">Course Title</label>
									<input id="name" type="text" placeholder="New Course" />
								</div>
								<div className="single-input">
									<label for="slug">Course Slug</label>
									<input id="slug" type="text" placeholder="New Course" />
								</div>
								<span className="pt--20 d-block">Permalink: https://demo.themeum.com/tutor/courses/new-course-45/</span>
								<div className="single-input">
									<label for="message-2">About Course</label>
									<textarea id="message-2" placeholder="New Course"></textarea>
								</div>
							</form>
							<div className="course-setting-title">
								<h5 className="title">Course Settings</h5>
								<div className="create-course-tab-area">
									<ul className="nav nav-tabs" id="myTab-2" role="tablist">
										<li className="nav-item" role="presentation">
											<button 
												className={`nav-link ${activeSettings === "general" && "active"}`}
												id="home-tab" 
												aria-selected={activeSettings === "general"}
												onClick={()=> {setActiveSettings("general")}}
											> 
												<i className="fa-regular fa-gear"></i> General
											</button>
										</li>
										<li className="nav-item" role="presentation">
											<button 
												className={`nav-link ${activeSettings === "content" && "active"}`} 
												id="home-tab" 
												aria-selected={activeSettings === "content"}
												onClick={()=> {setActiveSettings("content")}}
											> 
											<i className="far fa-droplet"></i> Content Drip</button>
										</li>
									</ul>
									<div className="tab-content" id="myTabContent-2">
										<div className={`tab-pane fade ${activeSettings === "general" && "show active"}`}>
											<div className="generale-tab-main-wrapper">
												{/* generale content taeb */}
												<div className="generale-tab-content">
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="type-1" />
															<label for="type-1">Enable</label><br />
														</div>
													</div>

													<div className="disable">
														<i className="fa-light fa-circle-check"></i>
														<span>Enable / Disable content drip</span>
													</div>
												</div>
												<div className="choosea-category-input">
													<label for="choose">Choose a category</label>
													<input id="choose" type="text" placeholder="Search Course Category ex Design, Development, Business" />
												</div>
												<div className="choosea-category-input">
													<label for="choose">Choose Price</label>
													<div className="check-box-wrapper">
														<div className="single-checkbox-filter">
															<div className="check-box">
																<input type="checkbox" id="type-3" />
																<label for="type-3">Free</label><br />
															</div>
														</div>
														<div className="single-checkbox-filter">
															<div className="check-box">
																<input type="checkbox" id="type-2" />
																<label for="type-2">Paid</label><br />
															</div>
														</div>
													</div>
													<div className="regular-price-discount-price-area">
														<div className="input-group mb-3">
															<span className="input-group-text" id="basic-addon1">$</span>
															<input id="regular" type="number" className="form-control" placeholder="regular Price" aria-label="Username" aria-describedby="basic-addon1" />
														</div>
														<div className="input-group mb-3">
															<span className="input-group-text" id="basic-addon2">$</span>
															<input id="discount" type="number" className="form-control" placeholder="Discounted Price" aria-label="Username" aria-describedby="basic-addon1" />
														</div>
													</div>

												</div>
												{/* generale content taeb end */}

												<h6 className="title mt--20">Course Thumbnail</h6>
												<div className="course-thumbnail-upload-area">
													<div className="thumbnail-area">
														<Image src="/images/dashboard/05.png" width={235} height={141} alt="dashboard" />
													</div>
													<div className="information">
														<span>Size: 700 X 430 Pixels</span>
														<span>File Support:</span>
														<div className="input-file-type-btn">
															<input type="file" id="real-file" hidden />
															<button type="button" className="rts-btn btn-primary" id="custom-button">CHOOSE A FILE</button>
															<span id="custom-text">No file chosen, yet.</span>
														</div>
													</div>
												</div>
											</div>

										</div>
										<div className={`tab-pane fade ${activeSettings === "content" && "show active"}`}>
											<div className="generale-tab-content">
												<div className="single-checkbox-filter">
													<div className="check-box">
														<input type="checkbox" id="type-12" />
														<label for="type-12">Enable</label><br />
													</div>
												</div>

												<div className="disable">
													<i className="fa-light fa-circle-check"></i>
													<span>Enable / Disable content drip</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* single accordion nitem area end */}
		</div>
	)
}
