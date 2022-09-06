const responseCreated = (res) => {
	res.status(201).send({
		is_success: true,
		message: "Data berhasil ditambahkan",
	});
};

const responseUpdated = (res) => {
	res.status(200).send({
		is_success: true,
		message: "Data berhasil diubah",
	});
};

const responseDeleted = (res) => {
	res.status(200).send({
		is_success: true,
		message: "Data berhasil dihapus",
	});
};

const responseNotFound = (res) => {
	res.status(404).send({
		is_success: false,
		message: "Data tidak ditemukan",
	});
};

const responseGetData = (res, data) => {
	res.status(200).send({
		is_success: true,
		data: data,
	});
};

module.exports = {
	responseCreated,
	responseUpdated,
	responseDeleted,
	responseNotFound,
	responseGetData,
};
