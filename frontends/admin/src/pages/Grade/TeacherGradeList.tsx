import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Grade } from '../../types/Grade.ts'
import { useNavigate } from 'react-router-dom';
import { addGrade, deleteGrade,findByUser,createDiscord } from '../../service/GradeService.ts';
import { confirmDelete, showAlert } from '../../utils/swalUtils.ts';
import { Pencil, Trash2 } from 'lucide-react';
import { Course } from '../../types/Course.ts';
import { getCourses1 } from '../../service/CourseService.ts';
import { formatDate } from '../../utils/dateUtils.ts';
import { findByRole } from '../../service/AccountService.ts';

const TeacherGradeList = () =>{
  const [grades, setGrades] = useState<Grade[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalCertificate, setTotalCertificate] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [grade, setGrade] = useState({
    number_student: 0,
    course_id:0 ,
    name: "",
    id: 0,
    code: "",
    study_time : "",
    study_date : '',
    remain_student: 0,
    start_date: "",
    teacher: 0,
    account_id: [0]
  });
  const [error, setError] = useState({
    number_student: "",
    course_id:"" ,
    name: "",
    id: "",
    code: "",
    study_time : "",
    study_date : '',
    remain_student: "",
    start_date: "",
    teacher: "",
    account_id: [0]
  });
  const [disabled, setDisabled] = useState(true);
  const [course, setCourse] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState([{id: 0, fullName: ""}]);
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    getAllTeacher()
    getAllCourse()
  },[modalOpen]);

  function getAllCourse(){
    getCourses1({}).then((response: any) => {
        setCourse(response.content);
        setTotalCertificate(response.totalElements);
      })
      .catch((error: any) => console.error(error));
  }
  function getAllTeacher() {
    let arr = []
    findByRole("TEACHER").then((response: any) => {
      const teachers = response.content.map((teacher: any) => ({
        id: teacher.id,
        fullName: teacher.fullName
      }));
      arr.push(teachers);
      setTeachers(teachers);
    });
  }

  useEffect(() => {
    void setItemsPerPage;
    void disabled;
    getAllGrades()
  }, [currentPage, itemsPerPage]);

  function getAllGrades(){
    findByUser({page: currentPage,size: 5}).then((response:any) => {
      let gradeArray = [];

      for (const grade of response.content) {
        const a = {
          number_student: grade.number_student,
          course_name:grade.course_name,
          course_id:grade.course_id ,
          name: grade.name,
          id: grade.id,
          code: grade.code,
          study_time : grade.study_time,
          study_date : grade.study_date,
          remain_student: grade.remain_student,
          start_date: grade.start_date,
          teacher: {}
        }
        for (const acc of grade.accountDto) {
            if (acc.roles.some(role => role.code === "TEACHER")) {
              a.teacher = {id: acc.id,name: acc.fullName }
            }
        }
        gradeArray.push(a)
      }
      setGrades(gradeArray);
      setTotalPages(response.totalPages);
      setTotalCertificate(response.totalElements)
    }).catch((error:any) => console.error(error));
  }
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };


  const handleEdit = (id: number) => {
    navigate(`/updateGrade/${id}`)
  };

  const handleSave = () => {
        grade.account_id = [Number(grade.teacher)];
        addGrade(grade)
          .then((response:any) => {
            console.log("data",response.data);
            setModalOpen(false);
            getAllGrades();
            showAlert('Thêm thành công!', 'Thêm lớp học thành công.', 'success');
            resetGrade();

          }).then(() => {
            createDiscord(grade.name).catch(() => {});
        })
          .catch((error: any) => console.error("Lỗi thêm mới:", error));
  };

  const resetGrade = () => {
    setGrade({
      number_student: 0,
      course_id:0 ,
      name: "",
      id: 0,
      code: "",
      study_time : "",
      study_date : '',
      remain_student: 0,
      start_date: "",
      teacher: 0,
      account_id: [0]
    });
  };

  const handleRemove = (id: number) => {
    console.log('id remove',id)
    confirmDelete('Bạn chắc chắn mốn xóa lớp này ?','Hành động này không thể hoàn tác!',() => {
      deleteGrade(id).then(() => {
          getAllGrades()
      }).catch((error: any) => console.error(error));
    })
  }

  const handleAdd = () => {
    setModalOpen(true);
  };
  return (
    <>
      <Breadcrumb pageName="Danh sách lớp"/>

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-4 px-6 font-semibold">STT</th>
                <th className="py-4 px-6 font-semibold">Tên lớp</th>
                <th className="py-4 px-6 font-semibold">Số xuất</th>
                <th className="py-4 px-6 font-semibold">Còn lại</th>
                <th className="py-4 px-6 font-semibold">Giáo viên</th>
                <th className="py-4 px-6 font-semibold">Tên khóa học</th>
                <th className="py-4 px-6 font-semibold">Thời gian học</th>
                <th className="py-4 px-6 font-semibold">Khai giảng</th>
                <th className="py-4 px-6 font-semibold">Thao tác</th>
              </tr>
              </thead>
              <tbody>
              {grades.map((grade, index) => (
                <tr key={grade.id}>
                  <td className="py-4 px-6">
                    {index + 1 + currentPage * itemsPerPage}
                  </td>
                  <td className="py-4 px-6">{grade.name}</td>
                  <td className="py-4 px-6">{grade.number_student}</td>
                  <td className="py-4 px-6">{grade.remain_student}</td>
                  <td className="py-4 px-6">{grade.teacher.name}</td>
                  <td className="py-4 px-6">{grade.course_name}</td>
                  <td className="py-4 px-6">Thứ {grade.study_date} - {grade.study_time}</td>
                  <td className="py-4 px-6">{formatDate(grade.start_date)}</td>
                  <td className="py-4 px-6 flex gap-4" style={{marginTop:'15%'}}>
                    <button className="text-yellow-600 hover:text-yellow-800 transition">
                      <Pencil onClick={() => handleEdit(Number(grade.id))} size={20} />
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition">
                      <Trash2 onClick={() => handleRemove(Number(grade.id)) } size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end">
                <li
                  className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    className={`page-item ${
                      currentPage === index ? 'active' : ''
                    }`}
                    key={index}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages - 1 ? 'disabled' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[1000px] relative">
            <h3 className="text-xl font-semibold mb-4">Thêm lớp học</h3>
            <span style={{color : "red"}}>Chú ý nhập đúng ngày giờ khai giảng, học để tự động tạo thời khóa biểu</span>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
              <div className={"col"} style={{ flexBasis: '46%'}}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Tên lớp</label>
                  <input type="text" name="name" value={grade.name} onChange={(e) => setGrade({ ...grade, name: e.target.value })} className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                  {error.name && <div className='invalid-feedback'>{error.name}</div>}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Số lượng học sinh</label>
                  <input type="text" name="name" value={grade.number_student} onChange={(e) => setGrade({ ...grade, number_student: Number(e.target.value), remain_student: Number(e.target.value) })} className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                  {error.number_student && <div className='invalid-feedback'>{error.number_student}</div>}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Khai giảng</label>
                  <input type="date" name="name" value={grade.start_date} onChange={(e) => setGrade({ ...grade, start_date: (e.target.value) })} className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                  {error.start_date && <div className='invalid-feedback'>{error.start_date}</div>}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Giáo viên</label>
                  <select
                    value={grade.teacher}
                    onChange={(e) => setGrade({ ...grade, teacher: Number(e.target.value) })}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Chọn giáo viên</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.fullName}
                      </option>
                    ))}
                  </select>
                  {error.teacher && <div className='invalid-feedback'>{error.teacher}</div>}
                </div>
              </div>
             <div className={"col"} style={{ flexBasis: '46%', marginLeft: '5%' }}>
               <div className="mb-4">
                 <label className="block text-gray-700 font-medium">Thời gian học</label>
                 <input placeholder={"Điền các thứ trong tuần, vd: 2,4,6 hoặc 3,5,7 ..."} type="text" name="name" value={grade.study_date} onChange={(e) => setGrade({ ...grade, study_date: (e.target.value) })} className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
               </div>
               <div className="mb-4">
                 <label className="block text-gray-700 font-medium">Giờ học</label>
                 <select
                   value={grade.study_time}
                   onChange={(e) => setGrade({ ...grade, study_time: (e.target.value) })}
                   className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                 >
                   <option value="">Chọn thời gian</option>
                   <option value={"17:00-18:30"}>17:00-18:30</option>
                   <option value={"18:00-19:30"}>18:00-19:30</option>
                   <option value={"19:00-20:30"}>19:00-20:30</option>
                   <option value={"20:00-21:30"}>20:00-21:30</option>
                   <option value={"21:00-22:30"}>21:00-22:30</option>

                 </select>
                 {error.study_time && <div className='invalid-feedback'>{error.study_time}</div>}
               </div>
               <div className="mb-4.5">
                 <label className="block text-gray-700 font-medium">Khóa học</label>

                 <select
                   value={grade.course_id}
                   onChange={(e) => setGrade({ ...grade, course_id: Number(e.target.value) })}
                   className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                 >
                   <option value="">Chọn khóa học</option>
                   {course.map((course) => (
                     <option key={course.id} value={course.id}>
                       {course.name}
                     </option>
                   ))}

                 </select>
                 {error.course_id && <div className='invalid-feedback'>{error.course_id}</div>}
               </div>
               <div className="flex gap-4">
                  <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700" onClick={handleSave} >Lưu</button>
                 <button className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600" onClick={() => { setGrade({
                   number_student: 0,
                   course_id:0 ,
                   name: "",
                   id: 0,
                   code: "",
                   study_time : "",
                   study_date : '',
                   remain_student: 0,
                   start_date: "",
                   teacher: 0,
                   account_id: [0]
                 }); setModalOpen(false); }}>Hủy</button>
               </div>
             </div>
           </div>

          </div>
        </div>
      )}
    </>
  );
}
export default TeacherGradeList;