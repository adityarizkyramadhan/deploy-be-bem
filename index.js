const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./conn");
require("dotenv").config();

const {
	responseCreated,
	responseUpdated,
	responseDeleted,
	responseNotFound,
	responseGetData,
} = require("./response");

const app = express();
const PORT = process.env.port || 5000;

const cors = require("cors");

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use(
	cors({
		origin: ["*"],
		credentials: true,
		methods: "GET,POST,DELETE,PUT,PATCH",
		crossDomain: true,
		allowedHeaders: [
			"Content-Type",
			"Authorization",
			"Accept",
			"Origin",
			"X-Requested-With",
			"X-HTTP-Method-Override",
		],
		preflightContinue: false,
		optionsSuccessStatus: 204,
	})
);

// TODO 1 : GET ALL TODOS
app.get("/todos", (_req, res) => {
	connection.query("SELECT * FROM TODOS", (error, todos) => {
		if (error) {
			console.log(error);
		} else {
			responseGetData(res, todos);
		}
	});
});

// TODO 2 : GET TODO BY ID
app.get("/todos/:id", (req, res) => {
	connection.query(
		`SELECT * FROM TODOS WHERE ID = ${req.params.id}`,
		(error, todos) => {
			if (error) {
				console.log(error);
			} else {
				if (todos.length !== 0) return responseGetData(res, todos);
				responseNotFound(res);
			}
		}
	);
});

// TODO 3 : ADD TODO
app.post("/todos", async (req, res) => {
	const data = await connection.query(
		`INSERT INTO TODOS (TODO) VALUES ('${req.body.todo}')`,
		(error) => {
			if (error) {
				console.log(error);
			} else {
				responseCreated(res);
			}
		}
	);
});

// TODO 4 : EDIT TODO BY ID
app.put("/todos/:id", (req, res) => {
	connection.query(
		`UPDATE TODOS SET TODO = '${req.body.todo}' WHERE ID = ${req.params.id}`,
		(error) => {
			if (error) {
				console.log(error);
			} else {
				responseUpdated(res);
			}
		}
	);
});

// TODO 5 : DELETE TODO BY ID
app.delete("/todos/:id", (req, res) => {
	connection.query(
		`DELETE FROM TODOS WHERE ID = '${req.params.id}'`,
		(error) => {
			if (error) {
				console.log(error);
			} else {
				responseDeleted(res);
			}
		}
	);
});

// TODO 6 : DELETE ALL TODOS
app.delete("/todos", (_req, res) => {
	connection.query(`DELETE FROM TODOS`, (error) => {
		if (error) {
			console.log(error);
		} else {
			responseDeleted(res);
		}
	});
});

app.get("*", (_req, res) => {
	res.sendStatus(404);
});

app.listen(PORT, (error) => {
	if (error) throw error;
	console.log(`Server berjalan pada port ${PORT}`);
});
