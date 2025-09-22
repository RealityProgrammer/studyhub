import Image from "next/image"
import Link from "next/link"
import FooterCTA from "./CTA"
import FooterCTATwo from "./CTATwo"

export default function Footer(props) {
	const { footerLogo, footerClass, CTAEnable } = props

	return (
		<footer className={footerClass || 'footer-callto-action-area bg-light-1'}>
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						{
							CTAEnable === "one" ?
								<FooterCTA /> :
								CTAEnable === "two" ?
									<FooterCTATwo /> : null
						}
						{/* footer main wrapper */}
						<div className="footer-one-main-wrapper ptb--100">
							{/* single sized  footer  */}
							<div className="footer-singl-wized left-logo">
								<div className="head">
									<Link href="/">
										<Image src={footerLogo || '/images/logo/logo-1.svg'} alt="logo" loading="lazy" width={144} height={28} />
									</Link>
								</div>
								<div className="body">
									<p className="dsic">
										Chúng tôi là một tổ chức giáo dục đầy nhiệt huyết, tận tụy cung cấp nguồn tài nguyên chất lượng cao cho người học ở mọi hoàn cảnh.
									</p>
									<ul className="wrapper-list">
										<li><i className="fa-regular fa-location-dot"></i> Phúc Diễn, Bắc Từ Liêm, Hà Nội</li>
										<li><i className="fa-regular fa-phone"></i><a href="tel:+339205335">+(84) 339205335</a></li>
									</ul>
								</div>
							</div>
							{/* single sized  footer end */}
							{/* single sized  footer  */}
							<div className="footer-singl-wized">
								<div className="head">
									<h6 className="title">Liên kết nhanh</h6>
								</div>
								<div className="body">
									<ul className="menu">
										<li><Link href="/course-two">Các khóa học mới nhất</Link></li>
										<li><Link href="/about">Sứ mệnh và tầm nhìn</Link></li>
										<li><Link href="/zoom-meeting">Phòng học</Link></li>
										<li><Link href="/pricing">Kế hoạch</Link></li>
									</ul>
								</div>
							</div>
							{/* single sized  footer end */}
							{/* single sized  footer  */}
							<div className="footer-singl-wized">
								<div className="head">
									<h6 className="title">Khám phá</h6>
								</div>
								<div className="body">
									<ul className="menu">
										<li><Link href="http://localhost:3000/course">Khóa học</Link></li>
										<li><Link href="http://localhost:3000/course/details/four?C001">Chi tiết khóa học</Link></li>
										<li><Link href="http://localhost:3000/instructor">Giảng viên</Link></li>
									</ul>
								</div>
							</div>
							{/* single sized  footer end */}
							{/* single sized  footer  */}
							<div className="footer-singl-wized input-area">
								<div className="head">
									<h6 className="title">Bản tin</h6>
								</div>
								<div className="body">
									<p className="disc">Đăng ký nhận bản tin của chúng tôi để cập nhật khóa học mới của chúng tôi</p>
									<form action="#">
										<div className="input-area-fill">
											<input type="email" placeholder="Nhập email của bạn" required />
											<button>Đăng Ký</button>
										</div>
										<div className="d-flex align-items-center">
											<input type="checkbox" id="exampleCheck1" />
											<label htmlFor="exampleCheck1">Tôi đồng ý với các điều khoản sử dụng và chính sách bảo mật.</label>
										</div>
									</form>
								</div>
							</div>
							{/* single sized  footer end */}
						</div>
						{/* footer main wrapper end */}
					</div>
				</div>
			</div>
			<div className="copyright-area-one-border">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="copyright-area-one">
								<p>Bản quyền © 2024 Mọi quyền được bảo lưu bởi Studyhub</p>
								<div className="social-copyright">
									<ul>
										<li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
										<li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
										<li><a href="#"><i className="fa-brands fa-linkedin"></i></a></li>
										<li><a href="#"><i className="fa-brands fa-pinterest"></i></a></li>
										<li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<script async data-id="2473613459" id="chatling-embed-script" type="text/javascript" src="https://chatling.ai/js/embed.js"></script>
		</footer>
	)
}
