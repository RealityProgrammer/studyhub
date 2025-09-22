import BlogSidebar from "@/components/Blog/BlogSidebar";
import Blogs from "@/data/blogs.json";
import Image from "next/image";

export default function BlogDetailsArea({item}) {
	if (!item) {
		item = Blogs[0]
	}
	const { detailsImg, title, description, publishedDate, author } = item;

	return (
		<div className="rts-blog-list-area rts-section-gap">
			<div className="container">
				<div className="row g-5">
					{/* rts blo post area */}
					<div className="col-xl-8 col-md-12 col-sm-12 col-12">
						{/* single post */}
						<div className="blog-single-post-listing details mb--0">
							<div className="thumbnail">
								<Image src={detailsImg || "/images/blog/03.jpg"} width="1600" height="960" alt="Business-Blog" />
							</div>
							<div className="blog-listing-content">
								<div className="user-info">
									{/* single info */}
									<div className="single">
										<i className="far fa-user-circle"></i>
										<span>by {author || "David Smith"}</span>
									</div>
									{/* single info end */}
									{/* single info */}
									<div className="single">
										<i className="far fa-clock"></i>
										<span>{publishedDate || "15 Jan 2024"}</span>
									</div>
									{/* single info end */}
									{/* single info */}
									<div className="single">
										<i className="far fa-tags"></i>
										<span>Business, Marketing</span>
									</div>
									{/* single info end */}
								</div>
								<h3 className="title animated fadeIn">{title || "Profitable business makes your profit"}</h3>
								<p className="disc para-1">
									{description || "Collaboratively pontificate bleeding edge resources with inexpensive methodologies globally initiate multidisciplinary compatible architectures pidiously repurpose leading edge growth strategies with just in time web readiness communicate timely meta services"}
								</p>
								<p className="disc">
									Onubia semper vel donec torquent fusce mauris felis aptent lacinia nisl, lectus
									himenaeos euismod molestie iaculis interdum in laoreet condimentum dictum, quisque quam risus sollicitudin gravida ut odio per a et. Gravida maecenas lobortis suscipit mus sociosqu convallis, mollis vestibulum donec aliquam risus sapien ridiculus, nulla
									sollicitudin eget in venenatis. Tortor montes platea iaculis posuere per mauris, eros
									porta blandit curabitur ullamcorper varius
								</p>
								{/* quote area start */}
								<div className="rts-quote-area text-start reveal">
									<h5 className="title title-g">“Placerat pretium tristique mattis tellus accuan metus dictumst vivamus odio nulla fusce auctor into suscipit habitasse class congue potenti iaculis”</h5>
									<p className="author-name">David John</p>
								</div>
								{/* quote area end */}

								<p className="disc">
									Ultrices iaculis commodo parturient euismod pulvinar donec cum eget a, accumsan viverra cras praesent cubilia dignissim ad rhoncus. Gravida maecenas lobortis suscipit mus sociosqu convallis, mollis vestibulum donec aliquam risus sapien ridiculus, nulla sollicitudin eget in venenatis. Tortor montes platea iaculis posuere per mauris, eros porta blandit curabitur ullamcorper varius, nostra ante risus egestas suscipit. Quisque interdum nec parturient facilisis nunc ac quam, ad est cubilia mauris himenaeos nascetur vestibulum.
								</p>

								<div className="row g-24">
									<div className="col-lg-6 col-md-6">
										<div className="thumbnail details w-100">
											<Image className="w-100" src="/images/course/11.jpg" width="378" height="273" alt="" />
										</div>
									</div>
									<div className="col-lg-6 col-md-6">
										<div className="thumbnail details w-100">
											<Image className="w-100" src="/images/course/12.jpg" width="378" height="273" alt="" />
										</div>
									</div>
								</div>

								<h4 className="title mt--40 mt_sm--20">Ultimate Business Strategy Solution</h4>
								<p className="disc mb--25">
									Gravida maecenas lobortis suscipit mus sociosqu convallis, mollis vestibulum donec
									aliquam risus sapien ridiculus, nulla sollicitudin eget in venenatis. Tortor montes
									platea iaculis posuere per mauris, eros porta blandit curabitur ullamcorper varius
									nostra ante risus egestas.
								</p>
								<div className="row align-items-start">
									<div className="col-lg-5">
										<div className="thumbnail details mb_sm--15">
											<Image src="/images/course/13.jpg" width="316" height="229" alt="" />
										</div>
									</div>
									<div className="col-lg-7">
										<div className="check-area-details">
											{/* single check */}
											<div className="single-check">
												<i className="far fa-check-circle"></i>
												<span>How will activities traditional manufacturing</span>
											</div>
											{/* single check End */}
											{/* single check */}
											<div className="single-check">
												<i className="far fa-check-circle"></i>
												<span>All these digital and projects aim to enhance</span>
											</div>
											{/* single check End */}
											{/* single check */}
											<div className="single-check">
												<i className="far fa-check-circle"></i>
												<span>I monitor my software that takes screenshots</span>
											</div>
											{/* single check End */}
											{/* single check */}
											<div className="single-check">
												<i className="far fa-check-circle"></i>
												<span>Laoreet dolore niacin sodium glutimate
												</span>
											</div>
											{/* single check End */}
											{/* single check */}
											<div className="single-check">
												<i className="far fa-check-circle"></i>
												<span>Minim veniam sodium glutimate nostrud</span>
											</div>
											{/* single check End */}
											{/* single check */}
											<div className="single-check">
												<i className="far fa-check-circle"></i>
												<span>Minim veniam sodium glutimate nostrud</span>
											</div>
											{/* single check End */}
											{/* single check */}
											<div className="single-check">
												<i className="far fa-check-circle"></i>
												<span>Minim veniam sodium glutimate nostrud</span>
											</div>
											{/* single check End */}
										</div>
									</div>
								</div>
								<p className="disc mt--30">
									Cubilia hendrerit luctus sem aptent curae gravida maecenas eleifend nunc nec vitae morbi sodales fusce tristique aenean habitasse mattis sociis feugiat conubia mus auctor praesent urna tincidunt taciti dui lobortis nullam. Mattis placerat feugiat ridiculus sed a per curae fermentum aenean facilisi, vitae urna imperdiet ac mauris non inceptos luctus hac odio.
								</p>
								<div className="row  align-items-center">
									<div className="col-lg-6 col-md-12">
										{/* tags details */}
										<div className="details-tag">
											<h6>Tags:</h6>
											<button>Services</button>
											<button>Business</button>
											<button>Growth</button>
										</div>
										{/* tags details End */}
									</div>
									<div className="col-lg-6 col-md-12">
										<div className="details-share">
											<h6>Share:</h6>
											<button><i className="fab fa-facebook-f"></i></button>
											<button><i className="fab fa-twitter"></i></button>
											<button><i className="fab fa-instagram"></i></button>
											<button><i className="fab fa-linkedin-in"></i></button>
										</div>
									</div>
								</div>
								<div className="author-area reveal">
									<div className="thumbnail details mb_sm--15">
										<Image src="/images/students-feedback/01.jpg" width="400" height="420" alt="" />
									</div>
									<div className="author-details team">
										<span className="title-g">Brand Designer</span>
										<h5 className="title-g">Angelina H. Dekato</h5>
										<p className="disc title-g">
											Nullam varius luctus pharetra ultrices volpat facilisis donec tortor, nibhkisys
											habitant curabitur at nunc nisl magna ac rhoncus vehicula sociis tortor nist
											hendrerit molestie integer.
										</p>
									</div>
								</div>
								<div className="replay-area-details">
									<h4 className="title">Leave a Reply</h4>
									<form action="#">
										<div className="row g-4">
											<div className="col-lg-6">
												<input type="text" placeholder="First Name" required />
											</div>
											<div className="col-lg-6">
												<input type="text" placeholder="Last Name" required />
											</div>
											<div className="col-12">
												<input type="text" placeholder="Select Topic" required />
												<textarea placeholder="Your Comment Here" required></textarea>
											</div>
										</div>
										<button type="submit" className="rts-btn btn-primary mt--20">Submit Message</button>
									</form>
								</div>
							</div>
						</div>
						{/* single post End*/}
					</div>
					{/* rts-blog post end area */}
					{/*rts blog wizered area */}
					<div className="col-xl-4 col-md-12 col-sm-12 col-12 rts-sticky-column-item">
						<BlogSidebar />
					</div>
					{/* rts- blog wizered end area */}
				</div>
			</div>
		</div>
	)
}
