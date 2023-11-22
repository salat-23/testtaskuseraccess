module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/useraccess',
     handler: 'useraccess.checkAccess',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
