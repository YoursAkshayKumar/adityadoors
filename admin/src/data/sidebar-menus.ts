import { ISidebarMenus } from "./../types/menu-types";
import {
  Dashboard,
  Categories,
  Pages,
  Products,
  Profile,
  Reviews,
  Setting,
  Leaf,
  StuffUser,
} from "@/svg";

const sidebar_menu: Array<ISidebarMenus> = [
  {
    id: 1,
    icon: Dashboard,
    link: "/dashboard",
    title: "Dashboard",
  },
  {
    id: 2,
    icon: Products,
    link: "/product-list",
    title: "Products",
    subMenus: [
      { title: "Product List", link: "/product-list" },
      // { title: "Product Grid", link: "/product-grid" },
      { title: "Add Product", link: "/add-product" }
    ],
  },
  {
    id: 3,
    icon: Categories,
    link: "/category",
    title: "Category",
  },
  {
    id: 4,
    icon: Leaf,
    link: "/blogs",
    title: "Blogs",
    subMenus: [
      { title: "Blogs List", link: "/blogs-list" },
      // { title: "Product Grid", link: "/product-grid" },
      { title: "Add Blog", link: "/add-blog" }
    ]
  },
  {
    id: 5,
    icon: Reviews,
    link: "/testimonials-list",
    title: "Testimonials",
    subMenus: [
      { title: "Testimonials List", link: "/testimonials-list" },
      { title: "Add Testimonial", link: "/add-testimonial" }
    ]
  },
  {
    id: 6,
    icon: Pages,
    link: "/portfolios-list",
    title: "Portfolio",
    subMenus: [
      { title: "Portfolios List", link: "/portfolios-list" },
      { title: "Add Portfolio", link: "/add-portfolio" }
    ]
  },
  {
    id: 7,
    icon: Reviews,
    link: "/inquiries-list",
    title: "Inquiries",
    subMenus: [
      { title: "Inquiries List", link: "/inquiries-list" },
      { title: "Measurement Inquiries", link: "/measurements-list" },
      { title: "Contact Inquiries", link: "/contacts-list" }
    ],
  },
  {
    id: 8,
    icon: Pages,
    link: "/faqs-list",
    title: "FAQs",
    subMenus: [
      { title: "FAQs List", link: "/faqs-list" },
      { title: "Add FAQ", link: "/add-faq" }
    ]
  },
  {
    id: 9,
    icon: Profile,
    link: "/profile",
    title: "Profile",
  },
  {
    id: 10,
    icon: Setting,
    link: "#",
    title: "Online store",
  },
  {
    id: 11,
    icon: Pages,
    link: "/dashboard",
    title: "Pages",
    subMenus: [
      { title: "About Us", link: "/about-us" },
      // { title: "Login", link: "/login" },
      // { title: "Forgot Password", link: "/forgot-password" }
    ],
  },
];

export default sidebar_menu;
