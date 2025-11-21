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
    icon: Profile,
    link: "/profile",
    title: "Profile",
  },
  {
    id: 6,
    icon: Setting,
    link: "#",
    title: "Online store",
  },
  {
    id: 7,
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
