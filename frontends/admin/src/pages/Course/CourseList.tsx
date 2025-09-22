import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Building, CheckCircle, Eye, FileText, List, Pencil, RefreshCcw, Search, Tag, Trash2 } from 'lucide-react';
import { deleteCourse, getCourseByCondition, getCourses } from '../../service/CourseService.ts';
import  { useEffect, useState } from 'react';
import { Course } from '../../types/Course.ts';
import { useNavigate } from 'react-router-dom';
import { confirmDelete } from '../../utils/swalUtils';
import { formatCurrency } from '../../utils/Utils.ts';
import { listCategories } from '../../service/CategoryService.ts';
import { Category } from '../../types/Category.ts';
const CourseList = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalCourse, setTotalCourse] = useState(0);
  const [categories,setCategories] = useState<Category[]>([]);
  const [param, setParam] = useState({
    code: '',
    name: '',
    aim: '',
    category: '',
    status: '',
  });
  const navigate = useNavigate();
  useEffect(() => {
    void setItemsPerPage;
    getData();
    listCategories(0,30).then((response: any) => {
      setCategories(response.content);
    });
  }, [currentPage, itemsPerPage]);
  function getData(){
    if ( param.category || param.name || param.code || param.aim || param.status){
      dataSearch()
    }else {
      getAllCourse()
    }
  }

  function getAllCourse(){
    getCourses(currentPage, itemsPerPage).then((response:any) =>{
      setCourses(response.content);
      setTotalCourse(response.totalElements)
    }).catch((error: any) => console.error(error));
  }



  const totalPages = Math.ceil(totalCourse / itemsPerPage);
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
    getData()
  };

  const handleShow = (id: number) => {
    navigate(`/showDetails/${id}`)
  };
  const handleEdit = (id:number) =>{
    navigate(`/updateCourse/${id}`)
  }
  const handleRemove = (id: number) => {
    console.log('id remove',id)
    confirmDelete('Bạn chắc chắn mốn xóa khóa học này ?','Hành động này không thể hoàn tác!',() => {
      deleteCourse(id).then(() => {
          getAllCourse()
      }).catch((error: any) => console.error(error));
    })
  }
  const handleSearch = () =>{
    dataSearch()
  }
  function dataSearch(){
    getCourseByCondition(currentPage,itemsPerPage,param).then((response:any) =>{
      setCourses(response.content);
      setTotalCourse(response.totalElements)
    })
  }
  const handleReset = () =>{
    setParam({
      code: '',
      name: '',
      aim: '',
      category: '',
      status: '',
    })
    getAllCourse()
  }
  return (
    <>
      <Breadcrumb pageName="Danh sách khóa học" />
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-xl shadow-md">
        <div className="relative flex-1 min-w-[250px]">
          <FileText
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            name="code"
            value={param.code}
            onChange={(e) => setParam({...param,code:e.target.value})}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Mã khóa học"
          />
        </div>

        <div className="relative flex-1 min-w-[350px]">
          <Tag
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            name="name"
            value={param.name}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Tên khóa học"
            onChange={(e) =>  setParam({ ...param, name: e.target.value })}
          />
        </div>

        <div className="relative flex-1 min-w-[250px]">
          <Building
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            name="aim"
            value={param.aim}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Mục tiêu"
            onChange={(e) => setParam({...param,aim:e.target.value})}
          />
        </div>
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 bg-gray-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition-all text-lg font-semibold">
          <RefreshCcw size={20} />
          Làm mới
        </button>
        <div className="relative flex-1 min-w-[350px]">
          <List
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <select
            value={param.category}
            onChange={(e) =>  setParam({ ...param, category: e.target.value })}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
            <option>Chọn danh mục</option>
            {categories.map((categories) => (
              <option key={categories.id} value={Number(categories.id)}>{categories.name}</option>
            ))}
          </select>
        </div>

        <div className="relative flex-1 min-w-[250px]">
          <CheckCircle
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <select
            value={param.status}
            onChange={(e) => setParam({...param,status: e.target.value})}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
            <option>Chọn trạng thái</option>
            <option value="Đã duyệt">Đã duyệt</option>
            <option value="Chờ duyệt">Chờ duyệt</option>
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all text-lg font-semibold">
          <Search size={20} />
          Tìm kiếm
        </button>
      </div>
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-4 px-6 font-semibold">STT</th>
                  <th className="py-4 px-6 font-semibold">Mã khóa học</th>
                  <th className="py-4 px-6 font-semibold">Ảnh</th>
                  <th className="py-4 px-6 font-semibold">Tên khóa học</th>
                  <th className="py-4 px-6 font-semibold">Giá</th>
                  <th className="py-4 px-6 font-semibold">Trạng thái</th>
                  <th className="py-4 px-6 font-semibold">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={course.id}>
                    <td className="py-4 px-6">
                      {index + 1 + currentPage * itemsPerPage}
                    </td>
                    <td className="py-4 px-6">{course.code}</td>
                    <td className="py-4 px-6">
                      <img
                        src={course.imageUrl}
                        style={{ width: 80, height: 80 }}
                        alt="Course Image 1"
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="py-4 px-6">{course.name}</td>
                    <td className="py-4 px-6">
                      {formatCurrency(course.price)}{' '}
                    </td>
                    <td className="py-4 px-6">{course.status}</td>
                    <td
                      className="py-4 px-6 flex gap-4"
                      style={{ marginTop: '15%' }}
                    >
                      <button className="text-blue-600 hover:text-blue-800 transition">
                        <Eye onClick={() => handleShow(course.id)} size={20} />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-800 transition">
                        <Pencil
                          onClick={() => handleEdit(course.id)}
                          size={20}
                        />
                      </button>
                      <button
                        onClick={() => {
                          handleRemove(course.id);
                        }}
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
    </>
  );
}
export default CourseList;