import Image from "next/image";

export default function ContactArea() {

	return (
		<div className="rts-contact-area rts-section-gapTop">
			<div className="container">
				<div className="row g-5">
					<div className="col-xl-5">
						{/* contact left area start */}
						<div className="contact-left-area-start">
							<div className="title-area-left-style">
								<div className="pre-title">
									<Image src="/images/banner/bulb.png" width={22} height={22} alt="icon" />
									<span>Courses</span>
								</div>
								<h2 className="title">Love to hear from you <br />
									<span>Get in touch!</span>
								</h2>
							</div>
							<form action="mailer.php" method="post" className="contact-page-form" id="contact-form">
								<div className="single-input">
									<label for="name">Your Name*</label>
									<input id="name" name="name" type="text" placeholder="Andrew Davis ...." required />
								</div>
								<div className="single-input">
									<label for="email">Your Email*</label>
									<input id="email" name="email" type="email" placeholder="info@studyhub.net" />
								</div>
								<div className="single-input">
									<label for="message">Message*</label>
									<textarea id="message" name="message" placeholder="Let tell us about your projects"></textarea>
								</div>
								<button className="rts-btn btn-primary mt--30">Send Message</button>
							</form>
							<div id="form-messages" className="mt--20"></div>
						</div>
						{/* contact left area end */}
					</div>
					<div className="col-xl-7 pl--40 pl_lg--15 pl_md--15 pl_sm--15 pb_md--100 pb_sm--100">
						<div className="contact-map-area-start">
							<div className="single-maptop-info">
								<div className="icon">
									<Image src="/images/contact/02.png" width={40} height={40} alt="contact" />
								</div>
								<p className="disc">
									123 Main Street,
									New York, AV 10013
								</p>
							</div>
							<div className="single-maptop-info">
								<div className="icon">
									<Image src="/images/contact/03.png" width={40} height={40} alt="contact" />
								</div>
								<a href="tel:+4733378901">(555) 123-4567</a> <br />
								<a href="tel:+4733378901">(555) 123-4567</a>
							</div>
							<div className="single-maptop-info">
								<div className="icon">
									<Image src="/images/contact/04.png" width={40} height={40} alt="contact" />
								</div>
								<p className="disc">
									Mon-Fri: 9 AM – 6 PM <br />
									Saturday: 9 AM – 4 PM
								</p>
							</div>
						</div>
						<div className="map-bottom-area mt--30">
							<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14602.288851207937!2d90.47854065!3d23.798243149999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1705835333294!5m2!1sen!2sbd" width="600" height="440" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
