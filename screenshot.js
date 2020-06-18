const handlebars = require('handlebars');
// const puppeteer = require('puppeteer');
const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
 
async function getImage({content, html}){
    // const browser = await puppeteer.launch({
    //     args: ["--no-sandbox", "--disable-setuid-sandbox"]
    // });

    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    });

    const page = await browser.newPage();
    if (content) {
      const template = handlebars.compile(html)
      html = template(content, { waitUntil: "load" })
    }
    await page.setContent(html)
    const element = await page.$('body')
    const buffer = await element.screenshot()
    await browser.close()
    return buffer
}

module.exports = { getImage };