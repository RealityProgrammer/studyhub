import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import api from "/src/route/route"

export default function SingleCourseTwo( props ) {
	const {id, courseClass,status, Slug, Img, Title, Category, ratingCount, lessonCount, studentCount, Author, bestSeller, prevPrice, Price, imgWidth, imgHeight, type, completePercent  } = props;
	const handleShow = (id) =>{
			props.parentCallback(id)
	}
	const [Grade, setGrade] = useState({});
	useEffect(() => {
		api.getGradeByCourseAndUser({id: id})
			.then(response => {
				let grade = {
					id: response.data.id,
					name: response.data.name,
					number_student: response.data.number_student,
					remain_student: response.data.remain_student,
					start_date: response.data.start_date,
					teacherName: "",
					teacherId : 0,
					url: response.data.url,
				}
				for (const acc of response.data.accountDto) {
					if (acc.roles.some(role => role.code === "TEACHER")) {
						grade.teacherName =  acc.fullName
						grade.teacherId = acc.id
					}
				}
				setGrade(grade)
			})
	},[status==="true"])
	return (
		<div style={{marginBottom:'30px'}} className={ courseClass || 'single-course-style-three'}>
			<Link href={`/grade/details/four?${JSON.stringify(Grade) || 'details'}`} className="thumbnail">
				<Image src={Img || '/images/course/01.jpg'}
					   width={imgWidth || 290} height={imgHeight || 210}
					   style={{
						   width: '220px',
						   height: '150px',
						   objectFit: 'cover'
					   }}
					   alt="course" />
				<div className="tag-thumb">
					<span>{Category || 'Web Development'}</span>
				</div>
			</Link>
			<div className="body-area">
				<div className="course-top">
					{
						bestSeller && <div className="tags">Best Seller</div>
					}
					<div className="price">{Price || '79.99'}</div>
				</div>
				<Link href={`/grade/details/four?${JSON.stringify(Grade) || 'details'}`}>
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
						<li><i className="fa-sharp fa-regular fa-star"></i></li>
					</ul>
				</div>
				<div className="leasson-students">
					{status === "false" ?
						<div></div>
						:
						<div>
							<div className="lesson">
								<i className="far fa-calendar-alt"></i>
								<span>Giáo viên: {Grade.teacherName || '25'}</span>
							</div>

							<div className="lesson">
								<i className="fa-solid fa-book-open"></i>
								<span>Lớp: {Grade.name} </span>
							</div>
						</div>
					}
				</div>
				<>
					{status === "false" ?
						<div className="progress-wrapper-lesson-compleate">
							<button className="btn btn-success" style={{fontSize: "14px"}} onClick={() => handleShow(id)}> Chọn lớp học </button>
						</div>
						:
						<div className="progress-wrapper-lesson-compleate">
							<div className="compleate">
								<div className="compl">
									Hoàn thành
								</div>
								<div className="end">
									<span>{completePercent || "80"}%</span>
								</div>
							</div>
							<div className="progress">
								<div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{"width": completePercent + "%"}}>
								</div>
							</div>

						</div>
					}
					</>
			</div>
		</div>
	)
}
