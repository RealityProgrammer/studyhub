import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  addExamDetails,
  deleteExamDetails,
  findExamDetailsById,
  getExamDetailsById,
  updateExamDetails,
} from '../../service/ExamDetailService.ts';
import { Pencil, Trash2 } from 'lucide-react';
import { Exam } from '../../types/Exam.ts';
import { findExamById, updateExam } from '../../service/ExamService.ts';
import { ExamDetails } from '../../types/ExamDetails.ts';
import { confirmDelete, showAlert } from '../../utils/swalUtils.ts';

const ExamComponent = ({ isEdit = false }: { isEdit?: boolean }) => {
  const [exam, setExam] = useState<Exam>({
    id: 0,
    code: '',
    name: '',
    duration: 0,
    number_question: 0,
  });
  const [data, setData] = useState<ExamDetails[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalExamDetails, setTotalExamDetails] = useState(0);
  const [examDetails, setExamDetails] = useState<ExamDetails>({
    id: 0,
    name: '',
    answer: '',
    description: '',
    url: '',
    examId: 0,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    void setItemsPerPage;
    getDetails()
    findExamById(Number(id)).then((response: any) => {
      setExam(response.data);
    });
  }, [currentPage,itemsPerPage]);
  function getDetails(){
    getExamDetailsById(Number(id),currentPage,itemsPerPage).then((response: any) => {
      setData(response.content);
      setTotalExamDetails(response.totalElements)
    });
  }
  const totalPages = Math.ceil(totalExamDetails / itemsPerPage);

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

  const handlePageChange = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };
  const handleEdit = (id: number) => {
    console.log('edit ', id);
    setOpenModal(true);
    setIsEditing(true);
    findExamDetailsById(id).then((response: any) => {
      setExamDetails(response.data);
    });
  };
  const handleUpdate = (id: number) => {
    if (exam) {
      updateExam(id, exam)
        .then(() => {
          showAlert('Thành công', 'Cập nhật hành công !', 'success');
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  };
  const handleRemove = (id: number) => {
    confirmDelete(
      'Bạn chắc chắn xóa nội dung này ?',
      'Hành động này không thể hoàn tác !',
      () => {
        deleteExamDetails(id)
          .then(() => {
            setData((prev) => prev.filter((item) => item.id !== id));
          })
          .catch((error: any) => {
            console.error(error);
          });
      },
    );
  };
  const handleSave = () => {
    if (isEditing) {
      updateExamDetails(examDetails.id, examDetails)
        .then(() => {
          showAlert('Thành công', 'Cập nhật nội dung thành công !', 'success');
          setExamDetails({
            id: 0,
            name: '',
            answer: '',
            description: '',
            url: '',
            examId: 0,
          });
          setOpenModal(false);
          setData((prev) =>
            prev.map((item) =>
              item.id === examDetails.id ? examDetails : item,
            ),
          );
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      const examDetailDto = { ...examDetails, examId: exam.id };
      addExamDetails(examDetailDto)
        .then(() => {
          showAlert('Thành công','Thêm câu hỏi thành công!','success');
          setOpenModal(false);
          setExamDetails({
            id: 0,
            name: '',
            answer: '',
            description: '',
            url: '',
            examId: 0,
          });
          getDetails()
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  };
  return (
    <>
      <Breadcrumb
        pageName={isEdit ? 'Chỉnh sửa bài thi' : 'Chi tiết bài thi'}
      />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-4 flex gap-4">
            <div className="w-full">
              <div className="mb-4 flex gap-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Mã bài thi
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={exam?.code}
                    disabled
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Tên bài thi
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={exam?.name || ''}
                    onChange={(e) => {
                      setExam((prevExam) => ({
                        ...prevExam,
                        name: e.target.value,
                      }));
                    }}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4 flex gap-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Thời lượng thi
                  </label>
                  <input
                    type="number"
                    name="number"
                    value={exam?.duration}
                    onChange={(e) => {
                      setExam((prevExam) => ({
                        ...prevExam,
                        duration: Number(e.target.value),
                      }));
                    }}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Số lượng câu hỏi
                  </label>
                  <input
                    type="number"
                    name="name"
                    value={exam?.number_question}
                    onChange={(e) => {
                      setExam((prevExam) => ({
                        ...prevExam,
                        number_question: Number(e.target.value),
                      }));
                    }}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <button
                hidden={!isEdit}
                onClick={() => handleUpdate(Number(exam?.id))}
                className="w-40 h-12 bg-primary text-white py-2 rounded hover:bg-blue-700 mb-4 float-right"
              >
                Cập nhật
              </button>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold pb-3">
              Chi tiết nội dung bài thi
            </h2>
            <button
              onClick={() => {
                setOpenModal(true);
                setIsEditing(false);
              }}
              hidden={!isEdit}
              style={{ width: 150, height: 50 }}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-4"
            >
              Thêm chi tiết
            </button>

            <div className="space-y-4">
              {data.map((data) => (
                <div
                  key={data.id}
                  className="p-4 border rounded-lg shadow hover:bg-gray-100 transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold">{data.name}</p>
                      <p className="text-sm text-gray-600">
                        Câu hỏi : {data.description}
                      </p>
                      <span className="text-xs text-gray-500">
                        Đáp án : {data.answer}
                      </span>
                      <p className="text-xs text-gray-500">Url : {data.url}</p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        hidden={!isEdit}
                        onClick={() => handleEdit(data.id)}
                        className="text-yellow-600 hover:text-yellow-800 transition"
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        hidden={!isEdit}
                        onClick={() => handleRemove(data.id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
          <div className="flex justify-end mt-6">
            <button
              onClick={() => navigate('/exam')}
              className="bg-primary w-40 h-12 text-white py-2 px-6 rounded"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[500px] relative">
            <h3 className="text-xl font-semibold mb-4">
              {isEditing ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi'}
            </h3>
            <input hidden value={exam.id} />
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Câu số</label>
              <input
                type="text"
                name="name"
                value={examDetails.name}
                onChange={(e) => {
                  setExamDetails((prevExam) => ({
                    ...prevExam,
                    name: e.target.value,
                  }));
                }}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Câu hỏi</label>
              <input
                type="text"
                name="name"
                value={examDetails.description}
                onChange={(e) => {
                  setExamDetails((prevExam) => ({
                    ...prevExam,
                    description: e.target.value,
                  }));
                }}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Đáp án đúng
              </label>
              <input
                type="text"
                name="name"
                value={examDetails.answer}
                onChange={(e) => {
                  setExamDetails((prevExam) => ({
                    ...prevExam,
                    answer: e.target.value,
                  }));
                }}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Url</label>
              <input
                type="text"
                name="name"
                value={examDetails.url}
                onChange={(e) => {
                  setExamDetails((prevExam) => ({
                    ...prevExam,
                    url: e.target.value,
                  }));
                }}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                {isEditing ? 'Cập nhật' : 'Thêm câu hỏi'}
              </button>
              <button
                className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                onClick={() => {
                  setOpenModal(false);
                  setExamDetails({
                    id: 0,
                    name: '',
                    answer: '',
                    description: '',
                    url: '',
                    examId: 0,
                  });
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ExamComponent;
