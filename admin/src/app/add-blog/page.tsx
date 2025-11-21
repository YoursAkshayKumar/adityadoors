import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import AddBlog from "../components/blog/add-blog";

const AddBlogPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Blogs" subtitle="Add Blog" />
        <div className="grid grid-cols-12">
          <div className="col-span-12 2xl:col-span-10">
            <AddBlog />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddBlogPage;