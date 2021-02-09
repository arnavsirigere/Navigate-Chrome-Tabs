chrome.commands.onCommand.addListener(command => {
  chrome.windows.getAll(windows => {
    const focusedWindow = windows.find(window => window.focused);
    if (!focusedWindow) return;
    chrome.tabs.query({ windowId: focusedWindow.id }, tabs => {
      const activeTab = tabs.find(tab => tab.active);
      const tabIndex = (activeTab.index + tabs.length + (command == 'Switch_Right' ? 1 : -1)) % tabs.length;
      chrome.tabs.update(tabs[tabIndex].id, { active: true });
    });
  });
});
