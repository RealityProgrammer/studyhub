import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { findCouseById, updateCourseById } from '../../service/CourseService.ts';
import {
  addCourseDetails,
  deleteCourseDetail,
  findById,
  getCourseDetails,
  updateCourseDetails
} from '../../service/CourseDetailService.ts';
import { useEffect, useState } from 'react';
import { Course } from '../../types/Course.ts';
import { CourseDetails } from '../../types/CourseDetails.ts';
import { Pencil, Trash2 } from 'lucide-react';
import { confirmDelete, showAlert, showLoadingThenExecute } from '../../utils/swalUtils.ts';
import { listCategories } from '../../service/CategoryService.ts';
import { Category } from '../../types/Category.ts';
import { formatDateToInput, formatInputToISO } from '../../utils/dateUtils.ts';
import userThree from '../../images/user/user-03.png';

const ShowCourse = ({ isEditMode = false }: { isEditMode?: boolean }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<Course>({
    id: 0,
    code: '',
    name: '',
    description: '',
    price: 0,
    discount: 0,
    status: '',
    categoryId: 0,
    aim: '',
    imageUrl: '',
    createdDate: ''
  });
  const [file, setFile] = useState<File | null>(null);

  const [lesson, setLesson] = useState<CourseDetails>();
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [courseDetails, setCourseDetails] = useState<CourseDetails[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalCourseDetails, setTotalExamDetails] = useState(0);
  const totalPages = Math.ceil(totalCourseDetails / itemsPerPage);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const storedRoles = localStorage.getItem('role');
    const roles: string[] = storedRoles ? JSON.parse(storedRoles) : [];
    if (roles.includes('ADMIN')) {
      setHidden(true);
    }
  }, []);


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
  useEffect(() => {
    findCouseById(Number(id))
      .then((response: any) => {
        setData(response.data);
        console.log('data', response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, [id]);

  useEffect(() => {
    void setItemsPerPage;
    listCategories(0, 0).then((response: any) => {
      setCategories(response.content);
    });
    getDetails();
  }, [currentPage, itemsPerPage]);

  function getDetails() {
    getCourseDetails(Number(id), currentPage, itemsPerPage)
      .then((reponse: any) => {
        setCourseDetails(reponse.content);
        setTotalExamDetails(reponse.totalElements);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  const handleEdit = (id: number) => {
    findById(id).then((response: any) => {
      setLesson(response.data);
      setOpenModal(true);
      setIsEditing(true);
    });
  };
  const handleUpdateCourse = (id: number) => {
    showLoadingThenExecute(async () => {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      }
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', data.price.toString());
      formData.append('discount', data.discount.toString());
      formData.append('status', data.status);
      formData.append('categoryId', data.categoryId.toString());
      formData.append('aim', data.aim);

      await updateCourseById(id, formData);
    }, 'Cập nhật thành công!', 'Có lỗi xảy ra, vui lòng thử lại.', '/course');
  };


  const handleRemove = (id: number) => {
    confirmDelete(
      'Bạn chắc chắn xóa bài học này ?',
      'Hành động này không thể hoàn tác !',
      () => {
        deleteCourseDetail(id)
          .then(() => {
            setCourseDetails((prev) => prev.filter((item) => item.id !== id));
          })
          .catch((error: any) => console.error(error));
      }
    );
  };

  const handleUpdateContent = () => {
    if (!lesson) {
      return;
    }
    if (isEditing) {
      updateCourseDetails(Number(lesson?.id), lesson)
        .then(() => {
          setOpenModal(false);
          showAlert(
            'Cập nhật thành công!',
            'Nội dung đã được cập nhật.',
            'success'
          );
          setCourseDetails((prev) =>
            prev.map((item) => (item.id === lesson.id ? { ...lesson } : item))
          );
        })
        .catch((error) => console.log(error));
    } else {
      const link = (url: string) => {
        return url.replace('https://www.youtube.com/watch?v=', '').split('&')[0];
      };
      const obj = { ...lesson, url: link(lesson.url), courseId: Number(data.id) };
      addCourseDetails(obj).then(() => {
        showAlert('Thành công', 'Thêm nội dung khóa học thành công!', 'success');
        setOpenModal(false);
        setLesson({
          id: 0,
          description: '',
          name: '',
          period: '',
          url: '',
          courseId: 0
        });
        getDetails();
      });
    }
  };

  const handleAdd = () => {
    setIsEditing(false);
    setOpenModal(true);
  };

  return (
    <>
      <Breadcrumb
        pageName={isEditMode ? 'Chỉnh sửa khóa học' : 'Chi tiết khóa học'}
      />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-4 flex gap-4">
            <div className="w-1/3">
              <div className="flex items-center justify-center pt-2">
                <img
                  // src={data?.imageUrl}
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : data?.imageUrl || userThree
                  }
                />
              </div>
              <div hidden={!isEditMode} className="mb-6 pt-7.5">
                <label className="mb-3 block text-black dark:text-white">
                  Ảnh khóa học
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setFile(e.target.files[0]);
                    }
                  }}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="w-2/3">
              <div className="mb-4 flex gap-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Mã khóa học
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={data?.code}
                    readOnly={!isEditMode}
                    disabled
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Tên khóa học
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={data?.name}
                    readOnly={!isEditMode}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4 flex gap-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Giá khóa học
                  </label>
                  <input
                    type="text"
                    name="number"
                    value={data?.price}
                    readOnly={!isEditMode}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        price: Number(e.target.value),
                      }))
                    }
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Giảm giá
                  </label>
                  <input
                    type="number"
                    name="name"
                    value={data?.discount}
                    readOnly={!isEditMode}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        discount: Number(e.target.value),
                      }))
                    }
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4 flex gap-4">
                {!hidden && (
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium">
                      Trạng thái
                    </label>

                    <input
                      type="text"
                      name="status"
                      disabled
                      value={data?.status}
                      readOnly={!isEditMode}
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, status: e.target.value }))
                      }
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                )}

                {hidden && (
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium">
                      Trạng thái
                    </label>

                    <select
                      name="status"
                      disabled={!isEditMode}
                      value={data?.status}
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, status: e.target.value }))
                      }
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="" disabled>
                        Chọn trạng thái
                      </option>
                      <option value="Đã duyệt">Đã duyệt</option>
                      <option value="Chờ duyệt">Chờ duyệt</option>
                      <option value="Từ chối">Từ chối</option>
                    </select>
                  </div>
                )}
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Danh mục
                  </label>
                  <div className="relative">
                    <select
                      value={data.categoryId}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          categoryId: Number(e.target.value),
                        }))
                      }
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Chọn danh mục</option>
                      {categories.map((category) => (
                        <option key={category.id} value={Number(category.id)}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {!isEditMode && (
                      <div className="absolute inset-0 cursor-not-allowed"></div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-4 flex gap-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Mục tiêu điểm
                  </label>
                  <input
                    type="text"
                    name="status"
                    value={data?.aim}
                    readOnly={!isEditMode}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, aim: e.target.value }))
                    }
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Ngày tạo
                  </label>
                  <input
                    type="datetime-local"
                    name="createdDate"
                    disabled
                    value={formatDateToInput(data?.createdDate)}
                    readOnly={!isEditMode}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        createdDate: formatInputToISO(e.target.value),
                      }))
                    }
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Mô tả</label>
                <textarea
                  rows={4}
                  value={data?.description}
                  readOnly={!isEditMode}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>
              <button
                hidden={!isEditMode}
                onClick={() => handleUpdateCourse(data.id)}
                className="w-40 h-12 bg-primary text-white py-2 rounded hover:bg-blue-700 mb-4 float-right"
              >
                Cập nhật
              </button>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold pb-3">
              Chi tiết nội dung khóa học
            </h2>
            <button
              hidden={!isEditMode}
              onClick={handleAdd}
              style={{ width: 150, height: 50 }}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-4"
            >
              Thêm nội dung
            </button>
            <div className="space-y-4">
              {courseDetails.map((lesson) => (
                <div
                  key={lesson.id}
                  className="p-4 border rounded-lg shadow hover:bg-gray-100 transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Buổi {lesson.period}: {lesson.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Mô tả:
                        {lesson.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        Video: {lesson.url}
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          handleEdit(lesson.id);
                        }}
                        hidden={!isEditMode}
                        className="text-yellow-600 hover:text-yellow-800 transition"
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        onClick={() => {
                          handleRemove(lesson.id);
                        }}
                        hidden={!isEditMode}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {hidden && (
            <div className="flex justify-end mt-6">
              <button
                className="bg-primary w-40 h-12 text-white py-2 px-6 rounded"
                onClick={() => navigate('/course')}
              >
                Quay lại
              </button>
            </div>
          )}

          {!hidden && (
            <div className="flex justify-end mt-6">
              <button
                className="bg-primary w-40 h-12 text-white py-2 px-6 rounded"
                onClick={() => navigate('/courseTeacher')}
              >
                Quay lại
              </button>
            </div>
          )}
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

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[500px] relative">
            <h3 className="text-xl font-semibold mb-4">
              {isEditing ? 'Chỉnh sửa bài học' : 'Thêm bài học'}
            </h3>
            <input value={data.id} hidden />
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Tiêu đề</label>
              <input
                type="text"
                name="name"
                value={lesson?.name}
                onChange={(e) =>
                  setLesson((prev) => ({
                    ...prev!,
                    name: e.target.value,
                  }))
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Mô tả</label>
              <input
                type="text"
                name="name"
                value={lesson?.description}
                onChange={(e) =>
                  setLesson((prev) => ({
                    ...prev!,
                    description: e.target.value,
                  }))
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Buổi
              </label>
              <input
                type="text"
                name="name"
                value={lesson?.period}
                onChange={(e) =>
                  setLesson((prev) => ({
                    ...prev!,
                    period: e.target.value,
                  }))
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Video</label>
              <input
                type="text"
                name="name"
                value={lesson?.url}
                onChange={(e) =>
                  setLesson((prev) => ({
                    ...prev!,
                    url: e.target.value,
                  }))
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  handleUpdateContent();
                }}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                {isEditing ? 'Cập nhật' : 'Thêm mới'}
              </button>
              <button
                className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                onClick={() => {
                  setLesson({
                    id: 0,
                    description: '',
                    name: '',
                    period: '',
                    url: '',
                    courseId: 0,
                  });
                  setOpenModal(false);
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

export default ShowCourse;
