/* globals webext, Parser, command */
'use strict';

var native = new webext.runtime.Native('emano.waldeck');

var send = async urls => {
  const prefs = await webext.storage.get({
    'command': command.guess(),
    'error': true
  });
  const p = new Parser();
  const termref = {
    lineBuffer: prefs.command.replace(/\\/g, '\\\\')
  };
  p.parseLine(termref);
  const res = await native.send({
    permissions: ['crypto', 'fs', 'os', 'path', 'child_process'],
    args: [urls.join('\n'), termref.argv],
    script: `
      const path = require('path');

      const filename = path.join(
        require('os').tmpdir(),
        'oivlc-' + require('crypto').randomBytes(4).readUInt32LE(0) + '.m3u8'
      );
      require('fs').writeFile(filename, args[0], err => {
        if (err) {
          push({
            err: err.message || err
          });
          done();
        }
        else {
          let [command, ...param] = args[1];
          command = command.replace(/%([^%]+)%/g, (_, n) => env[n]);

          const vlc = require('child_process').spawn(command, [...param, filename], {
            detached: true
          });
          let stdout = '', stderr = '';
          vlc.stdout.on('data', data => stdout += data);
          vlc.stderr.on('data', data => stderr += data);
          vlc.on('close', code => {
            push({code, stdout, stderr});
            done();
          });
        }
      });
    `
  });

  if (!res) {
    if (prefs.error) {
      // open installation guide
      webext.tabs.create({
        url: '/data/guide/index.html'
      });
    }
  }
  if (res && res.code !== 0) {
    const message = res.stderr || res.error || res.err || res.stdout;
    if (message) {
      console.error(res);
      if (prefs.error) {
        webext.notifications.create({
          message
        });
      }
    }
  }
};
