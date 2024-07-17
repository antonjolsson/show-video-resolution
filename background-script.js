function onCreated() {
  console.log('Menu item created!')
}

browser.menus.create(
    {
        id: "show-statistics",
        title: "Show video statistics window",
        contexts: ["all"],
    },
    onCreated,
);

browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "show-statistics":
        browser.tabs
            .query({
                currentWindow: true,
                active: true,
            })
            .then(res => {
                const tabId = res[0].id
                browser.tabs.sendMessage(tabId, info.targetElementId)
            })
      break;
  }
})

/*browser.runtime.onMessage.addListener((obj) => {
    browser.menus.update('show-statistics', {
        title: obj?.message === 'window hidden' ? 'Show video statistics window' : 'Hide video statistics window'
    })
});*/

