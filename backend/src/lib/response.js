const constants = require("../constants/constants");
async function getErrorMessage(errCode) {
	let resMessage;
	switch (errCode) {
		case constants.response_code.JWT:
			resMessage = "Invalid Access Token!";
			break;

		case constants.response_code.INVALID_ID:
			resMessage = "Invalid user";
			break;

		case constants.response_code.UNAUTHORIZED:
			resMessage = "You are not authorized!";
			break;

		case constants.response_code.FORBIDDEN:
			resMessage = "This action is forbidden for you!";
			break;

		case constants.response_code.ROLE_BREACH:
			resMessage = "You are not authorize to perform this action!";
			break;

		case constants.response_code.NOT_FOUND:
			resMessage = "Data not found";
			break;

		case constants.response_code.EMPTY_REQ:
			resMessage = "Empty data set cannot be processed";
			break;

		default:
			resMessage = "Some unknown error occurred!";
			break;
	}
	return resMessage;
}
function errors(err) {
	var finaError = [];
	if (err) {
		for (field in err.errors) {
			if (!finaError.includes(err.errors[field].msg)) {
				finaError.push(err.errors[field].msg);
			}
		}
	}

	return finaError;
}

sendResponse = async (resCode, resMessage, data, res, error, extras = null) => {
	if (extras) {
		RemoveImages(extras.file, extras.unlinkFile)
	}
	if (resCode > constants.response_code.MAX_SUCCESS_CODE) {
		resMessage = resMessage || getErrorMessage(resCode);
		data = null;
	}
	return res.status(resCode).json({
		status: {
			code: resCode,
			message: resMessage,
		},
		data: data,
		error: errors(error),
	});
};

sendHttpResponse = async (err, res, errors) => {
	console.log("Error - Added : ", err);
	console.log("Response - Added : ");
	console.log("Errors - Added : ", errors);
	var error = JSON.parse(err.message);
	if (error.ishttp) {
		if (error.error.length) {
			for (let i = 0; i < error.error.length; i++) {
				errors.errors.push({ msg: error.error[i] });
			}
		} else {
			errors.errors.push({ msg: error.status.message });
		}
		return sendResponse(error.status.code, null, null, res, errors);
	}
	return sendResponse(error.status.code, error.status.message || constants.STRING_CONSTANTS.SOME_ERROR_OCCURED, null, res, errors);

};

RemoveImages = async (req, unlinkFile) => {
	for (let i = 0; i < req.files.length; i++) {
		await unlinkFile(req.files[i].path);
	}
};

module.exports = {
	RemoveImages,
	sendResponse,
	sendHttpResponse
};