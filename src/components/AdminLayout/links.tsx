import { SvgIcon } from "@mui/material";
import { ReactComponent as BrandSvg } from "./icons/brand-image.svg";
import { ReactComponent as ProdSvg } from "./icons/shopping-bag.svg";
import { ReactComponent as CustomerSvg } from "./icons/user-group.svg";
import { ReactComponent as CategoryIcon } from "./icons/prod-category.svg";
import { ReactComponent as HomeIcon } from "./icons/home_1.svg";
import { ReactComponent as InvoiceIcon } from "./icons/invoice.svg";
import { ReactComponent as OrderIcon } from "./icons/open-box.svg";
import { ReactComponent as PromoIcon } from "./icons/promo.svg";
import { ReactComponent as SettingIcons } from "./icons/settings_1.svg";

export const dashboardLinks = () => [
  {
    icon: <SvgIcon component={HomeIcon} inheritViewBox />,
    label: "Home",
    href: "/admin/dashboard",
  },
];

export const generalLinks = () => {
  return [
    {
      icon: <SvgIcon component={BrandSvg} inheritViewBox />,
      label: "Brand",
      href: "/admin/brand",
    },
    {
      icon: <SvgIcon component={CategoryIcon} inheritViewBox />,
      label: "Category",
      href: "/admin/category",
    },
    {
      icon: <SvgIcon component={ProdSvg} inheritViewBox />,
      label: "Product",
      href: "/admin/product",
    },
    {
      icon: <SvgIcon component={CustomerSvg} inheritViewBox />,
      label: "Customers",
      href: "/admin/customer",
    },
    {
      icon: <SvgIcon component={InvoiceIcon} inheritViewBox />,
      label: "Invoice",
      href: "/admin/invoice",
    },
    {
      icon: <SvgIcon component={OrderIcon} inheritViewBox />,
      label: "Order",
      href: "/admin/order",
    },
    {
      icon: <SvgIcon component={PromoIcon} inheritViewBox />,
      label: "Promotion",
      href: "/admin/promotion",
    },
    {
      icon: <SvgIcon component={SettingIcons} inheritViewBox />,
      label: "Settings",
      href: "/admin/settings",
    },
  ];
};
