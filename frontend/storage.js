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

function languageStorage(mode){

    //SET CURRENT LANGUAGE TO STORAGE TO RESET ON RETURN

    if (typeof(Storage) !== "undefined") {

        //store the theme in the local browser storage

        localStorage.setItem("mode", mode);


    } else {

        // No Web Storage support
        //store a cookie instead

        document.cookie = "mode=" + mode;

    }

}

function getLanguageFromStorage() {

    if (typeof(Storage) !== "undefined") {

        var mode = localStorage.getItem("mode");

    } else {

        var mode = getCookie("mode");
    }

    if (mode == "") {
        return "python";
    }
    else {
        return mode;
    }

}

function retrieveFile() {

    //RETRIEVE THE LAST FILE THAT WAS WORKED ON

    if(typeof(Storage) !== "undefined") {

        var textContent = localStorage.getItem("code");

    } else {

        //No web storage support - bad luck.

    }

    if (textContent == null) {
        textContent = "";
    }

    return textContent;

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

function fileStorage(textContent) {

	if(typeof(Storage) !== "undefined") {

		localStorage.setItem("code", textContent);

	} else {

		//No web storage support - bad luck.

	}

}
