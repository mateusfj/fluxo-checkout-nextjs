import { Header } from "@/components/layout/header/header";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">{children}</main>
    </div>
  );
};

export default PrivateLayout;
