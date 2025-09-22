import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Building, List, Pencil, RefreshCcw, Search, Tag, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Account } from '../../types/Account.ts';
import {
  deleteAccount,
  findAccountById,
  findByCondition,
  getAllAccount,
  updateAccount
} from '../../service/AccountService.ts';
import { confirmDelete, showLoadingThenExecute } from '../../utils/swalUtils.ts';
import { Role } from '../../types/Role.ts';
import { getAllRole } from '../../service/RoleService.ts';
import Select from "react-select";
const AccountList = () => {
  const [accounts,setAccounts] = useState<Account[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalAccount, setTotalAccount] = useState(0);
  const [openModal,setOpenModal] = useState(false);
  const [data,setData] = useState<Account>();
  const [role,setRole] = useState<Role[]>([]);

  const [file, setFile] = useState<File | null>(null);
  const [param,setParam] = useState({
    fullname : '',
    email : '',
    role : ''
  })


  useEffect(() => {
    void setItemsPerPage;
    dataSearchAndAccount()
  }, [currentPage,itemsPerPage]);

  function dataSearchAndAccount(){
    if (param.fullname || param.email || param.role){
      dataSearch()
    }else {
      getAccount();
    }
  }
  function getAccount(){
    getAllAccount(currentPage,itemsPerPage).then((response:any)=>{
      setAccounts(response.content)
      setTotalAccount(response.totalElements)
    }).catch((e) =>console.error(e));
  }
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

  useEffect(() => {
    getAllRole(0,0).then((reponse:any) =>{
      setRole(reponse.content)
    })
    if (data?.roles) {
      setSelectedRoles(data.roles.map((role) => role.id));
    }
  }, [data]);


  const totalPages = Math.ceil(totalAccount / itemsPerPage);

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
    dataSearchAndAccount()
  };
  const handleRemove = (id:number) =>{
    confirmDelete('Bạn chắc chắn xóa tài khoản này ?','Hành động này không thể hoàn tác !',() =>{
      deleteAccount(id).then(() => {})
      setAccounts((prev) => prev.filter(item => item.id !== id))
    }).catch((error: any) => console.error(error));
  }
  const handleEdit = (id:number) =>{
    findAccountById(id).then((response:any)=>{
      setData(response)
    })
    setOpenModal(true);
  }
  const handleSaveData = async (id: number) => {
    if (!data) return;
    try {
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      selectedRoles.forEach((roleId) =>
        formData.append('roleId', roleId.toString()),
      );
      if (file) {
        formData.append('file', file);
      }
      showLoadingThenExecute(
        async () => {
          await updateAccount(id, formData);
        },
        'Cập nhật thành công!',
        'Có lỗi xảy ra !',
        '/account',
      );
      setOpenModal(false);
      getAccount();
    } catch (error) {
      console.error('Lỗi khi cập nhật tài khoản:', error);
    }
  };
  const handleSearch = () =>{
    dataSearch()
  }
  function dataSearch(){
    findByCondition(currentPage,itemsPerPage,param).then((response:any)=>{
      setAccounts(response.content);
      setTotalAccount(response.totalElements)
      console.log('jsdhfjsndf',response.content);
    }).catch((e) => console.error(e));
  }
const handleReset = () =>{
    setParam({  fullname : '',
      email : '',
      role : ''})
  getAccount();
}
  return (
    <>
      <Breadcrumb pageName="Danh sách tài khoản" />
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-xl shadow-md">
        <div className="relative flex-1 min-w-[350px]">
          <Tag
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            name="name"
            value={param.fullname}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Họ và tên"
            onChange={(e) => setParam({ ...param, fullname: e.target.value })}
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
            value={param.email}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="email"
            onChange={(e) => setParam({ ...param, email: e.target.value })}
          />
        </div>

        <div className="relative flex-1 min-w-[350px]">
          <List
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <select
            value={param.role}
            onChange={(e) => setParam({ ...param, role: e.target.value })}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option>Chọn quyền</option>
            {role.map((roles) => (
              <option key={roles.id} value={roles.code}>{roles.code}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 bg-gray-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition-all text-lg font-semibold"
        >
          <RefreshCcw size={20} />
          Làm mới
        </button>

        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all text-lg font-semibold"
        >
          <Search size={20} />
          Tìm kiếm
        </button>
      </div>

      <div className="flex flex-col gap-10">
        <div className="rounded-lg border border-gray-300 bg-white shadow-lg p-6">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-4 px-6 font-semibold">STT</th>
                  <th className="py-4 px-6 font-semibold">Mã tài khoản</th>
                  <th className="py-4 px-6 font-semibold">Ảnh</th>
                  <th className="py-4 px-6 font-semibold">Họ tên</th>
                  <th className="py-4 px-6 font-semibold">Email</th>
                  <th className="py-4 px-6 font-semibold">Số điện thoại</th>
                  <th className="py-4 px-6 font-semibold">Quyền</th>
                  <th className="py-4 px-6 font-semibold">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account, index) => (
                  <tr
                    key={account.id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="py-4 px-6">
                      {index + 1 + currentPage * itemsPerPage}
                    </td>

                    <td className="py-4 px-6">{account.code}</td>
                    <td className="py-4 px-6">
                      <img
                        src={account.imageUrl}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-4 px-6">{account.fullName}</td>
                    <td className="py-4 px-6">{account.email}</td>
                    <td className="py-4 px-6">{account.phone}</td>
                    <td className="py-4 px-6">
                      {account.roles.map((role) => role.name).join(',')}
                    </td>
                    <td
                      style={{ marginTop: 15 }}
                      className="py-4 px-6 flex gap-4"
                    >
                      <button
                        onClick={() => handleEdit(account.id)}
                        className="text-yellow-600 hover:text-yellow-800 transition"
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        onClick={() => handleRemove(account.id)}
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
          <div
            className="bg-white p-6 rounded-xl shadow-xl w-[700px] max-h-[80vh] overflow-y-auto relative scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-200"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <h3 className="text-xl font-semibold mb-4">Chỉnh sửa tài khoản</h3>
            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">
                  Mã tài khoản
                </label>
                <input
                  type="text"
                  disabled
                  value={data?.code}
                  name="number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={data?.fullName}
                  onChange={(e) =>
                    setData((prev) =>
                      prev ? { ...prev, fullName: e.target.value } : prev,
                    )
                  }
                  name="name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  disabled
                  value={data?.email}
                  type="text"
                  name="number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">
                  Số điện thoại
                </label>
                <input
                  disabled
                  value={data?.phone}
                  type="text"
                  name="name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <Select
              isMulti
              options={role.map((r) => ({
                value: r.id,
                label: r.name,
              }))}
              value={role
                .filter((r) => selectedRoles.includes(r.id))
                .map((r) => ({ value: r.id, label: r.name }))}
              onChange={(selectedOptions) =>
                setSelectedRoles(selectedOptions.map((option) => option.value))
              }
            />

            <div className="mb-4">
              <label className="mb-3 block text-black dark:text-white">
                Ảnh đại diện
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

            <div className="flex gap-4">
              <button
                onClick={() => handleSaveData(Number(data?.id))}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Lưu
              </button>
              <button
                className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                onClick={() => {
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

export default AccountList;
