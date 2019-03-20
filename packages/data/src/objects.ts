/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE-examples file in the root directory of this source tree.
 */
import { URL } from 'url';
import qs from 'qs';
import { Agent } from 'https';
import { existsSync, writeFileSync } from 'fs';
import { hash, ts, apikey, baseURL } from '../../graphql/utils/index';
import fetch from 'isomorphic-fetch';
const state = require("./data/_state.json")

function normalizeUrl(url) {
	return new URL(url).toString();
}
/**
 * Iterate through the resources, fetch from the URL, convert the results into
 * objects, then generate and print the cache.
 */
const name = process.argv[2];
const count = (parseInt(process.argv[4]) || state.count || 1000);
const limit = parseInt(process.argv[5]) || state.limit || 5;
const startIdx = parseInt(process.argv[3]) || state[name].cursor;
const endIdx = startIdx + count;

async function cacheResources() {
	const agent = new Agent({ keepAlive: true });
	const cache = {};
	const params = await qs.stringify({ hash, ts, apikey });

	for (let i = startIdx; i <= endIdx; i += limit) {
		let url = `https://gateway.marvel.com/v1/public/${name}?offset=${i}&limit=${limit}&${params}`;
		while (url != null) {
			console.error(url);
			const response = await fetch(url, { agent });
			const data = await response.json();
			for (const obj of data.data.results) {
				console.error(data.data.total, data.data.count)
				cache[normalizeUrl(`${baseURL}/${name}/${obj.id}`)] = obj;
			}
			url = data.next;
		}
	}

	return cache;
}

const outfile = process.argv[2];
if (!outfile) {
	console.error('Missing ouput file!');
	process.exit(1);
}

if (!existsSync(outfile)) {
	console.log('Downloading cache...');
	cacheResources()
		.then((cache) => {
			const data = JSON.stringify(cache, null, 2);
			writeFileSync(
				`src/data/${name}/${name} ${startIdx}-${endIdx}.json`,
				data,
				'utf-8'
			);
			state[name].cursor = endIdx;
			writeFileSync(
				`src/data/_state.json`,
				JSON.stringify(state, null, 2),
				'utf-8'
			);
			console.log('Cached!');
		})
		.catch(function (err) {
			console.error(err);
			process.exit(1);
		});
}
