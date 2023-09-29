const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-100 border p-10 rounded-md shadow-sm shadow-black">
      {children}
    </div>
  );
};

export default AuthLayout;
