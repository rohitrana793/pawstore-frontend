import React from "react";
import { MdConnectWithoutContact } from "react-icons/md";
import {
  useGetBlogQuery,
  useGetBreedQuery,
  useGetContactQuery,
  useGetOrderQuery,
  useGetProductQuery,
  useGetSubscriberQuery,
} from "./adminApi";
import { Typography, Card } from "@material-tailwind/react";
import {
  FaDog,
  FaBox,
  FaBlog,
  FaClipboardList,
  FaEnvelope,
} from "react-icons/fa";

export default function Information() {
  const { data: breedData } = useGetBreedQuery();
  const { data: productData } = useGetProductQuery();
  const { data: blogData } = useGetBlogQuery();
  const { data: orderData } = useGetOrderQuery();
  const { data: subscriberData } = useGetSubscriberQuery();
  const { data: contactData } = useGetContactQuery();

  const stats = [
    {
      title: "Total Breeds",
      count: breedData?.data || 0,
      icon: <FaDog className="text-3xl text-blue-600" />,
      color: "bg-blue-50",
    },
    {
      title: "Total Products",
      count: productData?.data || 0,
      icon: <FaBox className="text-3xl text-green-600" />,
      color: "bg-green-50",
    },
    {
      title: "Total Blogs",
      count: blogData?.data || 0,
      icon: <FaBlog className="text-3xl text-purple-600" />,
      color: "bg-purple-50",
    },
    {
      title: "Total Orders",
      count: orderData?.data || 0,
      icon: <FaClipboardList className="text-3xl text-orange-600" />,
      color: "bg-orange-50",
    },
    {
      title: "Subscribers",
      count: subscriberData?.data || 0,
      icon: <FaEnvelope className="text-3xl text-red-600" />,
      color: "bg-red-50",
    },
    {
      title: "Contacts",
      count: contactData?.data || 0,
      icon: <MdConnectWithoutContact className="text-3xl text-yellow-700 " />,
      color: "bg-yellow-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 p-6">
      {stats.map((item, index) => (
        <Card
          key={index}
          className={`p-5 flex flex-col items-center justify-center text-center rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ${item.color}`}
        >
          <div className="mb-3">{item.icon}</div>
          <Typography variant="h6" color="blue-gray" className="font-semibold">
            {item.title}
          </Typography>
          <Typography variant="h4" color="black" className="font-bold mt-2">
            {item.count}
          </Typography>
        </Card>
      ))}
    </div>
  );
}
