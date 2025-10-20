import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import CategoryList from './pages/Category/CategoryList.tsx';
import CourseList from './pages/Course/CourseList.tsx';
import AddCourse from './pages/Course/AddCourse.tsx';
import BillList from './pages/Bill/BillList.tsx';
import AccountList from './pages/Account/AccountList.tsx';
import CertificateList from './pages/Certificate/CertificateList.tsx';
import AddCertificate from './pages/Certificate/AddCertificate.tsx';
import ShowCourse from './pages/Course/ShowCourse.tsx';
import GradeList from './pages/Grade/GradeList.tsx';
import ExamList from './pages/Exam/ExamList.tsx';
import ExamComponent from './pages/Exam/ExamComponent.tsx';
import UpdateGrade from './pages/Grade/UpdateGrade.tsx';
import CertificateTeacher from './pages/CertificateTeacher.tsx';
import ListCourseTeacher from './pages/Course/ListCourseTeacher.tsx';
import Timetable from './pages/Timetable/Timetable.tsx';
import RoleList from './pages/Role/RoleList.tsx';
import TeacherGradeList from './pages/Grade/TeacherGradeList.tsx';
import TeacherTimetable from './pages/Timetable/TeacherTimetable.tsx';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Dashboard ADMIN" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/account"
          element={
            <>
              <PageTitle title="Account" />
              <AccountList />
            </>
          }
        />
        <Route
          path="/category"
          element={
            <>
              <PageTitle title="Category" />
              <CategoryList />
            </>
          }
        />
        <Route
          path="/role"
          element={
            <>
              <PageTitle title="Role" />
              <RoleList />
            </>
          }
        />
        <Route
          path="/course"
          element={
            <>
              <PageTitle title="Course" />
              <CourseList />
            </>
          }
        />
        <Route
          path="/addCourse"
          element={
            <>
              <PageTitle title="Add Course" />
              <AddCourse />
            </>
          }
        />
        <Route
          path="/courseTeacher"
          element={
            <>
              <PageTitle title="Course" />
              <ListCourseTeacher />
            </>
          }
        />
        <Route
          path="/gradeTeacher"
          element={
            <>
              <PageTitle title="Grade" />
              <TeacherGradeList />
            </>
          }
        />
        <Route
          path="/timetableTeacher"
          element={
            <>
              <PageTitle title="Time Table" />
              <TeacherTimetable />
            </>
          }
        />
        <Route
          path="/showDetails/:id"
          element={
            <>
              <PageTitle title="Details" />
              <ShowCourse />
            </>
          }
        />
        <Route
          path="/updateCourse/:id"
          element={
            <>
              <PageTitle title="Update Course" />
              <ShowCourse isEditMode />
            </>
          }
        />
        <Route
          path="/bill"
          element={
            <>
              <PageTitle title="Bill" />
              <BillList />
            </>
          }
        />

        <Route
          path="/certificate"
          element={
            <>
              <PageTitle title="Certificate" />
              <CertificateList />
            </>
          }
        />
        <Route
          path="/addCertificate"
          element={
            <>
              <PageTitle title="Add Certificate" />
              <AddCertificate />
            </>
          }
        />
        <Route
          path="/certificateTeacher"
          element={
            <>
              <PageTitle title="Certificate" />
              <CertificateTeacher />
            </>
          }
        />
        <Route
          path="/grade"
          element={
            <>
              <PageTitle title="Grade" />
              <GradeList />
            </>
          }
        />
        <Route
          path="/timetable"
          element={
            <>
              <PageTitle title="Time Table" />
              <Timetable />
            </>
          }
        />
        <Route
          path="/updateGrade/:id"
          element={
            <>
              <PageTitle title="Update Grade" />
              <UpdateGrade />
            </>
          }
        />
        <Route
          path="/exam"
          element={
            <>
              <PageTitle title="Exam" />
              <ExamList />
            </>
          }
        />
        <Route
          path="/showDetailExam/:id"
          element={
            <>
              <PageTitle title="Exam Details" />
              <ExamComponent />
            </>
          }
        />
        <Route
          path="/updateExam/:id"
          element={
            <>
              <PageTitle title="Update Exam" />
              <ExamComponent isEdit />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile" />
              <Profile />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
