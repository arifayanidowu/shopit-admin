enum Gender {
  Male,
  Female,
}

type BillingInfo = {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  cardNumber: string;
  expMonth: number;
  expYear: number;
  cvv: string;
};

export type Invoice = {
  id: string;
  orderId: string;
  order: Order;
  createdAt: Date;
  updatedAt: Date;
};

export type Admin = {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  active: boolean;
  validateToken: string | null;
};

export type Category = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
};

export type Brand = {
  id?: string;
  name: string;
  logo: string;
  createdAt?: Date;
  updatedAt?: Date;
  products?: Product[];
};

export type Customer = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  gender: Gender | null;
  dateOfBirth: Date | null;
  billingInfo: BillingInfo | null;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  avatar: string | null;
  orders: Order[];
};

export type Order = {
  id: string;
  customerId: string;
  customer: Customer;
  products: Product[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
  isCompleted: boolean;
  invoices: Invoice[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  newPrice: number | null;
  isDiscounted: boolean;
  discount: number | null;
  image: string;
  quantity: number;
  createdById: string | null;
  createBy: Admin | null;
  brandId: string | null;
  brand: Brand | null;
  categoryId: string | null;
  category: Category | null;
  gender: Gender;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  sizes: string[];
  status: "draft" | "published" | "archived";
  order: Order | null;
  orderId: string | null;
};
