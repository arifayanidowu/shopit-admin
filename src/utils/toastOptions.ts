interface IToastOptions {
  render?: string;
  type?: "success" | "error";
}

export const toastOptions = ({ render, type }: IToastOptions) => ({
  render,
  type,
  closeOnClick: true,
  autoClose: 2000,
  isLoading: false,
  closeButton: true,
});
