export const truncateString = (str, maxLength = 30)=> {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '...';
    } else {
        return str;
    }
}