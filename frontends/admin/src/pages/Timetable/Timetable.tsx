import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Grade } from '../../types/Grade.ts'
import { getGrades } from '../../service/GradeService.ts';
// import { confirmDelete, showAlert } from '../../utils/swalUtils.ts';
import { FileText } from 'lucide-react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import { getTimeTableByGradeId } from '../../service/TimetableService.ts';
import { TimetableEntity } from '../../types/Timetable.ts'
import interactionPlugin from "@fullcalendar/interaction";
import viLocale from "@fullcalendar/core/locales/vi";

const Timetable = () =>{
  const [grades, setGrades] = useState<Grade[]>([]);
  const [Timetables, setTimetable] = useState<TimetableEntity[]>([]);
  useEffect(() => {
    getAllGrades()
  }, []);

  function getAllGrades(){
    getGrades(0, 0).then((response:any) => {
      setGrades(response.content);
    }).catch((error:any) => console.error(error));
  }
  const handleSearch  = (e:any) => {
      const {value} = e.target;
      getTimeTableByGradeId( value, 0, 0)
        .then((response: any) => {
            const timetableData = response.content.map((ttb: any) => TimetableEntity.instance(ttb));
            setTimetable(timetableData);
            console.log(timetableData);
          })
  }
  const redirectDiscord = ()=>{
    const url = Timetables
    if (url.length ==0) {
      alert("Vui lòng chọn lớp!")
    }else {
      window.location.href=("http://localhost:3002/react-rtc-demo")
    }
  }
  return (
    <>
      <Breadcrumb pageName="Thời khóa biểu"/>
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 min-w-[150px]">
          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            name="certificateName"
            onChange={(e) =>handleSearch(e)}
            className="w-full rounded-lg border-[1.5px] border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
              <option value="">Chọn lớp</option>
              {grades.map(grade => (
                <option value={grade.id}> {grade.name} - {grade.code}</option>
              ))}
          </select>
        </div>

        <div>
          <button  className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-700"   onClick={()=>redirectDiscord()}>Phòng học</button>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
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
        </div>
      </div>
    </>
  );
}
export default Timetable;