const UTCtoRO = (date, time) => {
    const roTIME = new Date(`${date}  ${time}`);
    roTIME.setHours(roTIME.getHours() + 3);

    const hour = roTIME.getHours(roTIME);
    let minutes = roTIME.getMinutes(roTIME);
    minutes = minutes < 10 ? minutes + '0' : minutes;

    return `${hour}:${minutes}`;
}





const dateUtils = {
    UTCtoRO
};

export default dateUtils;




