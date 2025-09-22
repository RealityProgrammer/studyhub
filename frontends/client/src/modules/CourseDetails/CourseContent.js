import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import { useEffect, useState } from "react";
import ModalVideo from 'react-modal-video';
import api from "/src/route/route";

export default function CourseContent({ item }) {
	const [isOpen, setIsOpen] = useState(false);
	const [url, setUrl] = useState("0");
	const [detailCourses, setDetailCourses] = useState([]);

	const openModal = (videoUrl = "0") => {
		setIsOpen(prev => !prev);
		setUrl(videoUrl);
	};

	useEffect(() => {
		api.getCourseDetails(item.id)
			.then(res => {
				setDetailCourses(res.content);
			});
	}, [item.id]);

	const items = detailCourses.map((detailCourse, index) => ({
		header: (
			<span>Buổi {detailCourse.period}: {detailCourse.name}</span>
		),
		content: (
			<a href="#" className="play-vedio-wrapper" onClick={() => {openModal(detailCourse.url);}}>
				<div className="left">
					<i className="fa-light fa-circle-play"></i>
					<span>Video học thử</span>
				</div>
				<div className="right">
					<span className="play">Xem</span>
					<span>1h30p</span>
				</div>
			</a>
		)
	}));
	return (
		<div className="course-content-wrapper-main mt--40">
			<ModalVideo channel='youtube' isOpen={isOpen} videoId={url} onClose={() => openModal()} />
			<h5 className="title">Nội dung khóa học</h5>

			<Accordion className="accordion">
				{items.map(({ header, content }, i) => (
					<AccordionItem header={header} key={i} className="accordion-item">
						{content}
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
