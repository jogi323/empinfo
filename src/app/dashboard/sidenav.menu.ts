export const PAGES_MENU = [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'enrollment',
        data: {
          menu: {
            title: 'Entrollment',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: '',
            data: {
              menu: {
                title: 'Enroll Employee',
                icon: 'ion-gear-a',
              }
            }
          },
          {
            path: 'editemployee',
            data: {
              menu: {
                title: 'Edit Employee',
                icon: 'ion-gear-a',
              }
            }
          }
        ]
      },
      {
        path: 'timesheet',
        data: {
          menu: {
            title: 'Timesheet',
            icon: 'ion-gear-a',
            selected: false,
            expanded: false,
            order: 250,
          }
        }
      },
      {
        path: 'payroll',
        data: {
          menu: {
            title: 'Payroll',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 200,
          }
        },
      },    
    ]
  }
];
