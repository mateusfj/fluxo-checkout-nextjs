import Footer from "@/components/layout/footer/footer";
import { Header } from "@/components/layout/header/header";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6 flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default PrivateLayout;
