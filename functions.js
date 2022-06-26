function verifyPic(str, boolean) {
	if (boolean) { return /\.(jpe?g|png|gif|webp)$/i.test(str) }
	if (!boolean) { return /\.(jpe?g|png|webp)$/i.test(str) }
	else { return false }
}

module.exports = {
    verifyPic
}