function themeStorage(theme) {
    //SET CURRENT THEME TO STORAGE TO RESET ON RETURN

    if (typeof(Storage) !== "undefined") {
    
        //store the theme in the local browser storage

        localStorage.setItem("theme", theme);


    } else {

        // No Web Storage support
        //store a cookie instead

        document.cookie = "theme=" + theme;

    }
}

function getThemeFromStorage() {

    if (typeof(Storage) !== "undefined") {

        var theme = localStorage.getItem("theme");
        return theme;

    } else {

        var theme = getCookie("theme");
        return theme;
        
    }

}

function languageStorage(){

    //SET CURRENT LANGUAGE TO STORAGE TO RESET ON RETURN

}

function fileStorage() {

    //SET FILE CONTENTS IN STORAGE FOR LATER OR IF DISCONNECT

}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}