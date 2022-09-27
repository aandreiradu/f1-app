const decideActivity = (fp1, fp2, fp3, qualy, race) => {
	console.log('decideActivity received', { fp1, fp2, fp3, qualy, race });
	const dateNow = new Date();

	const fp1Date = new Date(fp1) ?? null;
	const fp2Date = new Date(fp2) ?? null;
	const fp3Date = new Date(fp3) ?? null;
	const qualyDate = new Date(qualy) ?? null;
	const raceDate = new Date(race) ?? null;

	const result =
		dateNow <= fp1Date
			? new Date(fp1)
			: dateNow > fp1Date && dateNow <= fp2Date
			? new Date(fp2)
			: dateNow > fp2Date && dateNow <= fp3Date
			? new Date(fp3)
			: dateNow > fp3Date && dateNow <= qualyDate
			? new Date(qualy)
			: dateNow > qualyDate && dateNow <= raceDate
			? new Date(race)
			: null;

	console.log('decideActivity result', result);
	return result;
};

export default decideActivity;
