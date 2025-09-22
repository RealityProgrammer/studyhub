import SingleTestimonialTwo from "@/components/Testimonial/Two";
import Testimonials from "@/data/testimonials.json";
import Image from "next/image";

export default function Testimonial() {
	
	return (
		<div className="testimonials-area rts-section-gap">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="title-area-center-style">
							<div className="pre-title">
								<Image src="/images/banner/bulb.png" alt="icon" width="22" height="22" />
								<span>Đánh giá của sinh viên</span>
							</div>
							<h2 className="title">Phản hồi của học viên</h2>
							<p className="post-title">Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và nâng cao</p>
						</div>
					</div>
				</div>
			</div>
			<div className="container-full mt--50">
				<div className="row">
					<div className="col-lg-12">
						<div className="marque-main-wrapper-parent-flex">
							<div className="marquree-wrapper-1">
								{
									Testimonials.map((testimonial) => {
										return (
											<SingleTestimonialTwo
												Img={testimonial.avatar}
												Title={testimonial.title}
												Content={testimonial.content}
												Author={testimonial.author}
												Position={testimonial.position}
											/>
										);
									}).slice(0, 4)
								}
							</div>
							<div className="marquree-wrapper-1">
								{
									Testimonials.map((testimonial) => {
										return (
											<SingleTestimonialTwo
												Img={testimonial.avatar}
												Title={testimonial.title}
												Content={testimonial.content}
												Author={testimonial.author}
												Position={testimonial.position}
											/>
										);
									}).slice(5, 9)
								}
							</div>
						</div>
						<div className="marque-main-wrapper-parent-flex">
							<div className="marquree-wrapper-2">
								{/* Khu vực đánh giá giáo viên đơn lẻ */}
								<div className="single-testimonials-area-1">
									<div className="stars-area">
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-regular fa-star"></i>
									</div>
									<p className="disc">
										Giáo viên rất tận tâm, bài giảng dễ hiểu và rất thú vị. Tôi cảm thấy rất hài
										lòng khi tham gia khóa học này.
									</p>
									<div className="feedback-author">
										<Image src="/images/students-feedback/02.png" alt="phản hồi của học viên"
											   width="50" height="50"/>
										<div className="information">
											<h5 className="title">Nguyễn Minh Anh</h5>
											<span>Học sinh</span>
										</div>
									</div>
								</div>
								{/* Kết thúc khu vực đánh giá giáo viên đơn lẻ */}

								<div className="single-testimonials-area-1">
									<div className="stars-area">
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-regular fa-star"></i>
									</div>
									<p className="disc">
										Giáo viên giảng bài rất nhiệt tình, kiến thức được truyền đạt rõ ràng và dễ
										hiểu. Tôi rất thích các bài giảng của thầy.
									</p>
									<div className="feedback-author">
										<Image src="/images/students-feedback/03.png" alt="phản hồi của học viên"
											   width="50" height="50"/>
										<div className="information">
											<h5 className="title">Trần Quang Huy</h5>
											<span>Sinh viên</span>
										</div>
									</div>
								</div>

								<div className="single-testimonials-area-1">
									<div className="stars-area">
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-regular fa-star"></i>
									</div>
									<p className="disc">
										Khóa học rất hữu ích, giáo viên giảng bài dễ hiểu và luôn sẵn sàng giải đáp thắc
										mắc của học viên.
									</p>
									<div className="feedback-author">
										<Image src="/images/students-feedback/04.png" alt="phản hồi của học viên"
											   width="50" height="50"/>
										<div className="information">
											<h5 className="title">Lê Anh Thư</h5>
											<span>Học sinh</span>
										</div>
									</div>
								</div>

								<div className="single-testimonials-area-1">
									<div className="stars-area">
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-regular fa-star"></i>
									</div>
									<p className="disc">
										Giảng viên giảng bài rất dễ hiểu, bài học có nhiều ví dụ thực tế giúp tôi dễ
										dàng áp dụng vào công việc.
									</p>
									<div className="feedback-author">
										<Image src="/images/students-feedback/05.png" alt="phản hồi của học viên"
											   width="50" height="50"/>
										<div className="information">
											<h5 className="title">Phạm Gia Bảo</h5>
											<span>Sinh viên</span>
										</div>
									</div>
								</div>
							</div>

							<div className="marquree-wrapper-2">
								<div className="single-testimonials-area-1">
									<div className="stars-area">
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-regular fa-star"></i>
									</div>
									<p className="disc">
										Giáo viên rất nhiệt tình, nội dung bài học phong phú, dễ hiểu và có tính ứng
										dụng cao.
									</p>
									<div className="feedback-author">
										<Image src="/images/students-feedback/06.png" alt="phản hồi của học viên"
											   width="50" height="50"/>
										<div className="information">
											<h5 className="title">Đỗ Minh Khang</h5>
											<span>Học sinh</span>
										</div>
									</div>
								</div>

								<div className="single-testimonials-area-1">
									<div className="stars-area">
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-regular fa-star"></i>
									</div>
									<p className="disc">
										Giảng viên nhiệt tình, bài giảng dễ hiểu và thực tế. Tôi đã học được rất nhiều
										kiến thức mới từ khóa học.
									</p>
									<div className="feedback-author">
										<Image src="/images/students-feedback/07.png" alt="phản hồi của học viên"
											   width="50" height="50"/>
										<div className="information">
											<h5 className="title">Nguyễn Văn Toàn</h5>
											<span>Sinh viên</span>
										</div>
									</div>
								</div>

								<div className="single-testimonials-area-1">
									<div className="stars-area">
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-regular fa-star"></i>
									</div>
									<p className="disc">
										Tôi rất hài lòng với giáo viên và cách giảng dạy của họ. Tôi đã áp dụng được
										nhiều kiến thức vào thực tế.
									</p>
									<div className="feedback-author">
										<Image src="/images/students-feedback/08.png" alt="phản hồi của học viên"
											   width="50" height="50"/>
										<div className="information">
											<h5 className="title">Lê Thị Hoa</h5>
											<span>Học sinh</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
