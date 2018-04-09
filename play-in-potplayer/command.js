'use strict';

var command = {
  windows: '%ProgramFiles(x86)%\\DAUM\\PotPlayer\\PotPlayerMini.exe',
  mac: 'open -a PotPlayer',
  linux: 'potplayer'
};

command.guess = () => {
  if (navigator.platform.startsWith('Win')) {
    return command.windows;
  }
  if (navigator.platform.startsWith('Linux')) {
    return command.linux;
  }
  return command.mac;
};
