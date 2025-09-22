import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import { useEffect, useState } from "react";
import ModalVideo from 'react-modal-video';
import api from "/src/route/route";

export default function CourseContent({ item }) {
	const [isOpen, setIsOpen] = useState(false);
	const [Timetables,setTimetables] = useState([]);
	const  [url, setUrl] = useState("");
	useEffect(() => {
		let a = item.map((timetable) => ({
			date: timetable.date.split("T")[0] + "T",
			time: timetable.time.split("-"),
			start: timetable.date.split("T")[0] + "T" + timetable.time.split("-")[0] + ":00",
			end: timetable.date.split("T")[0] + "T" + timetable.time.split("-")[1] + ":00",
			title: "Buổi " + timetable.period + ": " + timetable.name,
			url: timetable.url,
			id: timetable.id,
		}));
		setTimetables(a);
	},[item]);

	const openModal = (videoUrl = "0") => {
		setIsOpen(prev => !prev);
		setUrl(videoUrl);
	};
	function getYoutubeVideoId(url) {
		const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=)?([^&?/]+)/);
		return match ? match[1] : null;
	}
	const items = Timetables.map((timetable, index) => ({
		header: (
			<span> {timetable.title}</span>
		),
		content: (
			<a href="#" className="play-vedio-wrapper" onClick={() => {openModal(getYoutubeVideoId(timetable.url));}}>
				<div className="left">
					<i className="fa-light fa-circle-play"></i>
					<span>Video học thử</span>
				</div>
				<div className="right">
					<span className="play">Xem</span>
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
					<AccordionItem header={header} key={i} initialEntered className="accordion-item">
						{content}
					</AccordionItem>
				)).slice(0, 1)}
				{items.map(({ header, content }, i) => (
					<AccordionItem header={header} key={i} className="accordion-item">
						{content}
					</AccordionItem>
				)).slice(1, 5)}
			</Accordion>
		</div>
	);
}
