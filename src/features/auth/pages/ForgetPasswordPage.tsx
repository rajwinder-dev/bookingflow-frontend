import { ForgetPasswordForm } from "@/features/auth/components/ForgetPasswordForm";

const ForgetPasswordPage = () => {
  return (
    <div className="flex  w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgetPasswordForm />
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
