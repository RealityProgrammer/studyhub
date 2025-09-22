import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import {Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateGrade,addStudentIntoGrade, deleteStudentOuttoGrade, findGradeById } from '../../service/GradeService.ts';
import { Grade } from '../../types/Grade.ts';
import { Account } from '../../types/Account.ts';
import { formatDate1 } from '../../utils/dateUtils.ts';
import { findByRole } from '../../service/AccountService.ts';
import { showAlert } from '../../utils/swalUtils.ts';

const GradeForm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [check, setCheck] = useState(false);
  const [student,setStudent] = useState<Account[]>([])
  const [studentDontErolled,setStudentDontErolled] = useState<Account[]>([])
  const {id} = useParams();
  const [updateGradeform, setUpdateGrade] = useState({
    number_student: 0,
    course_id:0 ,
    name: "",
    id: 0,
    code: "",
    study_time : "",
    study_date : '',
    remain_student: 0,
    start_date: "",
    teacher: { id: 0, fullName: "" },
    account_id: [0]
  });
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([{id: 0, fullName: ""}]);
  let grade1: Grade
  useEffect(() => {
    void isEditing;
    getAllTeacher()
    findGradeById(Number(id)).then((response:any) =>{
      grade1 = {
        id: response.data.id || 0,
        code: response.data.code || "",
        name: response.data.name || "",
        number_student: response.data.number_student || 0,
        course_name: response.data.course_name || "",
        course_id: response.data.course_id || 0,
        start_date: response.data.start_date || "",
        remain_student: response.data.remain_student || 0,
        teacher:  {}, // Nếu teacher có thể là null, cần kiểm tra
        study_time: response.data.study_time || "",
        study_date: response.data.study_date || "",
      };
      for (const acc of response.data.accountDto) {
        if (acc.roles.some(role => role.code === "TEACHER")) {
          grade1.teacher = {id: acc.id,fullName: acc.fullName }
        }
      }
      setUpdateGrade(grade1);
      const students = response.data.accountDto.filter(acc => acc.id !== grade1.teacher?.id);
      setStudent(students);
      findByRole("USER").then(response => {
        const allStudents = response.content.filter(acc => !students.some(student => student.id === acc.id));
        setStudentDontErolled(allStudents);
      });
    })
  }, [check]);
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
  const handleSave = () => {
    updateGradeform.account_id = [Number(updateGradeform.teacher.id)];
    updateGrade(updateGradeform)
      .then(() => {
        showAlert('Cập nhật thành công!', 'Cập nhật lớp học thành công.', 'success');
      })
      .catch((error: any) => console.error("Lỗi Cập nhật:", error));
  };
  const handleAddStudent = () =>{
      addStudentIntoGrade({id: updateGradeform.id,studentEmails: selectedEmails})
        .then(response => {
          showAlert(response.data, response.data, 'success');
          setCheck(prevState => !prevState);
          setModalOpen(false);
        })
  }
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const addListStd = async (e :any) => {
    const { value, checked } = e.target;

    if (checked){
      setSelectedEmails(prev =>  [...prev, value])
    }else {
      setSelectedEmails(prev =>  prev.filter(email => email !== value))
    }
  };
  const deleteStudent = (email: string)=> {
    deleteStudentOuttoGrade({id: updateGradeform.id,studentEmail: email})
      .then(response => {
        showAlert(response.data, response.data, 'success');
        setCheck(prevState => !prevState);
      })
  }
  return (
    <>
      <Breadcrumb pageName="Chỉnh sửa lớp học" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-4 flex gap-4">
            <div className="w-full">
              <div className="mb-4 flex gap-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Mã Lớp
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={updateGradeform.code}
                    disabled
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Tên khóa học
                  </label>
                  <div className="relative">
                    <input
                      disabled={true}
                      type="text"
                      name="number"
                      value={updateGradeform.course_name}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4 flex gap-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Tên Lớp
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={updateGradeform.name}
                    onChange={(e) =>
                      setUpdateGrade({
                        ...updateGradeform,
                        name: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Giáo viên
                  </label>
                  <select
                    value={updateGradeform.teacher.id}
                    onChange={(e) => {
                      const selectedTeacher = teachers.find(
                        (teacher) => teacher.id === Number(e.target.value),
                      );
                      setUpdateGrade({
                        ...updateGradeform,
                        teacher: {
                          id: Number(e.target.value),
                          fullName: selectedTeacher
                            ? selectedTeacher.fullName
                            : '',
                        },
                      });
                    }}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value={updateGradeform.teacher.id}>
                      {updateGradeform.teacher.fullName}
                    </option>
                    <option value="">Chọn giáo viên</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.fullName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-4 flex gap-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Số lượng học sinh
                  </label>
                  <input
                    type="text"
                    name="number"
                    value={updateGradeform.number_student}
                    onChange={(e) =>
                      setUpdateGrade({
                        ...updateGradeform,
                        number_student: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Còn lại
                  </label>
                  <input
                    type="text"
                    name="number"
                    value={updateGradeform.remain_student}
                    onChange={(e) =>
                      setUpdateGrade({
                        ...updateGradeform,
                        remain_student: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4 flex gap-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Khai giảng
                  </label>
                  <input
                    disabled
                    type="date"
                    name="number"
                    value={formatDate1(updateGradeform.start_date)}
                    onChange={(e) =>
                      setUpdateGrade({
                        ...updateGradeform,
                        start_date: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Ngày học
                  </label>
                  <div className="relative">
                    <input
                      disabled
                      type="text"
                      name="number"
                      value={updateGradeform.study_date}
                      onChange={(e) =>
                        setUpdateGrade({
                          ...updateGradeform,
                          study_date: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4 flex gap-4">
                <div className="w-1/2">
                  <label className="blo ck text-gray-700 font-medium">
                    Giờ học
                  </label>
                  <input
                    disabled
                    type="text"
                    name="number"
                    value={updateGradeform.study_time}
                    onChange={(e) =>
                      setUpdateGrade({
                        ...updateGradeform,
                        study_time: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div style={{ textAlign: 'right', width: '100%' }}>
                <button
                  className="w-50 mr-0 bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-4  mt-4"
                  onClick={() => handleSave()}
                >
                  Cập nhật
                </button>
              </div>

              <label
                className="block text-gray-700 font-medium mt-10"
                style={{ fontSize: 22, textAlign: 'center' }}
              >
                Danh sách sinh viên
              </label>
            </div>
          </div>
          {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-xl w-[1000px] relative">
                {/* Nút đóng modal */}
                <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-2xl font-bold"
                  onClick={() => setModalOpen(false)}
                >
                  ×
                </button>

                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Chọn</th>
                        <th className="py-3 px-6 text-left">Mã</th>
                        <th className="py-3 px-6 text-left">Tên</th>
                        <th className="py-3 px-6 text-left">Email</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                      {studentDontErolled.map((student) => (
                        <tr
                          className="border-b border-gray-200 hover:bg-gray-100"
                          key={student.email}
                        >
                          <td className="py-3 px-6 text-left">
                            <input
                              type="checkbox"
                              value={student.email}
                              onChange={(e) => addListStd(e)}
                            />
                          </td>
                          <td className="py-3 px-6 text-left">
                            {student.code}
                          </td>
                          <td className="py-3 px-6 text-left">
                            {student.fullName}
                          </td>
                          <td className="py-3 px-6 text-left">
                            {student.email}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-4 mt-4"
                  onClick={() => handleAddStudent()}
                >
                  Thêm sinh viên
                </button>
              </div>
            </div>
          )}
          <div className="mt-6">
            <div className="flex justify-end mt-6">
              <button
                style={{ width: 150, height: 50 }}
                onClick={() => {
                  setModalOpen(true);
                  setIsEditing(false);
                }}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-4"
              >
                Thêm sinh viên
              </button>
            </div>
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto text-left">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="py-4 px-6 font-semibold">STT</th>
                    <td className="py-4 px-6 font-semibold">Mã học sinh</td>
                    <th className="py-4 px-6 font-semibold">Tên học sinh</th>
                    <th className="py-4 px-6 font-semibold">Email</th>
                    <th className="py-4 px-6 font-semibold">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {student.map((data, index) => (
                    <tr key={data.id}>
                      <td className="py-4 px-6">{index + 1}</td>
                      <td className="py-4 px-6">{data.code}</td>
                      <td className="py-4 px-6">{data.fullName}</td>
                      <td className="py-4 px-6">{data.email}</td>
                      <td className="py-4 px-4">
                        <button
                          style={{ marginLeft: 33 }}
                          className="text-red-600 hover:text-red-800 transition"
                          onClick={() => deleteStudent(data.email)}
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => navigate('/grade')}
              className="bg-primary w-30 h-12 text-white py-2 px-6 rounded mb-4"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GradeForm;
