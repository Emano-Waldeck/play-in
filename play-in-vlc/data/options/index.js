/* globals dom, webext, build, toast, command */
'use strict';

build({
  description: 'Display errors from the external media player',
  storage: 'error',
  value: true,
  type: 'async'
});

{
  const e = dom.$('command');

  dom.saved = async() => {
    await webext.storage.set({
      command: e.value
    });
    toast.show('Options saved');
  };

  dom.on('load', async() => {
    const prefs = await webext.storage.get({
      command: command.guess()
    });
    e.value = prefs.command;
  });
}
