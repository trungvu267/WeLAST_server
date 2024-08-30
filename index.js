const express = require('express');
const axios = require('axios');
const cors = require('cors');
const {fetchRepositories} = require('./fetch-github-repos.js');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('', async (req, res) => {
	res.status(200).json({
		message: "Hello WeLAST!"
	});
});

app.get('/repos', async (req, res) => {

    try {
        const response = await fetchRepositories()

        let filtered_repos = response.data.filter(repo => !repo.fork && repo.forks > 5);

		const sort_direction = req.query.sort_direction?.toUpperCase() || 'DESC';
        filtered_repos = filtered_repos.sort((a, b) => {
            if (sort_direction === 'ASC') {
                return new Date(a.created_at) - new Date(b.created_at);
            } else {
                return new Date(b.created_at) - new Date(a.created_at);
            }
        });

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(filtered_repos);

    } catch (error) {
        console.error('Error fetching data from GitHub API:', error);
        res.status(500).json({ message: 'Failed to fetch repositories from GitHub' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
