"use client";

import { useState } from "react";
import Link from "next/link";
import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import FAQTable from "../components/faq/faq-table";

const FAQsListPage = () => {
  const [search, setSearch] = useState("");

  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="FAQs" subtitle="FAQs List" />

        <div className="flex items-center justify-between mb-6">
          <div className="w-1/3">
            <label className="relative block">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 rounded-md border border-gray-200 bg-white placeholder-gray-400 focus:outline-none"
                placeholder="Search by question or answer"
              />
            </label>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/add-faq"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
            >
              Add FAQ
            </Link>
          </div>
        </div>

        <FAQTable searchTerm={search} />
      </div>
    </Wrapper>
  );
};

export default FAQsListPage;

