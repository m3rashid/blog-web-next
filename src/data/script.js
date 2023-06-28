const files = [
	'benchmarking-nodejs-and-golang-servers.md',
	'creating-api-server-in-nodejs.md',
	'creating-your-own-blockchain-network.md',
	'device-detection-in-modern-browsers.md',
	'environment-variables-in-react.md',
	'how-i-achieved-time-travel-in-github.md',
	'how-to-use-git.md',
	'mongodb-sucks-or-does-it-not.md',
	'networking-protocols.md',
	'oops=in-js-ts.md',
	'scaling-up-nodejs-server-what-i-learnt-so-far.md',
	'the-clean-architecture.md',
	'the-package-json.md',
	'things-to-know-before-you-actually-start-learning-to-code.md',
	'webhooks.md',
];

const t = files.map((f) => {
	const name = f.split('.')[0];

	return {
		slug: name,
		title: name
			.split('-')
			.map((w) => w[0].toUpperCase() + w.slice(1))
			.join(' '),
		bannerImageUrl: '',
		categories: [
			{
				name: '',
				slug: '',
			},
		],
	};
});

console.log(JSON.stringify(t, null, 2));
