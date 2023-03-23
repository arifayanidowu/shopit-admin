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
    icon: <SvgIcon component={HomeIcon} inheritViewBox opacity={0.5} />,
    label: "Home",
    href: "/admin/dashboard",
  },
];

export const generalLinks = () => {
  return [
    {
      icon: <SvgIcon component={BrandSvg} inheritViewBox opacity={0.5} />,
      label: "Brand",
      href: "/admin/brand",
    },
    {
      icon: <SvgIcon component={CategoryIcon} inheritViewBox opacity={0.5} />,
      label: "Category",
      href: "/admin/category",
    },
    {
      icon: <SvgIcon component={ProdSvg} inheritViewBox opacity={0.5} />,
      label: "Product",
      href: "/admin/product",
    },
    {
      icon: <SvgIcon component={CustomerSvg} inheritViewBox opacity={0.5} />,
      label: "Customers",
      href: "/admin/customer",
    },
    {
      icon: <SvgIcon component={InvoiceIcon} inheritViewBox opacity={0.5} />,
      label: "Invoice",
      href: "/admin/invoice",
    },
    {
      icon: <SvgIcon component={OrderIcon} inheritViewBox opacity={0.5} />,
      label: "Order",
      href: "/admin/order",
    },
    {
      icon: <SvgIcon component={PromoIcon} inheritViewBox opacity={0.5} />,
      label: "Promotion",
      href: "/admin/promotion",
    },
  ];
};

export const settingsLinks = () => {
  return [
    {
      icon: <SvgIcon component={SettingIcons} inheritViewBox opacity={0.5} />,
      label: "Settings",
      href: "/admin/settings",
    },
  ];
};
