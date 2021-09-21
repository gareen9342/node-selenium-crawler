const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .build();
    try {
        await driver.get('https://www.10000recipe.com/');
        let searchInput = await driver.findElement(By.id('srhRecipeText'));

        let keyWord = '버섯';
        searchInput.sendKeys(keyWord, Key.ENTER);

        await driver.wait(until.elementLocated(By.className('common_sp_list_ul')), 10000);

        let resultElements = await driver.findElements(By.className('common_sp_caption_tit'));

        // console.log(resultElements)

        Promise.all(resultElements.map(x => x.getText())).then((values) => {
            console.log(values)
        })



        // 4초를 기다린다.
        try {
            await driver.wait(() => { return false; }, 4000);
        } catch (err) {
            console.error(err)
        }

    }catch (err){
        console.error(err)
    }finally{
        driver.quit();
    }
})();
