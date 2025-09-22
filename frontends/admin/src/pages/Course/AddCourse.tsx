import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import React, { useEffect, useState } from 'react';
import { listCategories } from '../../service/CategoryService.ts';
import { Category } from '../../types/Category.ts';
import { createCourse } from '../../service/CourseService.ts';
import { showLoadingThenExecute } from '../../utils/swalUtils.ts';
import { getUser } from '../../route/route.ts';

const AddCourse = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [status, setStatus] = useState('Chờ duyệt');
  const [categoryId, setCategoryId] = useState('');
  const [aim, setAim] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState({
    code: '',
    name: '',
    description: '',
    price: '',
    discount: '',
    status: '',
    categoryId: '',
    aim: ''
  });
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    listCategories(0, 0).then((response: any) => {
      setCategories(response.content);
    });
    getUser().then((res) => {
      const arrRole: string[] = res.data.roles.map((role: { name: string }) => role.name);
      console.log('roles', arrRole);
      if (arrRole.includes('TEACHER')) {
        setHidden(true);
      }
    });
  }, [0, 0]);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid()) {
      return;
    }

    if (!file) {
      alert('Vui lòng chọn file hình ảnh.');
      return;
    }

    showLoadingThenExecute(async () => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('code', code);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('discount', discount || '0');
      formData.append('status', status);
      formData.append('categoryId', categoryId);
      formData.append('aim', aim);

      await createCourse(formData);
    }, 'Thêm khóa học thành công!', 'Có lỗi xảy ra, vui lòng thử lại.', '/course');
  };


  function isValid() {
    let valid = true;
    const errorCopy = { ...error };
    if (name.trim()) {
      errorCopy.name = '';
    } else {
      errorCopy.name = 'Tên khóa học không được để trống';
      valid = false;
    }
    if (description.trim()) {
      errorCopy.description = '';
    } else {
      errorCopy.description = 'Mô tả không được để trống';
      valid = false;
    }
    if (price.trim()) {
      errorCopy.price = '';
    } else {
      errorCopy.price = 'Giá không được để trống';
      valid = false;
    }
    if (discount.trim()) {
      errorCopy.discount = '';
    } else {
      errorCopy.discount = 'Giảm giá không được để trống';
      valid = false;
    }
    if (status.trim()) {
      errorCopy.status = '';
    } else {
      errorCopy.status = 'Trạng thái không được để trống';
      valid = false;
    }
    if (categoryId.trim()) {
      errorCopy.categoryId = '';
    } else {
      errorCopy.categoryId = 'Danh mục không được để trống';
      valid = false;
    }
    if (aim.trim()) {
      errorCopy.aim = '';
    } else {
      errorCopy.aim = 'Mức điểm không được để trống';
      valid = false;
    }
    setError(errorCopy);
    return valid;
  }


  return (
    <>
      <Breadcrumb pageName="Thêm khóa học" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5 flex gap-4">
                <input
                  hidden
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <div className="w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tên khóa học <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập tên khóa học"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {error.name && (
                    <div className="invalid-feedback">{error.name}</div>
                  )}
                </div>
                <div className="w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Mục tiêu điểm <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={aim}
                    onChange={(e) => setAim(e.target.value)}
                    placeholder="Nhập tên khóa học"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {error.aim && (
                    <div className="invalid-feedback">{error.aim}</div>
                  )}
                </div>
              </div>

              <div className="mb-4.5 flex gap-4">
                <div className="w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Giá <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Nhập giá khóa học"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {error.price && (
                    <div className="invalid-feedback">{error.price}</div>
                  )}
                </div>
                <div className="w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Giảm giá
                  </label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="Nhập giá khóa học"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {error.discount && (
                    <div className="invalid-feedback">{error.discount}</div>
                  )}
                </div>
              </div>
              <div className="mb-4.5 flex gap-4">
                <div className="w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Trạng thái <span className="text-meta-1">*</span>
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    {/*{hidden && (*/}
                      <option selected disabled value="Chờ duyệt">
                        Chờ duyệt
                      </option>
                    {/*)}*/}
                    {!hidden && (
                      <div>
                        <option value="">
                          Chọn trạng thái
                        </option>
                        <option value="Đã Duyệt">Đã duyệt</option>
                      </div>
                    )}
                  </select>
                  {error.status && (
                    <div className="invalid-feedback">{error.status}</div>
                  )}
                </div>
                <div className="w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Danh mục <span className="text-meta-1">*</span>
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="" disabled selected>
                      Chọn danh mục
                    </option>
                    {categories.map((categories) => (
                      <option key={categories.id} value={Number(categories.id)}>
                        {categories.name}
                      </option>
                    ))}
                  </select>
                  {error.categoryId && (
                    <div className="invalid-feedback">{error.categoryId}</div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Mô tả
                </label>
                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Nhập mô tả khóa học"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
                {error.description && (
                  <div className="invalid-feedback">{error.description}</div>
                )}
              </div>

              <div className="mb-6">
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

              <button
                onClick={handleCreateCourse}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Thêm Khóa Học
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddCourse;
