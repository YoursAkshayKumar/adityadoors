import Wrapper from "@/layout/wrapper";
import CardItems from "../components/dashboard/card-items";
import RecentLeads from "../components/dashboard/recent-leads";

export default function DashboardPage() {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <div className="flex justify-between items-end flex-wrap">
          <div className="page-title mb-7">
            <h3 className="mb-0 text-4xl">Dashboard</h3>
            <p className="text-textBody m-0">Welcome to your dashboard</p>
          </div>
        </div>

        {/* card item start  */}
        <CardItems />
        {/* card item end  */}

        {/* recent leads start */}
        <RecentLeads />
        {/* recent leads end */}
      </div>
    </Wrapper>
  );
}
