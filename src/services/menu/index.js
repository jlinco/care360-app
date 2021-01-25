export default async function getMenuData() {
  return [
    {
      category: true,
      title: 'Dashboard',
    },
    {
      title: 'Home',
      key: 'home',
      icon: 'fe fe-home',
      url: '/dashboard/overview',
      roles: ['admin', 'multinational', 'manager', 'support'],
    },
    {
      title: 'Patients',
      key: 'patients',
      icon: 'fe fe-users',
      url: '/dashboard/patients',
      roles: ['admin', 'caregiver', 'multinational', 'manager', 'support'],
    },
    // {
    // title: 'Hospitals',
    // key: 'hospitals',
    // icon: 'fe fe-target',
    // url: '/dashboard/hospitals',
    // roles: ['admin', 'medics', 'pharma'],
    // },
    // {
    //   title: 'Pharmacies',
    //   key: 'pharmacies',
    //   icon: 'fe fe-target',
    //   url: '/dashboard/pharmacies',
    //   roles: ['admin', 'medics', 'pharma']
    // },
    {
      title: 'Multi Nationals',
      key: 'multiNationals',
      icon: 'fe fe-server',
      url: '/dashboard/multinationals',
      roles: ['admin', 'multinational', 'manager'],
    },
    // {
    //   category: true,
    //   title: 'Management',
    // },
    // {
    //   title: 'Patients',
    //   key: 'm_patients',
    //   icon: 'fe fe-users',
    //   url: '/management/patients',
    //   roles: ['admin', 'caregiver', 'manager', 'support'],
    // },
    // {
    //   title: 'Multi Nationals',
    //   key: 'm_multiNationals',
    //   icon: 'fe fe-server',
    //   url: '/management/multinationals',
    //   roles: ['admin', 'multinational', 'manager', 'support'],
    // },
    // {
    //   title: 'Hospitals',
    //   key: 'm_hospitals',
    //   icon: 'fe fe-target',
    //   url: '/management/hospitals',
    //   roles: ['admin', 'caregiver', 'medics'],
    // },
    {
      category: true,
      title: 'Onboarding',
    },
    {
      title: 'Multi Nationals',
      key: 'o_multiN',
      icon: 'fe fe-server',
      url: '/onboarding/multinationals',
      roles: ['admin', 'pharma'],
    },
    {
      title: 'Patients',
      key: 'o_patients',
      icon: 'fe fe-users',
      url: '/onboarding/patients',
      roles: ['admin', 'caregiver'],
    },
    // {
    //   title: 'Hospitals',
    //   key: 'o_hospitals',
    //   icon: 'fe fe-target',
    //   url: '/onboarding/hospitals',
    //   roles: ['admin'],
    // },
    {
      title: 'Users',
      key: 'o_users',
      icon: 'fe fe-target',
      url: '/onboarding/users',
      roles: ['admin'],
    },
    // {
    //   category: true,
    //   title: 'Administration'
    // },
    // {
    //   title: 'Users',
    //   key: 'users',
    //   icon: 'fe fe-users',
    //   url: '/administration/users',
    //   roles: ['admin']
    // }
  ]
}
