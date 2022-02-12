export function setItem(itemName,value){
    window.localStorage.setItem(itemName, value);
}

export function getItem(itemName){
    return window.localStorage.getItem(itemName);
}