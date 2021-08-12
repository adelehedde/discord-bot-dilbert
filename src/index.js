const axios = require('axios');
const cheerio = require('cheerio');

const properties = { dilbertWebsiteUrl: 'https://dilbert.com' };

function getRequiredEnvVar(envVarName) {
	const envVar = process.env[envVarName];
	if (envVar == null) {
		throw new Error(`Environment variable ${envVarName} is not set !`);
	}
	return envVar;
}

async function getResource(url) {
	console.log(`[INFO] Getting resource from ${url}`);
	const response = await axios.get(url);
	return response.data;
}

async function postResource(url, json) {
	console.log(`[INFO] Posting resource to ${url}`);
	return axios.post(url, json);
}

function extractComicItem(htmlDocument) {
	let $ = cheerio.load(htmlDocument);
	const firstComicItem = $('.comic-item:first-of-type');
	$ = cheerio.load(firstComicItem.html());
	const comicItem = {};
	comicItem.title = $('.comic-title-name').text();
	comicItem.url = $('.comic-title-link').attr('href');
	comicItem.date = $('div.post-meta-info').text();
	comicItem.mediaUrl = $('img.img-comic').attr('src');
	return comicItem;
}

function buildDiscordMessageTemplate() {
	return { content: null, embeds: [ { title: null, url: null, color: 11480871, footer: { 'text': null }, 'image': { 'url': null } } ] };
}

function buildDiscordMessage(comicItem) {
	const discordMessageTemplate = buildDiscordMessageTemplate();
	discordMessageTemplate.embeds[0].title = comicItem.title;
	discordMessageTemplate.embeds[0].url = comicItem.url;
	discordMessageTemplate.embeds[0].footer.text = comicItem.date;
	discordMessageTemplate.embeds[0].image.url = comicItem.mediaUrl;
	console.log(`[DEBUG] ${JSON.stringify(discordMessageTemplate)}`);
	return discordMessageTemplate;
}

async function main() {
	try {
		console.log('[INFO] Discord Bot Dilbert');
		const discordWebhookUrl = getRequiredEnvVar('DISCORD_WEBHOOK_URL');
		const htmlDocument = await getResource(properties.dilbertWebsiteUrl);
		const comicItem = extractComicItem(htmlDocument);
		const discordMessage = buildDiscordMessage(comicItem);
		postResource(discordWebhookUrl, discordMessage);
	} catch(error) {
		console.log(error);
		process.exit(1);
	}	
}

main();
