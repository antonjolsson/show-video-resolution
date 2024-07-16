function onCreated() {
  console.log('Menu item created!')
}

browser.menus.create(
    {
        id: "show-resolution",
        title: "Show video resolution",
        contexts: ["all"],
    },
    onCreated,
);

/*browser.runtime.onMessage.addListener((obj) => {
    const found = obj?.message === 'video found'
    browser.menus.update(
        'show-resolution', {
            enabled: found
        }
    )
    console.debug(found ? 'video found' : 'video not found')
});*/

browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "show-resolution":
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
      // …
  }
});

