import Blogs from "@/data/blogs.json";
import Image from "next/image";
import Link from "next/link";

export default function BlogSidebar() {
	return (
		<div className="blog-sidebar theiaStickySidebar">
			{/* single wizered start */}
			<div className="rts-single-wized search">
				<div className="wized-body mt--0">
					<div className="rts-search-wrapper">
						<input className="Search" type="text" placeholder="Enter Keyword" />
						<button><i className="fal fa-search"></i></button>
					</div>
				</div>
			</div>
			{/* single wizered End */}
			{/* single wizered start */}
			<div className="rts-single-wized Categories">
				<div className="wized-header">
					<h5 className="title">
						Categories
					</h5>
				</div>
				<div className="wized-body">
					{/* single categoris */}
					<ul className="single-categories">
						<li><Link href="#">Business Solution <i className="far fa-long-arrow-right"></i></Link></li>
					</ul>
					{/* single categoris End */}
					{/* single categoris */}
					<ul className="single-categories">
						<li><Link href="#">Strategy Growth<i className="far fa-long-arrow-right"></i></Link></li>
					</ul>
					{/* single categoris End */}
					{/* single categoris */}
					<ul className="single-categories">
						<li><Link href="#">Finance Solution<i className="far fa-long-arrow-right"></i></Link></li>
					</ul>
					{/* single categoris End */}
					{/* single categoris */}
					<ul className="single-categories">
						<li><Link href="#">Investment Policy<i className="far fa-long-arrow-right"></i></Link></li>
					</ul>
					{/* single categoris End */}
					{/* single categoris */}
					<ul className="single-categories">
						<li><Link href="#">Tax Managment<i className="far fa-long-arrow-right"></i></Link></li>
					</ul>
					{/* single categoris End */}
				</div>
			</div>
			{/* single wizered End */}
			{/* single wizered start */}
			<div className="rts-single-wized Recent-post">
				<div className="wized-header">
					<h5 className="title">
						Recent Posts
					</h5>
				</div>
				<div className="wized-body">
					{/* recent-post start */}
					{	
						Blogs.map((blog, index) => {
							return (
								<div key={index} className="recent-post-single">
									<div className="thumbnail">
										<Link href={`/blog/${blog.slug || "details"}`}>
											<Image src={blog.image || "/images/course/01.jpg"} width="290" height="210" alt="Blog_post" />
										</Link>
									</div>
									<div className="content-area text-start">
										<div className="user">
											<i className="fal fa-clock"></i>
											<span>{blog.publishedDate || "15 Jan, 2023"}</span>
										</div>
										<Link className="post-title" href={`/blog/${blog.slug || "details"}`}>
											<h6 className="title">{blog.title || "We would love to share a similar experience"}</h6>
										</Link>
									</div>
								</div>
							);
						}).slice(3,6)
					}
					{/* recent-post end */}
				</div>
			</div>
			{/* single wizered End */}
			{/* single wizered start */}
			<div className="rts-single-wized">
				<div className="wized-header">
					<h5 className="title">
						Popular Tags
					</h5>
				</div>
				<div className="wized-body">
					<div className="tags-wrapper">
						<Link href="#">Services</Link>
						<Link href="#">Business</Link>
						<Link href="#">Growth</Link>
						<Link href="#">Finance</Link>
						<Link href="#">UI/UX Design</Link>
						<Link href="#">Solution</Link>
						<Link href="#">Speed</Link>
						<Link href="#">Strategy</Link>
						<Link href="#">Technology</Link>
					</div>
				</div>
			</div>
			{/* single wizered End */}
		</div>
	)
}
