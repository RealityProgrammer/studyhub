import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import React, { useEffect, useState } from 'react';
import { getAllTeacher } from '../../service/TeacherService.ts';
import { addCertificate } from '../../service/CertificateService.ts';
import { useNavigate } from 'react-router-dom';
import { Teacher } from '../../types/Teacher.ts';
const AddCertificate = () => {
  const [teacher, setTeacher] = useState<Teacher[]>([]);
  const [certificateName, setCertificateName] = useState('');
  const [description, setDescription] = useState('');
  const [issuingOrganization, setIssuingOrganization] = useState('');
  const [certificateType, setCertificateType] = useState('');
  const [certificateNumber, setCertificateNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [error, setError] = useState({
    certificateName:'',
    description:'',
    issuingOrganization:'',
    certificateType:'',
    certificateNumber:'',
    issueDate:'',
    teacherId:''
  });

  const navigate = useNavigate();

  useEffect(() => {
    getAllTeacher(0,0).then((response: any) => {
      setTeacher(response.content);
    });
  }, []);

  const handleSave = (e: React.FormEvent) =>{
    e.preventDefault();
    if (isValid()){
      const certificate = {id:0,certificateName,description,issuingOrganization,certificateType,certificateNumber,issueDate,teacherName:'', teacherId: Number(teacherId)};
      addCertificate(certificate).then(() => {
        navigate('/certificate');
      }).catch((error: any) => {
        console.log(error);
      })
    }
  }

  function isValid() {
    let valid = true;
    const errorCopy = { ...error };
    if (certificateName.trim()) {
      errorCopy.certificateName = '';
    } else {
      errorCopy.certificateName = 'Tên chứng chỉ không được để trống';
      valid = false;
    }
    if (description.trim()) {
      errorCopy.description = '';
    } else {
      errorCopy.description = 'Mô tả không được để trống';
      valid = false;
    }
    if (issuingOrganization.trim()) {
      errorCopy.issuingOrganization = '';
    } else {
      errorCopy.issuingOrganization = 'Tổ chức cấp không được để trống';
      valid = false;
    }
    if (certificateType.trim()) {
      errorCopy.certificateType = '';
    } else {
      errorCopy.certificateType = 'Loại chứng chỉ không được để trống';
      valid = false;
    }
    if (certificateNumber.trim()) {
      errorCopy.certificateNumber = '';
    } else {
      errorCopy.certificateNumber = 'Số chứng chỉ không được để trống';
      valid = false;
    }
    if (issueDate.trim()) {
      errorCopy.issueDate = '';
    } else {
      errorCopy.issueDate = 'Ngày cấp không được để trống';
      valid = false;
    }
    if (teacherId.trim()) {
      errorCopy.teacherId = '';
    } else {
      errorCopy.teacherId = 'Giáo viên không được để trống';
      valid = false;
    }
    setError(errorCopy);
    return valid;
  }
  return (
    <>
      <Breadcrumb pageName="Thêm chứng chỉ" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Số chứng chỉ <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập số chứng chỉ"
                  value={certificateNumber}
                  onChange={(e) =>setCertificateNumber(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {error.certificateNumber && <div className='invalid-feedback'>{error.certificateNumber}</div>}
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Tên chứng chỉ <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên chứng chỉ"
                  value={certificateName}
                  onChange={(e) =>setCertificateName(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {error.certificateName && <div className='invalid-feedback'>{error.certificateName}</div>}
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Tổ chức cấp <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập tổ chức cấp chứng chỉ"
                  value={issuingOrganization}
                  onChange={(e) =>setIssuingOrganization(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {error.issuingOrganization && <div className='invalid-feedback'>{error.issuingOrganization}</div>}
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Loại chứng chỉ <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập loại chứng chỉ"
                  value={certificateType}
                  onChange={(e) =>setCertificateType(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {error.certificateType && <div className='invalid-feedback'>{error.certificateType}</div>}
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Ngày cấp <span className="text-meta-1">*</span>
                </label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) =>setIssueDate(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {error.issueDate && <div className='invalid-feedback'>{error.issueDate}</div>}
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Mô tả <span className="text-meta-1">*</span>
                </label>
                <textarea
                  rows={6}
                  placeholder="Nhập mô tả chứng chỉ"
                  value={description}
                  onChange={(e) =>setDescription(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
                {error.description && <div className='invalid-feedback'>{error.description}</div>}
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Giáo viên <span className="text-meta-1">*</span>
                </label>
                <select
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={teacherId} onChange={(e) => setTeacherId(e.target.value)}
                >
                  <option value="">Chọn giáo viên</option>
                  {teacher.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.accountDto.fullName}
                    </option>
                  ))}

                </select>
                {error.teacherId && <div className='invalid-feedback'>{error.teacherId}</div>}
              </div>

              <button onClick={handleSave} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Thêm Chứng Chỉ
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddCertificate;
