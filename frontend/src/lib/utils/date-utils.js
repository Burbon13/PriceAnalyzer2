const zeroPad = (num, places) => String(num).padStart(places, '0');

export const prettyDateTimeString = (date) => {
    return date.getFullYear()
        + "/" + zeroPad(date.getMonth() + 1, 2)
        + "/" + zeroPad(date.getDate(), 2)
        + " " + zeroPad(date.getHours(), 2)
        + ":" + zeroPad(date.getMinutes(), 2)
        + ":" + zeroPad(date.getSeconds(), 2);
};

export const prettyDateString = (date) => {
    return date.getFullYear()
        + "/" + zeroPad(date.getMonth() + 1, 2)
        + "/" + zeroPad(date.getDate(), 2);
}
