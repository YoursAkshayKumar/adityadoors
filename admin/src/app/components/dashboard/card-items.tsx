"use client";
import React from "react";
import { MonthSales, Received, Sales, TotalOrders } from "@/svg";
import { useGetAllInquiriesQuery } from "@/redux/inquiry/inquiryApi";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isBetween from "dayjs/plugin/isBetween";
import ErrorMsg from "../common/error-msg";
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isBetween);

type IPropType = {
  title: string;
  amount: number | string;
  icon: React.ReactNode;
  clr: string;
  clr2: string;
};

function CardItem({ title, amount,icon, clr2 }: IPropType) {
  return (
    <div className="widget-item bg-white p-6 flex justify-between rounded-md">
      <div>
        <h4 className="text-xl font-semibold text-slate-700 mb-1 leading-none">
          {amount}
        </h4>
        <p className="text-tiny leading-4">{title}</p>
      </div>
      <div>
        <span
          className={`text-lg text-white rounded-full flex items-center justify-center h-12 w-12 shrink-0 ${clr2}`}
        >
          {icon}
        </span>
      </div>
    </div>
  );
}

const CardItems = () => {
  const {
    data: inquiries,
    isError,
    isLoading,
  } = useGetAllInquiriesQuery();

  const list = inquiries?.result || [];

  const todayLeads = list.filter((lead) => dayjs(lead.createdAt).isToday()).length;
  const yesterdayLeads = list.filter((lead) =>
    dayjs(lead.createdAt).isYesterday()
  ).length;
  const thisMonthLeads = list.filter((lead) =>
    dayjs(lead.createdAt).isBetween(dayjs().startOf("month"), dayjs().endOf("month"), null, "[]")
  ).length;
  const totalLeads = list.length;

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }

  if (!isLoading && !isError) {
    content = (
      <>
        <CardItem
          title="Today Leads"
          amount={todayLeads}
          icon={<Received />}
          clr=""
          clr2="bg-success"
        />
        <CardItem
          title="Yesterday Leads"
          amount={yesterdayLeads}
          icon={<Sales />}
          clr="text-purple bg-purple/10"
          clr2="bg-purple"
        />
        <CardItem
          title="Monthly Leads"
          amount={thisMonthLeads}
          icon={<MonthSales />}
          clr="text-info bg-info/10"
          clr2="bg-info"
        />
        <CardItem
          title="Total Leads"
          amount={totalLeads}
          icon={<TotalOrders />}
          clr="text-warning bg-warning/10"
          clr2="bg-warning"
        />
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
      {content}
    </div>
  );
};

export default CardItems;
