//storage.js

if (typeof(Storage) !== "undefined") {
    
    //promt user for usernmae if not set


} else {

    // Sorry! No Web Storage support
    //store a cookie instead

}

function themeStorage(theme) {

    //SET CURRENT THEME TO STORAGE TO RESET ON RETURN

    localStorage.setItem("theme", theme);

}

function languageStorage(){

    //SET CURRENT LANGUAGE TO STORAGE TO RESET ON RETURN

}

function fileStorage() {

    //SET FILE CONTENTS IN STORAGE FOR LATER OR IF DISCONNECT

}