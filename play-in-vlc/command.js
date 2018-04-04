'use strict';

var command = {
  windows: '%ProgramFiles(x86)%\\VideoLAN\\VLC\\vlc.exe',
  mac: 'open -a VLC',
  linux: 'vlc'
};

command.tag = 'vlc';

command.guess = () => {
  if (navigator.platform.startsWith('Win')) {
    return command.windows;
  }
  if (navigator.platform.startsWith('Linux')) {
    return command.linux;
  }
  return command.mac;
};
