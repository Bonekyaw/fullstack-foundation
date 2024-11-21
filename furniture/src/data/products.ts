import p1 from "@/data/images/p-1.webp";
import p2 from "@/data/images/p-2.webp";
import p3 from "@/data/images/p-3.webp";
import p4 from "@/data/images/p-4.webp";
import p5 from "@/data/images/p-5.webp";
import p6 from "@/data/images/p-6.webp";
import p7 from "@/data/images/p-7.webp";
import p8 from "@/data/images/p-8.webp";

export const filterList = {
  types: [
    { id: "uuid1", label: "seating" },
    { id: "uuid2", label: "lying" },
    { id: "uuid3", label: "entertainment" },
    { id: "uuid4", label: "tables" },
    { id: "uuid5", label: "storage" },
  ],
  categories: [
    { id: "uuid1", label: "Wooden" },
    { id: "uuid2", label: "Bamboo" },
    { id: "uuid3", label: "Metal" },
  ],
};

export const products = [
  {
    id: "uuid1",
    name: "Nordic Chair",
    description:
      "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quam ut purus rutrum lobortis",
    images: [p1, p4, p7],
    categoryId: "uuid1",
    price: 230,
    discount: 0,
    rating: 4,
    inventory: 180,
    status: "active",
  },
  {
    id: "uuid2",
    name: "Kruzo Aero Chair",
    description:
      "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quam ut purus rutrum lobortis",
    images: [p2, p5, p8],
    categoryId: "uuid2",
    price: 180.85,
    discount: 200,
    rating: 3.5,
    inventory: 900,
    status: "active",
  },
  {
    id: "uuid3",
    name: "Ergonomic Chair",
    description:
      "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quam ut purus rutrum lobortis",
    images: [p3, p1, p6],
    categoryId: "uuid1",
    price: 90,
    discount: 110,
    rating: 4,
    inventory: 90,
    status: "active",
  },
  {
    id: "uuid4",
    name: "Nordic Chair",
    description:
      "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quam ut purus rutrum lobortis",
    images: [p4, p2, p7],
    categoryId: "uuid3",
    price: 1500,
    discount: 0,
    rating: 4,
    inventory: 100,
    status: "sold",
  },
  {
    id: "uuid5",
    name: "Kruzo Aero Chair",
    description:
      "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quam ut purus rutrum lobortis",
    images: [p5, p3, p8],
    categoryId: "uuid1",
    price: 230,
    discount: 0,
    rating: 4,
    inventory: 180,
    status: "active",
  },
  {
    id: "uuid6",
    name: "Ergonomic Chair",
    description:
      "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quam ut purus rutrum lobortis",
    images: [p6, p2, p4],
    categoryId: "uuid1",
    price: 140,
    discount: 150,
    rating: 3,
    inventory: 200,
    status: "sold",
  },
  {
    id: "uuid7",
    name: "Nordic Chair",
    description:
      "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quam ut purus rutrum lobortis",
    images: [p7, p1, p3],
    categoryId: "uuid3",
    price: 210,
    discount: 0,
    rating: 4,
    inventory: 100,
    status: "active",
  },
  {
    id: "uuid8",
    name: "Ergonomic Chair",
    description:
      "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quam ut purus rutrum lobortis",
    images: [p8, p4, p2],
    categoryId: "uuid2",
    price: 140,
    discount: 150,
    rating: 3,
    inventory: 200,
    status: "active",
  },
  {
    id: "uuid9",
    name: "Kruzo Aero Chair",
    description:
      "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quam ut purus rutrum lobortis",
    images: [p5, p3, p8],
    categoryId: "uuid1",
    price: 250,
    discount: 260,
    rating: 4,
    inventory: 200,
    status: "active",
  },
];
