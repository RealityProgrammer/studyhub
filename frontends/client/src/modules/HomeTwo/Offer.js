import Image from "next/image";
import Link from "next/link";

export default function Offer() {

	return (
		<div className="offer-add-area rts-section-gapBottom">
			<div className="container">
				<div className="row g-5">
					<div className="col-lg-6">
						<div className="course-add-single-one bg_image bg-p">
							<div className="title-area-left-style">
								<div className="pre-title">
									<Image src="/images/banner/bulb-4.png" alt="icon" width="22" height="22" />
									<span>TOEIC </span>
								</div>
								<h2 className="title">Chuẩn đầu ra tiếng anh<br />
									Tăng cơ hội việc làm</h2>
								<Link href="/course" className="rts-btn btn-primary-white">Xem thêm</Link>
							</div>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="course-add-single-one bg_image bg-y">
							<div className="title-area-left-style">
								<div className="pre-title">
									<Image src="/images/banner/bulb-5.png" alt="icon" width="22" height="22" />
									<span>Học theo lộ trình </span>
								</div>
								<h2 className="title">Giảm lên đến: 30%<br /> Tiết kiệm hơn</h2>
								<Link href="/course" className="rts-btn btn-primary hov--white">Đăng kí ngay</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
