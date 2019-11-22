(async () => {
    // const db = await require("./connection")();
    const app = await require("./app")();

    app.listen(3000, function () {
        console.log("Example app listening on port 3000!");
    });
})();