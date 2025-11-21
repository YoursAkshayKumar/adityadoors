import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import BlogTable from "../components/blog/blog-table";

const BlogsPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Blogs" subtitle="Blogs List" />
        <div className="relative overflow-x-auto bg-white px-8 py-4 rounded-md">
          <BlogTable />
        </div>
      </div>
    </Wrapper>
  );
};

export default BlogsPage;