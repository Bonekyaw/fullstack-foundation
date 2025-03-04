export interface NavItem {
  title: string;
  href?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  card?: NavItemWithChildren[];
  menu?: NavItemWithChildren[];
}

export type MainNavItem = NavItemWithChildren;

type Image = {
  id: number;
  path: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  images: Image[];
  categoryId: string;
  price: number;
  discount: number;
  rating: number;
  inventory: number;
  status: string;
};

export type Tag = {
  name: string;
};

export type Post = {
  id: number;
  author: {
    fullName: string;
  };
  title: string;
  content: string;
  image: string;
  body: string;
  updatedAt: string;
  tags: Tag[];
};

export type Category = {
  id: string;
  label: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  imageUrl: string;
};

export type Cart = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: {
    id: string;
    name: string;
    url: string;
  };
  category: string;
  subcategory: string;
};
