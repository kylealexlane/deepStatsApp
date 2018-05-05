export function hexToRgbA(hex, opacity=1){
    let c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+`${opacity}`+')';
    }
    throw new Error('Bad Hex');
}

export function playerPic(firstName = null, lastName = "", full = "") {
    let first = '';
    let last = '';
    if (first !== null){
        first = firstName;
        last = lastName;
    } else {
        const firstLast = full.split(" ");
        first = firstLast[1];
        last = firstLast[0];
    }
    console.log(`https://nba-players.herokuapp.com/players/${last}/${first}`);
    return `https://nba-players.herokuapp.com/players/${last}/${first}`;
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

export function swapInArray(theArray, indexA, indexB) {
    const temp = theArray[indexA];
    theArray[indexA] = theArray[indexB];
    theArray[indexB] = temp;
    return theArray;
};