const axios = require('axios');
require('dotenv').config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function fetchRepositories() {
  try {
    const response = await axios.get('https://api.github.com/users/freeCodeCamp/repos', {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`
      }
    });

    return response;

  } catch (error) {
    console.error('Error fetching data from GitHub API:', error.response.data);
  }
}
async function getRepoCommits({ owner, repo_name }) {
	try {
		const response = await axios.get(
			`https://api.github.com/repos/${owner}/${repo_name}/commits`,
			{
				headers: {
					Authorization: `token ${GITHUB_TOKEN}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error(
			"Error fetching data from GitHub API:",
			error.response.data
		);
	}
}

module.exports = {fetchRepositories,getRepoCommits};