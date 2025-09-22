import Breadcrumb from '../components/Breadcrumbs/Breadcrumb.tsx';
import { useEffect, useState } from 'react';
import {
  addCertificate, deleteCertificateById,
  findCertificateById,
  getCertificateByEmail,
  updateCertificate
} from '../service/CertificateService.ts';
import { Certificate } from '../types/Certificate.ts';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { confirmDelete, showAlert } from '../utils/swalUtils.ts';
import { getUser } from '../route/route.ts';
import { Account } from '../types/Account.ts';

const CertificateTeacher = () => {
  const [certificate,setCertificate] = useState<Certificate[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalCertificate, setTotalCertificate] = useState(0);
  const [openModal,setOpenModal] = useState(false);
  const [modal,setModal] = useState(false)
  const [isEdit,setIsEdit] = useState(false);
  const [account,setAccount] = useState<Account>();
  const [data,setData] = useState<Certificate>({
    id: 0,
    certificateName: '',
    description: '',
    issuingOrganization: '',
    certificateType: '',
    certificateNumber: '',
    issueDate: '',
    teacherId: 0,
    teacherName: '',
  });
  const totalPages = Math.ceil(totalCertificate / itemsPerPage);
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
    void setItemsPerPage;
    getCertificate()
    getUser().then((response) =>{
      setAccount(response.data)
    })
  }, [currentPage,itemsPerPage])
  function getCertificate(){
    getCertificateByEmail(currentPage,itemsPerPage).then((response:any) =>{
      setCertificate(response.content);
      setTotalCertificate(response.totalElements)
    }).catch((error) =>{
      console.error(error);
    })
  }
  const handleShow = (id:number) =>{
    findCertificateById(id).then((response:any) =>{
      setData(response.data)
      setOpenModal(true);
    })
  }
  const handleEdit = (id:number) =>{
    findCertificateById(id).then((response:any) =>{
      setData(response.data)
      console.log(response.data)
      setIsEdit(true);
      setModal(true)
    })
  }
  const handleSave = () =>{
    if (!account){
      return;
    }

    if (isEdit){
      updateCertificate(Number(data.id), {
        ...data,
        id: Number(data.id),
        teacherId: Number(data.teacherId),
      })
        .then(() => {
          setModal(false);
          getCertificate();
          showAlert(
            'Cập nhật thành công!',
            'Chứng chỉ đã được cập nhật.',
            'success',
          );
        })
        .catch((error: any) => console.error(error));
    }else {
      const obj = {...data,teacherId:Number(account.teacherId)};
      console.log('obj',obj)
      addCertificate(obj).then(() =>{
        setModal(false);
        getCertificate();
        showAlert('Thêm thành công!', 'Thêm chứng chỉ thành công.', 'success');
        setData({
          id: 0,
          certificateName: '',
          description: '',
          issuingOrganization: '',
          certificateType: '',
          certificateNumber: '',
          issueDate: '',
          teacherId: 0,
          teacherName: '',
        })
      })
    }
  }
  const handleRemove = (id:number) =>{
    confirmDelete(
      'Bạn chắc chắn muốn xóa chứng chỉ này?',
      'Hành động này không thể hoàn tác!',
      () => {
        deleteCertificateById(id)
          .then(() => {
            getCertificate();
          })
          .catch((error: any) => console.error(error));
      },
    );
  }
  return (
    <>
      <Breadcrumb pageName="Chứng chỉ cá nhân" />
      <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              style={{ width: 150, marginBottom: 10 }} onClick={() => {
        setIsEdit(false);
        setModal(true);
      }}>Thêm chứng chỉ
      </button>
      <div className="flex flex-col gap-10">
        <div className="rounded-lg border border-gray-300 bg-white shadow-lg p-6">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-4 px-6 font-semibold">STT</th>
                <th className="py-4 px-6 font-semibold">Số chứng chỉ</th>
                <th className="py-4 px-6 font-semibold">Tên chứng chỉ</th>
                <th className="py-4 px-6 font-semibold">Loại chứng chỉ</th>
                <th className="py-4 px-6 font-semibold">Ngày cấp</th>
                <th className="py-4 px-6 font-semibold">Thao tác</th>
              </tr>
              </thead>
              <tbody>
              {certificate.map((certificate, index) => (
                <tr
                  key={certificate.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-4 px-6">
                    {index + 1 + currentPage * itemsPerPage}
                  </td>
                  <td className="py-4 px-6">
                    {certificate.certificateNumber}
                  </td>
                  <td className="py-4 px-6">{certificate.certificateName}</td>
                  <td className="py-4 px-6">{certificate.certificateType}</td>
                  <td className="py-4 px-6">{certificate.issueDate}</td>
                  <td className="py-4 px-6 flex gap-4">
                    <button
                      onClick={() => handleShow(certificate.id)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => handleEdit(certificate.id)}
                      className="text-yellow-600 hover:text-yellow-800 transition"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => handleRemove(certificate.id)}
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
        <div
          style={{ marginTop: 70 }}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        >
          <div
            className="bg-white p-6 rounded-xl shadow-xl w-[700px] max-h-[90vh] overflow-y-auto relative scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-200"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <h3 className="text-xl font-semibold mb-4">Chi tiết chứng chỉ</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Tên chứng chỉ
              </label>
              <input
                type="text"
                name="name"
                value={data.certificateName}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">
                  Số chứng chỉ
                </label>
                <input
                  type="text"
                  name="number"
                  value={data.certificateNumber}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">
                  Loại chứng chỉ
                </label>
                <input
                  type="text"
                  name="name"
                  value={data.certificateType}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Tổ chức cấp
              </label>
              <input
                type="text"
                name="organization"
                value={data.issuingOrganization}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">
                  Ngày cấp
                </label>
                <input
                  type="date"
                  name="issuedDate"
                  value={data.issueDate}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">
                  Giảng viên
                </label>
                <input
                  type="text"
                  name="issuedDate"
                  value={data.teacherName}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Mô tả</label>
              <textarea
                rows={2}
                value={data.description}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>
            <div className="flex gap-4">
              <button
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                onClick={() => setOpenModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
      {modal && (
        <div
          style={{ marginTop: 70 }}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        >
          <div
            className="bg-white p-6 rounded-xl shadow-xl w-[700px] max-h-[90vh] overflow-y-auto relative scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-200"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <input value={data.teacherId} hidden/>
            <h3 className="text-xl font-semibold mb-4">
              {isEdit ? 'Chỉnh sửa chứng chỉ' : 'Thêm chứng chỉ'}
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Tên chứng chỉ
              </label>
              <input
                type="text"
                name="name"
                value={data.certificateName}
                onChange={(e) =>
                  setData({ ...data, certificateName: e.target.value })
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">
                  Số chứng chỉ
                </label>
                <input
                  type="text"
                  name="number"
                  value={data.certificateNumber}
                  onChange={(e) =>
                    setData({ ...data, certificateNumber: e.target.value })
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">
                  Loại chứng chỉ
                </label>
                <input
                  type="text"
                  name="name"
                  value={data.certificateType}
                  onChange={(e) =>
                    setData({ ...data, certificateType: e.target.value })
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">
                  Tổ chức cấp
                </label>
                <input
                  type="text"
                  name="organization"
                  value={data.issuingOrganization}
                  onChange={(e) =>
                    setData({ ...data, issuingOrganization: e.target.value })
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">
                  Ngày cấp
                </label>
                <input
                  type="date"
                  name="issuedDate"
                  value={data.issueDate}
                  onChange={(e) =>
                    setData({ ...data, issueDate: e.target.value })
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Mô tả</label>
              <textarea
                rows={2}
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>
            <div className="flex gap-4">
              <button
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                onClick={handleSave}
              >
                Lưu
              </button>
              <button
                className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                onClick={() => {
                  setModal(false),
                  setData({
                    id: 0,
                    certificateName: '',
                    description: '',
                    issuingOrganization: '',
                    certificateType: '',
                    certificateNumber: '',
                    issueDate: '',
                    teacherId: 0,
                    teacherName: '',
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
}
export default CertificateTeacher;