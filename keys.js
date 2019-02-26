document.onkeydown = function(e) {
    //go back to the terminal on press T 
    if(e.keyCode == 84) { 
        var dir = document.title.substring(12, document.title.length); 
        localStorage.setItem("fromWhere", dir); 
        document.location.replace("terminal.html");
    }
}