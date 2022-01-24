export const checkpass = (pass, rpass) => {
    if (pass === rpass) return true;
    else return false;
}


export function capitalizeFirstLetter(string) {
    string = string.toLocaleLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}
