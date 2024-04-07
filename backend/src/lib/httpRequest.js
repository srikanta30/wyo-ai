const superagent = require("superagent");
getRequest = async function (opts) {
	try {
		const res = await superagent.get(opts.uri).set("Authorization", opts.header).query(opts.qs).send(opts.body);
		return res.body;
	} catch (err) {
		let error = JSON.parse(err.response.res.text);
		error.ishttp = 1;
		throw Error(JSON.stringify(error));

	}
};

postRequest = async function (opts) {
	try {
		const res = await superagent.post(opts.uri).set("Authorization", opts.header).send(opts.body).query(opts.qs);
		return { body: res.body, headers: res.headers };
	} catch (err) {
		let error = JSON.parse(err.response.res.text);
		error.ishttp = 1;
		throw Error(JSON.stringify(error));
	}
};

putRequest = async function (opts) {
	try {
		const res = await superagent.put(opts.uri).set("Authorization", opts.header).send(opts.body).query(opts.qs);
		return { body: res.body, headers: res.headers };
	} catch (err) {
		let error = JSON.parse(err.response.res.text);
		error.ishttp = 1;
		throw Error(JSON.stringify(error));
	}
};

deleteRequest = async function (opts) {
	try {
		const res = await superagent.delete(opts.uri).set("Authorization", opts.header).send(opts.body).query(opts.qs);
		return res.body;
	} catch (err) {
		let error = JSON.parse(err.response.res.text);
		error.ishttp = 1;
		throw Error(JSON.stringify(error));
	}
};

module.exports = {
	getRequest,
	postRequest,
	putRequest,
	deleteRequest,
};
