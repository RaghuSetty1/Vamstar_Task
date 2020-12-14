var req = require("request-promise"),
	cheerio = require("cheerio");

const website = "https://prefeitura.pbh.gov.br/saude/licitacao/pregao-eletronico-151-2020";

(async () => {
	const response = await req({
		uri: website,
		headers: {
			accept:
				"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
			"accept-encoding": "gzip, deflate, br",
			"accept-language": "en-US,en;q=0.9"
		},
		gzip: true,
	}).then(function (html) {
		let $ = cheerio.load(html);
		let data = [], links = [];
		data.push($('#page-main-content').find('.lbl-licitacao').eq(0).text());
		data.push($('#page-main-content').find('.lbl-licitacao').eq(5).text());
		data.push($('#page-main-content').find('.lbl-licitacao').eq(1).siblings('p').eq(0).text());

		$('#page-main-content').find('table').find('tbody').find('tr').each((i, ele) => {
			links.push($(ele).find('td').eq(1).find('a').eq(1).attr('href'));
		});

		data.push(links);

		console.log(data);
	}).catch(function (err) {
		console.log(err);
	});

}
)();