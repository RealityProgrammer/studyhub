import Image from "next/image";

export default function CourseReview({}) {

	return (
		<div className="rating-main-wrapper mt--40">
			{/* single-top-rating */}
			<div className="rating-top-main-wrapper">
				{/* rating area start */}
				<div className="rating-area-main-wrapper">
					<h2 className="title">4.5</h2>
					<div className="stars-wrapper">
						<i className="fa-solid fa-star"></i>
						<i className="fa-solid fa-star"></i>
						<i className="fa-solid fa-star"></i>
						<i className="fa-solid fa-star"></i>
						<i className="fa-regular fa-star"></i>
					</div>
					<span>Total 2 Ratings</span>
				</div>
				{/* rating area end */}
				<div className="progress-wrapper-main">
					<div className="single-progress-area-h" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
						<div className="progress-top icon-gap">
							<i className="fa-regular fa-star"></i>
							<span className="parcent">
								5
							</span>
						</div>
						<div className="progress">
							<div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}>
							</div>
						</div>
						<div className="end">
							<span>25 Rating</span>
						</div>
					</div>
					<div className="single-progress-area-h" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
						<div className="progress-top icon-gap">
							<i className="fa-regular fa-star"></i>
							<span className="parcent">
								4
							</span>
						</div>
						<div className="progress">
							<div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{width: "80%"}}>
							</div>
						</div>
						<div className="end">
							<span>20 Rating</span>
						</div>
					</div>
					<div className="single-progress-area-h" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
						<div className="progress-top icon-gap">
							<i className="fa-regular fa-star"></i>
							<span className="parcent">
								3
							</span>
						</div>
						<div className="progress">
							<div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{width: "60%"}}>
							</div>
						</div>
						<div className="end">
							<span>5 Rating</span>
						</div>
					</div>
					<div className="single-progress-area-h" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
						<div className="progress-top icon-gap">
							<i className="fa-regular fa-star"></i>
							<span className="parcent">
								2
							</span>
						</div>
						<div className="progress">
							<div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{width: "40%"}}>
							</div>
						</div>
						<div className="end">
							<span>2 Rating</span>
						</div>
					</div>
					<div className="single-progress-area-h" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
						<div className="progress-top icon-gap">
							<i className="fa-regular fa-star"></i>
							<span className="parcent">
								1
							</span>
						</div>
						<div className="progress">
							<div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{width: "20%"}}>
							</div>
						</div>
						<div className="end">
							<span>1 Rating</span>
						</div>
					</div>
				</div>
			</div>
			{/* single-top-rating end*/}
			{/* person indevidual rating area  */}
			<div className="indevidual-rating-area">
				{/* author-area */}
				<div className="author-area">
					<Image src="/images/instructor/12.jpg" width="60" height="60" alt="instructor" />
					<div className="information">
						<span>William U.</span>
						<div className="stars">
							<i className="fa-solid fa-star"></i>
							<i className="fa-solid fa-star"></i>
							<i className="fa-solid fa-star"></i>
							<i className="fa-solid fa-star"></i>
							<i className="fa-regular fa-star"></i>
							<span className="ml--30">a week ago</span>
						</div>
					</div>
				</div>
				{/* author-area end */}
				<p className="disc">
					I still have a lot of studying to do using this course and the other practice exams, but so far it's been great! I have not taken my Security+ exam as well, so I'll update this at a later time.
				</p>
				<div className="like-love-area">
					<a href="#">
						<i className="fa-sharp fa-light fa-thumbs-up"></i>
					</a>
					<a href="#">
						<i className="fa-regular fa-heart"></i>
					</a>
				</div>
			</div>
			{/* person indevidual rating area end */}
			{/* person indevidual rating area  */}
			<div className="indevidual-rating-area">
				{/* author-area */}
				<div className="author-area">
					<Image src="/images/instructor/13.jpg" width="60" height="60" alt="instructor" />
					<div className="information">
						<span>William U.</span>
						<div className="stars">
							<i className="fa-solid fa-star"></i>
							<i className="fa-solid fa-star"></i>
							<i className="fa-solid fa-star"></i>
							<i className="fa-solid fa-star"></i>
							<i className="fa-regular fa-star"></i>
							<span className="ml--30">a week ago</span>
						</div>
					</div>
				</div>
				{/* author-area end */}
				<p className="disc">
					I still have a lot of studying to do using this course and the other practice exams, but so far it's been great! I have not taken my Security+ exam as well, so I'll update this at a later time.
				</p>
				<div className="like-love-area">
					<a href="#">
						<i className="fa-sharp fa-light fa-thumbs-up"></i>
					</a>
					<a href="#">
						<i className="fa-regular fa-heart"></i>
					</a>
				</div>
			</div>
			{/* person indevidual rating area end */}
		</div>
							
	)
}
