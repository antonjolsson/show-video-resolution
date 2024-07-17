function onCreated() {
  console.log('Menu item created!')
}

browser.menus.create(
    {
        id: "show-resolution",
        title: "Show video resolution window",
        contexts: ["all"],
    },
    onCreated,
);

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
})

