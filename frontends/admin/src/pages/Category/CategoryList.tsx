import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Pencil, Trash2 } from 'lucide-react';
import '../../assets/index.css';
import { addCategory, deleteCategory, getCategoryById, listCategories, updateCategory } from '../../service/CategoryService.ts';
import { confirmDelete, showAlert } from '../../utils/swalUtils.ts';
import {Category} from '../../types/Category.ts'

const CategoryList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalCategories, setTotalCategories] = useState(0);
  const [category, setCategory] = useState({ id:null,code: '', name: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState({ code: '', name: '' });
  const [disabled, setDisabled] = useState(true);


  useEffect(() => {
    void setItemsPerPage;
    void disabled;
    getAll();
  }, [currentPage, itemsPerPage]);

  function getAll() {
    listCategories(currentPage, itemsPerPage).then((response: any) => {
      setCategories(response.content);
      setTotalCategories(response.totalElements);
    }).catch((error: any) => console.error(error));
  }

  const totalPages = Math.ceil(totalCategories / itemsPerPage);

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
  const handleEdit = (id:number) => {
    getCategoryById(id).then((response: any) => {
      setCategory(response.data);
      setIsEditing(true);
      setModalOpen(true);
    });
  };

  const handleSave = () => {
    if (isValidate()) {
      if (isEditing) {
        updateCategory(Number(category.id), category).then(() => {
          setModalOpen(false);
          setDisabled(true)
          getAll();
          showAlert('Cập nhật thành công!', 'Danh mục đã được cập nhật.', 'success');
          setCategory({id:null, code: '', name: '' });
        }).catch((error: any) => console.error(error));
      } else {
        addCategory(category).then(() => {
          setModalOpen(false);
          getAll();
          showAlert('Thêm thành công!', 'Thêm danh mục thành công.', 'success');
          setCategory({id:null, code: '', name: '' });
        }).catch((error: any) => console.error(error));
      }
    }
  };

  const handleRemove = (id:number) => {
    confirmDelete('Bạn chắc chắn muốn xóa danh mục này?', 'Hành động này không thể hoàn tác!', () => {
      deleteCategory(id).then(() => {
        getAll();
      }).catch((error: any) => console.error(error));
    });
  };

  function isValidate() {
    let valid = true;
    const errorCopy = { ...error };
    if (category.name.trim()) {
      errorCopy.name = '';
    } else {
      errorCopy.name = 'Tên không được để trống';
      valid = false;
    }
    setError(errorCopy);
    return valid;
  }
  return (
    <>
      <Breadcrumb pageName="Danh mục khóa học" />
      <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700" style={{ width: 150, marginBottom: 10 }} onClick={() => {setIsEditing(false); setModalOpen(true); }}>Thêm danh mục</button>
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-4 px-6 font-semibold">STT</th>
                <td className="py-4 px-6 font-semibold">Mã danh mục</td>
                <th className="py-4 px-6 font-semibold">Tên danh mục</th>
                <th className="py-4 px-6 font-semibold">Thao tác</th>
              </tr>
              </thead>
              <tbody>
              {categories.map((category, index) => (
                <tr key={category.id}>
                  <td className="py-4 px-6">{index + 1 + currentPage * itemsPerPage}</td>
                  <td className="py-4 px-6">{category.code}</td>
                  <td className="py-4 px-6">{category.name}</td>
                  <td className="py-4 px-4 flex gap-4">
                    <button className="text-yellow-600 hover:text-yellow-800 transition">
                      <Pencil onClick={() => handleEdit(Number(category.id))} size={20} />
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition">
                      <Trash2 onClick={() => handleRemove(Number(category.id))} size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>

            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end">
                <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={handlePrevPage} disabled={currentPage === 0}>Previous</button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li className={`page-item ${currentPage === index ? 'active' : ''}`} key={index}>
                    <button className="page-link" onClick={() => handlePageChange(index)}>{index + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalPages - 1}>Next</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[500px] relative">
            <h3 className="text-xl font-semibold mb-4">{isEditing ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}</h3>
            <div className="mb-4" hidden={!isEditing}>
              <label className="block text-gray-700 font-medium">Mã danh mục</label>
              <input type="text" name="code" value={category.code} onChange={(e) => {
                if (!isEditing) {
                  setCategory({ ...category, code: e.target.value });
                }
              }} className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" disabled={isEditing} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Tên danh mục</label>
              <input type="text" name="name" value={category.name} onChange={(e) => setCategory({ ...category, name: e.target.value })}                   className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              {error.name && <div className='invalid-feedback'>{error.name}</div>}
            </div>
            <div className="flex gap-4">
              <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700" onClick={handleSave}>Lưu</button>
              <button className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600" onClick={() => { setCategory({id:null, code: '', name: '' }); setModalOpen(false); }}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryList;
