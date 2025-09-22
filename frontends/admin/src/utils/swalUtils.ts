import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const confirmDelete = async (
  title: string,
  text: string,
  confirmCallback: () => void
): Promise<void> => {
  try {
    const result = await MySwal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e3342f',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Xóa ngay',
      cancelButtonText: 'Hủy',
      customClass: {
        popup: 'rounded-xl shadow-xl',
        title: 'text-xl font-semibold',
        confirmButton: 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700',
        cancelButton: 'bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600',
      }
    });

    if (result.isConfirmed) {
      confirmCallback();
      await MySwal.fire({
        title: 'Xóa thành công!',
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'rounded-xl shadow-xl',
          title: 'text-xl font-semibold',
          confirmButton: 'bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700',
          cancelButton: 'bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600',
        },
        willClose: () => {
          const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
          if (confirmButton) confirmButton.style.display = 'inline-block';
        }
      });
    }
  } catch (error) {
    console.error(error);
    await MySwal.fire('Lỗi!', 'Xóa không thành công. Vui lòng thử lại.', 'error');
  }
};

export const showAlert = (
  title: string,
  text: string,
  icon: 'success' | 'error' | 'warning' | 'info' | 'question',
  timer: number = 3000
): void => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    timer: timer,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    customClass: {
      popup: 'rounded-lg shadow-lg',
    }
  });
};
export const showLoadingThenExecute = async (
  action: () => Promise<any>,
  successMessage: string = "Thành công!",
  errorMessage: string = "Có lỗi xảy ra, vui lòng thử lại.",
  redirectUrl?: string,
  delay: number = 3000
) => {
  try {
    MySwal.fire({
      title: "Đang xử lý...",
      text: "Vui lòng chờ giây lát!",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    await new Promise((resolve) => setTimeout(resolve, delay));
    await action();
    await MySwal.fire({
      icon: "success",
      title: successMessage,
      showConfirmButton: false,
      timer: 1000,
    });

    if (redirectUrl) {
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1000);
    }
  } catch (error) {
    console.error(error);
    await MySwal.fire("Lỗi!", errorMessage, "error");
  }
};
