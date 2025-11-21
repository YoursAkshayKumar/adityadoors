import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import EditBlog from "../../components/blog/edit-blog";

const BlogEditPage = ({ params }: { params: { id: string } }) => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Blogs" subtitle="Edit Blog" />
        <div className="grid grid-cols-12">
          <div className="col-span-12 2xl:col-span-10">
            <EditBlog id={params.id} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default BlogEditPage;