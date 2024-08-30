const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;


app.get('', async (req, res) => {
	res.status(200).json({
		message: "Hello WeLAST!"
	});
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
