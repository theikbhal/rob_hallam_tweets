(async () => {
    let lastHeight = 0;
    let sameHeightCount = 0;

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    while (sameHeightCount < 5) {
        window.scrollTo(0, document.body.scrollHeight);
        await sleep(2000);

        const newHeight = document.body.scrollHeight;

        if (newHeight === lastHeight) {
            sameHeightCount++;
            console.log(`No new tweets (${sameHeightCount}/5)`);
        } else {
            sameHeightCount = 0;
            lastHeight = newHeight;
            console.log("Loaded more tweets...");
        }
    }

    console.log("✅ Reached bottom of timeline");
})();