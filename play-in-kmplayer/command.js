'use strict';

var command = {
  windows: 'C:\\KMPlayer\\KMPlayer.exe',
  mac: 'open -a KMPlayer',
  linux: 'kmplayer'
};

command.tag = 'kmplayer';

command.guess = () => {
  if (navigator.platform.startsWith('Win')) {
    return command.windows;
  }
  if (navigator.platform.startsWith('Linux')) {
    return command.linux;
  }
  return command.mac;
};
