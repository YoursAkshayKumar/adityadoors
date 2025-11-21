import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import BlogTable from "../components/blog/blog-table";

const BlogsListPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Blogs" subtitle="Blogs List" />
        <BlogTable />
      </div>
    </Wrapper>
  );
};

export default BlogsListPage;