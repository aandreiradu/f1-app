const blobToB64 = (blob) =>
	btoa(
		new Uint8Array(blob).reduce(function (data, byte) {
			return data + String.fromCharCode(byte);
		}, '')
	);

export default blobToB64;
