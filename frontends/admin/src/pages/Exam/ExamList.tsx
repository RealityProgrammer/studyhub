import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Eye, FileText, Pencil, RefreshCcw, Search, Trash2, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Exam } from '../../types/Exam.ts';
import { addExam, deleteExamById, findByNameAndCode, getAllExams } from '../../service/ExamService.ts';
import { confirmDelete, showAlert } from '../../utils/swalUtils.ts';
import { useNavigate } from 'react-router-dom';

const ExamList = () => {
  const [exam, setExam] = useState<Exam[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalExam, setTotalExam] = useState(0);
  const [check,SetCheck] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({
    id: 0,
    code: '',
    name: '',
    duration: 0,
    number_question: 0,
  });
  const [searchParams,setSearchParams] = useState({
    code:'',
    name:''
  })
  useEffect(() => {
    void setItemsPerPage;
    getAll()
  }, [currentPage, itemsPerPage,check]);

  function getExam() {
    getAllExams(currentPage, itemsPerPage)
      .then((response: any) => {
        setExam(response.content);
        setTotalExam(response.totalElements);
      })
      .catch((e) => console.error(e));
  }
  function getAll(){
    if (searchParams.code || searchParams.name) {
      getDataSearch()
    }else {
      getExam();
    }
  }
  function getDataSearch(){
    findByNameAndCode(searchParams, currentPage, itemsPerPage).then((response: any) => {
      setExam(response.content);
      setTotalExam(response.totalElements);
    }).catch((e) =>{
      console.error(e);
    })
  }

  const totalPages = Math.ceil(totalExam / itemsPerPage);

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
    getAll()
  };
  const navigate = useNavigate();
  const handleShow = (id: number) => {
    navigate(`/showDetailExam/${id}`)
  };

  const handleEdit = (id: number) => {
    navigate(`/updateExam/${id}`)
    SetCheck(prevState => !prevState);

  };
  const handleRemove = (id: number) => {
    confirmDelete('Bạn chắc chắn xóa bài thi này ?','Hành động này không thể hoàn tác !',() =>{
      deleteExamById(id).then(() =>{
        getExam()
        SetCheck(prevState => !prevState);

      }).catch((error: any) => console.error(error));
    })
  };
  const handleSave = () => {
    addExam(data).then(() => {
      showAlert(
        'Thêm thành công!',
        'Bài thi đã được thêm vào hệ thống.',
        'success',
      );
      SetCheck(prevState => !prevState);
      setOpenModal(false);
    }).catch((error: any) => console.error(error));
  };
  const handleSearch = () =>{
    getDataSearch()
  }
  return (
    <>
      <Breadcrumb pageName="Danh sách bài thi" />
      <button
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        style={{ width: 150, marginBottom: 10 }}
        onClick={() => setOpenModal(true)}
      >
        Thêm bài thi
      </button>
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 min-w-[150px]">
          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            name="code"
            value={searchParams.code}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                code: e.currentTarget.value,
              })
            }
            className="w-full rounded-lg border-[1.5px] border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Mã bài thi"
          />
        </div>
        <div className="relative flex-1 min-w-[150px]">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            name="certificateName"
            value={searchParams.name}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                name: e.currentTarget.value,
              })
            }
            className="w-full rounded-lg border-[1.5px] border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Tên bài thi"
          />
        </div>
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all text-lg font-semibold"
        >
          <Search size={20} />
          Tìm kiếm
        </button>
        <button
          // onClick={handleRefresh}
          className="flex items-center justify-center gap-2 bg-gray-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition-all text-lg font-semibold"
        >
          <RefreshCcw size={20} />
          Làm mới
        </button>
      </div>
      <div className="flex flex-col gap-10">
        <div className="rounded-lg border border-gray-300 bg-white shadow-lg p-6">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-4 px-6 font-semibold">STT</th>
                <th className="py-4 px-6 font-semibold">Mã bài thi</th>
                <th className="py-4 px-6 font-semibold">Tên bài thi</th>
                <th className="py-4 px-6 font-semibold">Thời gian thi</th>
                <th className="py-4 px-6 font-semibold">Số câu</th>
                <th className="py-4 px-6 font-semibold">Thao tác</th>
              </tr>
              </thead>
              <tbody>
              {exam.map((exam, index) => (
                <tr
                  key={exam.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-4 px-6">
                    {index + 1 + currentPage * itemsPerPage}
                  </td>
                  <td className="py-4 px-6">{exam.code}</td>
                  <td className="py-4 px-6">{exam.name}</td>
                  <td className="py-4 px-6">{exam.duration}p</td>
                  <td className="py-4 px-6">{exam.number_question}</td>
                  <td className="py-4 px-6 flex gap-4">
                    <button
                      onClick={() => handleShow(exam.id)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => handleEdit(exam.id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => handleRemove(exam.id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 size={20} />
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
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[500px] relative">
            <h3 className="text-xl font-semibold mb-4">Thêm bài thi</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Tên bài thi
              </label>
              <input
                type="text"
                onChange={(e) => setData({ ...data, name: e.target.value })}
                name="code"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Thời gian thi ( phút )
              </label>
              <input
                type="text"
                name="name"
                onChange={(e) =>
                  setData({ ...data, duration: Number(e.target.value) })
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Số câu</label>
              <input
                type="text"
                name="name"
                onChange={(e) =>
                  setData({ ...data, number_question: Number(e.target.value) })
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Thêm mới
              </button>
              <button
                onClick={() => setOpenModal(false)}
                className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
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
export default ExamList;
