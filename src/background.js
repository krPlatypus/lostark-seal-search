/*
chrome.action.onClicked.addListener((tab) => {
    console.log(tab);
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content-script.js']
    });
});*/

chrome.action.onClicked.addListener(function (tab) {
    chrome.windows.create({
        url: `index.html?${new URLSearchParams({
            tabId: tab.id,
        })}`,
        type: "popup",
        width: 830,
        height: 630,
    }, function (win) {
        // win represents the Window object from windows API
        // Do something after opening
        console.log('win', win);
    });
});