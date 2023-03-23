import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { DeepPartial, FieldValues, Resolver, useForm } from "react-hook-form";
import { Id, toast } from "react-toastify";

interface IProps<T extends FieldValues> {
  mutationFn: (data: T | any) => Promise<void>;
  queryKeys: string[];
  successMessage: string;
  defaultValues?: DeepPartial<T>;
  resolver?: Resolver<T, any> | undefined;
  navigate?: (path: string) => void;
  path?: string;
}

const useFormMutation = <T extends Record<string, any>>({
  mutationFn,
  queryKeys,
  successMessage,
  defaultValues,
  resolver,
  navigate,
  path,
}: IProps<T>) => {
  const queryClient = useQueryClient();
  const toastId = useRef<Id | null>(null);
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors: validationErrors },
  } = useForm<T>({
    defaultValues,
    resolver,
  });

  const { mutate, isLoading } = useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys);
      toast.update(toastId.current!, {
        render: successMessage,
        type: "success",
        autoClose: 2000,
        closeOnClick: true,
        closeButton: true,
      });
      if (navigate) {
        navigate(path!);
      }
      setTimeout(() => {
        toast.dismiss(toastId.current!);
      }, 2000);
    },
    onError: (error) => {
      let err = error as Error;
      toast.update(toastId.current!, {
        render: err.message,
        type: "error",
        autoClose: 2000,
        closeOnClick: true,
        closeButton: true,
      });
      setTimeout(() => {
        toast.dismiss(toastId.current!);
      }, 2000);
    },
  });

  return {
    mutate,
    isLoading,
    validationErrors,
    control,
    handleSubmit,
    register,
    reset,
    toastId,
    toast,
  } as const;
};

export default useFormMutation;
