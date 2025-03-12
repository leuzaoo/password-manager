import LastUpdatesSection from "@/app/components/ui/last-updates";
import MobileNavbar from "../components/ui/mobile-navbar";
import Sidebar from "../components/ui/sidebar";

const DashboardPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex w-full flex-col md:flex-row">
      <aside className="hidden md:block">
        <Sidebar />
      </aside>
      <div>
        <MobileNavbar />
      </div>
      <main className="flex-3 p-4">{children}</main>
      {/*<section className="mt-32 flex-1">*/}
      {/*  <LastUpdatesSection />*/}
      {/*</section>*/}
    </div>
  );
};

export default DashboardPage;
