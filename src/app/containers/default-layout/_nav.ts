import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  // {
  //   name: 'Dashboard',
  //   url: '/dashboard',
  //   iconComponent: { name: 'cil-speedometer' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  {
    title: true,
    name: 'Customer',
  },
  {
    name: 'Group',
    url: '/customer/group',
    iconComponent: { name: 'cil-drop' },
    badge: {
      color: 'info',
      text: 'Group',
    },
  },
  {
    name: "Today's collection",
    url: '/customer/customer',
    iconComponent: { name: 'cil-pencil' },
  },
  {
    title: true,
    name: 'Cash Details',
  },
  {
    name: 'Cash Investment',
    url: '/customer/investment',
    iconComponent: { name: 'cil-drop' },
  },
];
