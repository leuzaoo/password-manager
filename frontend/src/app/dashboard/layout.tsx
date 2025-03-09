import LastUpdatesSection from "@/app/components/ui/last-updates";
import Sidebar from "../components/ui/sidebar";

const DashboardPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex w-full">
      <aside>
        <Sidebar />
      </aside>
      <main className="flex-1 p-4">{children}</main>
      <section>
        <LastUpdatesSection />
      </section>
    </div>
  );
};

export default DashboardPage;
