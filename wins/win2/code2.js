window.__ALL_TWEETS__ = new Map();

const collectTweets = () => {
    document.querySelectorAll('article').forEach(tweet => {
        const textEl = tweet.querySelector('[data-testid="tweetText"]');
        const timeEl = tweet.querySelector('time');
        const linkEl = tweet.querySelector('a[href*="/status/"]');

        if (!textEl || !timeEl || !linkEl) return;

        const url = "https://x.com" + linkEl.getAttribute("href");

        if (!window.__ALL_TWEETS__.has(url)) {
            window.__ALL_TWEETS__.set(url, {
                id: url.split("/status/")[1],
                username: location.pathname.replace("/", ""),
                text: textEl.innerText,
                created_at: timeEl.dateTime,
                url
            });
        }
    });
};

console.log("✅ Tweet collector initialized");


(async () => {
    let lastHeight = 0;
    let stable = 0;

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    while (stable < 6) {
        collectTweets();
        window.scrollTo(0, document.body.scrollHeight);
        await sleep(2000);

        const h = document.body.scrollHeight;
        if (h === lastHeight) stable++;
        else {
            stable = 0;
            lastHeight = h;
        }
    }

    collectTweets();
    console.log("✅ Finished scrolling & collecting");
})();


const allTweets = Array.from(window.__ALL_TWEETS__.values());

console.log("Total tweets captured:", allTweets.length);
console.log(JSON.stringify(allTweets, null, 2));

(() => {
    const data = Array.from(window.__ALL_TWEETS__.values());
    const json = JSON.stringify(data, null, 2);

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "robj3d3_tweets.json";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log(`✅ Downloaded ${data.length} tweets`);
})();
