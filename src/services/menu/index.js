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
      roles: ['admin', 'organization', 'manager', 'support'],
    },
    {
      title: 'Patients',
      key: 'patients',
      icon: 'fe fe-users',
      url: '/dashboard/patients',
      roles: ['admin', 'caregiver', 'organization', 'manager', 'support'],
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
      title: 'Organizations',
      key: 'organizations',
      icon: 'fe fe-server',
      url: '/dashboard/organizations',
      roles: ['admin', 'manager'],
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
    //   key: 'm_organizations',
    //   icon: 'fe fe-server',
    //   url: '/management/organizations',
    //   roles: ['admin', 'organization', 'manager', 'support'],
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
      title: 'Organizations',
      key: 'o_organization',
      icon: 'fe fe-server',
      url: '/onboarding/organizations',
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
