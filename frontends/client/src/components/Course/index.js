import Image from "next/image";
import Link from "next/link";
import {formatCurrency} from "@/utils/utils";

export default function SingleCourse( props ) {
	const { courseClass, Slug, Img, Title, Category, ratingCount, lessonCount, studentCount, Author, prevPrice, Price, imgWidth, imgHeight, type, discount  } = props;

	return (
		<div className={courseClass || 'rts-single-course'}>
			<div style={{position: 'relative', width: 'fit-content'}}>
				<Link href={`/course/detail/four?${Slug || 'details'}`} className="thumbnail">
					<img
						src={Img || '/images/course/01.jpg'}
						width={imgWidth}
						height={imgHeight}
						alt="course"
						style={{
							width: '300px',
							height: '180px',
							objectFit: 'cover'
						}}
					/>

					{/* Hiển thị danh mục ở góc trên bên trái */}
					{Category && (
						<div style={{
							position: 'absolute',
							top: '10px',
							left: '10px',
							backgroundColor: '#fff',
							color: 'black',
							padding: '5px 10px',
							fontSize: '14px',
							fontWeight: 'bold',
							borderRadius: '4px',
							zIndex: 10
						}}>
							{Category}
						</div>
					)}

					{/* Hiển thị giảm giá ở góc trên bên phải */}
					{discount > 0 && (
						<div style={{
							position: 'absolute',
							top: '10px',
							right: '10px',
							backgroundColor: '#ff4d4f',
							color: '#fff',
							padding: '5px 10px',
							fontSize: '14px',
							fontWeight: 'bold',
							borderRadius: '4px',
							zIndex: 10
						}}>
							-{discount}%
						</div>
					)}
				</Link>
			</div>

			<div className="lesson-studente">
				<div className="lesson">
					<i className="far fa-calendar-alt"></i>
					<span>{lessonCount || '25'} Lessons</span>
				</div>
				<div className="lesson">
					<i className="fa-light fa-user-group"></i>
					<span>{studentCount || '54'} Students</span>
				</div>
			</div>
			<Link href={`/course/detail/four?${Slug || 'details'}`}>
				<h5 className="title">{Title || 'The Complete Web Developer in 2023: Zero to Mastery'}</h5>
			</Link>
			<p className="teacher">{Author || 'Dr. Angela Yu'}</p>
			<div className="rating-and-price">
				<div className="price-area" style={{display: 'block'}}>
					{
						type !== "dashboard" && discount > 0 && (
							<div className="not price">
								{formatCurrency(prevPrice) || '79.99'}
							</div>
						)

					}
					<div className="price" style={{fontSize: '22px'}}>
						{formatCurrency(Price)}
					</div>
				</div>
			</div>
		</div>
	)
}
