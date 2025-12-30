(() => {
    const tweets = [];

    document.querySelectorAll('article').forEach((tweet) => {
        const textEl = tweet.querySelector('[data-testid="tweetText"]');
        const timeEl = tweet.querySelector('time');
        const linkEl = tweet.querySelector('a[href*="/status/"]');

        if (!textEl || !timeEl || !linkEl) return;

        tweets.push({
            username: location.pathname.replace("/", ""),
            text: textEl.innerText,
            timestamp: timeEl.getAttribute("datetime"),
            tweet_url: "https://x.com" + linkEl.getAttribute("href")
        });
    });

    console.log(JSON.stringify(tweets, null, 2));
    return tweets;
})();