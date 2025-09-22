import Image from "next/image";
import Link from "next/link";
import {formatCurrency} from "@/utils/utils";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {useCart} from "@/hooks/CartContext";

export default function SingleCourseThree( props ) {
	const { courseClass, Slug, Img, Title, Description, Category, ratingCount, lessonCount, studentCount, Author, bestSeller, Level, prevPrice, Price, imgWidth=290, imgHeight=210,Id  } = props;

	const router = useRouter();
	const { addCart } = useCart();
	const handleAddToCart = (itemId, quantity) => {
		const checkToken = localStorage.getItem("jwtToken");
		if (!checkToken) {
			toast.warning("Bạn cần đăng nhập vào hệ thống");
			router.push("/login");
		} else {
			addCart(itemId, { quantity });
			toast.success("Thêm thành công!", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: "colored",
				closeButton: false,
				style: {
					padding: "5px",
					width: "180px"
				}
			});
		}
	};
	return (
		<div className={ courseClass || 'single-course-style-three'} >
			<Link href={`/course/details/four?${Slug || 'details'}`} className="thumbnail">
				<Image
					src={Img || '/images/course/01.jpg'}
					width={imgWidth}
					height={imgHeight}
					alt="course"
					style={{
						width: '220px',
						height: '150px',
						objectFit: 'cover'
					}}
				/>

				<div className="tag-thumb">
					<span>{Category || 'Web Development'}</span>
				</div>
			</Link>
			<div className="body-area">
				<div className="course-top">
					{
						bestSeller && <div className="tags">Best Seller</div>
					}
					<div className="price">{formatCurrency(Price)}  <span className={"text-decoration-line-through text-secondary"}>{prevPrice}</span></div>
				</div>
				<Link href={`/course/details/four?${Slug || 'details'}`}>
					<h5 className="title">{Title || 'The Complete Web Developer in 2023: Zero to Mastery'}</h5>
				</Link>
				<div className="teacher-stars">
					<div className="teacher"><span>{Author || 'Dr. Angela Yu'}</span></div>
					<ul className="stars">
						<li className="span">{ratingCount || '4.5'}</li>
						<li><i className="fa-sharp fa-solid fa-star"></i></li>
						<li><i className="fa-sharp fa-solid fa-star"></i></li>
						<li><i className="fa-sharp fa-solid fa-star"></i></li>
						<li><i className="fa-sharp fa-solid fa-star"></i></li>
						<li><i className="fa-sharp fa-solid fa-star"></i></li>
					</ul>
				</div>
				<div className="leasson-students">
					<div className="lesson">
						<i className="far fa-calendar-alt"></i>
						<span>{lessonCount || '25'} Buổi</span>
					</div>
					<div className="students">
						<i className="fa-light fa-users"></i>
						<span>{studentCount || '22'} Học viên</span>
					</div>
				</div>
				<div className="course-content-area" style={{width:'310px'}}>
					<h5 className="heading-title">
						<Link href={`/course/${Slug || 'details'}`}>
							{Title || 'The Complete Web Developer in 2023: Zero to Mastery'}
						</Link>
					</h5>
					<div className="tags-area-wrapper">
						<div className="single-tag">
							<span>{Level || "Beginner"}</span>
						</div>
						<div className="lesson-studente">
							<div className="lesson">
								<i className="far fa-calendar-alt"></i>
								<span>{lessonCount || '25'} Lessons</span>
							</div>
							<div className="lesson">
								<i className="fa-light fa-user-group"></i>
								<span>{studentCount || '54'}</span>
							</div>
						</div>
					</div>
					<p className="desc">{Description || 'Học tiếng Anh một cách hiệu quả từ các chuyên gia giàu kinh nghiệm.'}</p>
					<ul className="wrapper-list">
						<li><i className="fa-solid fa-check"></i>Nắm vững các kỹ năng </li>
						<li><i className="fa-solid fa-check"></i>Cải thiện phát âm và ngữ pháp</li>
						<li><i className="fa-solid fa-check"></i>Tăng sự tự tin khi giao tiếp</li>
					</ul>

					<div className="button-area">
						<button onClick={() => handleAddToCart(Id, 1)} className="rts-btn btn-primary">
							Thêm vào giỏ hàng
						</button>
						{/*<Link href="/cart" className="rts-btn btn-primary">Thêm vào giỏ hàng</Link>*/}
					</div>
					<div className="shape"></div>
				</div>
			</div>
		</div>
	)
}
