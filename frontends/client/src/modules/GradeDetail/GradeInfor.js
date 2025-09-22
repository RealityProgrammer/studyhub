	import Image from "next/image";
	import FullCalendar from '@fullcalendar/react'
	import dayGridPlugin from '@fullcalendar/daygrid'
	import timeGridPlugin from "@fullcalendar/timegrid";
	import interactionPlugin from "@fullcalendar/interaction";
	import viLocale from "@fullcalendar/core/locales/vi";
	import {useEffect, useState} from "react"; // Import interaction

	export default function GradeInfo(props) {
		const [Timetables,setTimetables] = useState([]);
		let {item} = props;
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

		return (
			<div className="">
				<h5 className="title">Về khóa học</h5>
					<FullCalendar
						locale={viLocale}
						plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
						initialView="timeGridWeek"
						headerToolbar={{
							left: "prev,next today",
							center: "title",
							right: "dayGridMonth,timeGridWeek",
						}}
						events={
							Timetables
						}
						eventTimeFormat={{
							hour: "2-digit",
							minute: "2-digit",
							hour12: false,
						}}
					/>
			</div>

		)
	}
