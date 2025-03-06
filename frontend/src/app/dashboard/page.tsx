import Sidebar from "../components/ui/sidebar";

const DashboardPage = () => {
  return (
    <div className="flex w-full">
      <aside>
        <Sidebar />
      </aside>
      <main className="flex-1 p-4">Dashboard content page</main>
    </div>
  );
};

export default DashboardPage;
