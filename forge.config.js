module.exports = {
  packagerConfig: {
    icon: 'C:/progetti/remote_controller/rc_desktop/assets/favicon.ico'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: 'file://C:/progetti/remote_controller/rc_desktop/assets/favicon.ico',
        setupIcon: './assets/favicon.ico',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
