import Image from "next/image";

export default function CourseInfo(props) {
	let { item } = props;
	return (
		<div className="course-content-wrapper">
			<h5 className="title">Về khóa học</h5>
			<div className="disc">
				{item?.description?.split('\n').map((line, index) => (
					<p key={index}>{line}</p>
				))}
			</div>
		</div>
	);
}
