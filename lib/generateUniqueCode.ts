export default function generateUniqueCode(length: number) {
	let result = "";
	const characters = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}
