var files = {
    "~":["aboutme.html", "learn.html"], 
    "~/hobbies":["programming.html", "video-games.html"]
}
var dirs = {
    "~":["hobbies"],
    "~/hobbies":[]
}
var last = ""; 

function execute(e) { 
    var val = document.getElementById("command").value;
    var dir = document.getElementById("dir").innerHTML;
    //pressing enter
    if(e.keyCode == 13) {  
        if(val.substring(0, 3) == "pwd") { 
            //pwd code
            document.body.appendChild(document.createElement("br"));
            var current = document.createElement("span"); 
            current.innerHTML = document.getElementById("dir").innerHTML; 
            current.style.fontSize = "6.625vh";
            current.style.color = "white";
            document.body.appendChild(current); 
            crtNewPrompt(document.getElementById("dir").innerHTML); 
        }else if(val.substring(0, 2) == "ls") { 
            //ls code here 
            document.body.appendChild(document.createElement("br"));
            var items = ls(dir);
            for(var i = 0; i < items.length; i++) { 
                var span = document.createElement("span"); 
                span.innerHTML = items[i] + " ";  
                if(items[i].includes(".")) { 
                    span.style.color = "white"; 
                }else { 
                    span.style.color = "lightblue"; 
                }
                span.style.fontSize = "6.625vh" 
                document.body.appendChild(span); 
            } 
            crtNewPrompt(document.getElementById("dir").innerHTML); 
        }else if(val.substring(0, 2) == "cd") {
            //cd code here 
            var dir = cd(dir, val.substring(3, val.length));
            if(dir == null) { 
                message("Invalid Directory"); 
            }else { 
                crtNewPrompt(dir); 
                document.title = "tahsin@stuy:" + dir; 
            } 
        }else if(val.substring(0, 3) == "cat") {
            //cat code here 
            var url = cat(dir, val.substring(4, val.length)); 
            if(url == null) { 
                message("Invaild File"); 
            }else { 
                document.location.replace(url);
            }
        }else { 
            message("Not a Command"); 
        }
        last = val;
    //pressing tab 
    }else if(e.keyCode == 9) {
        var command = ""; 
        var arg = ""; 
        var arr = []; 
        if(val.substring(0, 2) == "cd") {
            command = "cd";
            arg = val.substring(3, val.length);
            arr = dirs[dir]; 
        }else if(val.substring(0, 3) == "cat") {
            command = "cat"; 
            arg = val.substring(4, val.length); 
            arr = files[dir]; 
        }
        if(command.length > 0) {
            var indecies = []; 
            for(var i = 0; i < arr.length; i++) {
                if(arg == arr[i].substring(0, arg.length)) {
                    indecies.push(i);
                }
            } 
            if(indecies.length == 1) {document.getElementById("command").value = command + " " + arr[indecies[0]];}
        }
    }
}

function ls(dir) {
    return dirs[dir].concat(files[dir]); 
}

function cd(dir, arg) {
    if(arg == ".") { 
        return dir; 
    }else if(arg == "..") {
        return dir.substring(0, dir.lastIndexOf("/"));    
    }else if(dirs[dir].includes(arg)) { 
        return dir + "/" + arg; 
    }else { 
        return null; 
    }
}

function cat(dir, arg) { 
    if(files[dir].includes(arg)) { 
        if(dir == "~") {
            return arg;
        }else { 
            return dir.substring(dir.indexOf("/") + 1, dir.length) + "/" + arg;  
        }
    }else { 
        return null; 
    }
}

function crtNewPrompt(dir) {
    var prompt = document.getElementById("terminal").cloneNode(true); 

    //killing the old prompt
    document.getElementById("terminal").className = "terminal_dead"; 
    document.getElementById("terminal").id = ""; 
    document.getElementById("dir").className = "dir_dead"; 
    document.getElementById("dir").id = ""; 
    document.getElementById("command").disabled = true; 
    document.getElementById("command").className = "command_dead"; 
    document.getElementById("command").id = ""; 

    //creating the new one
    document.body.appendChild(document.createElement("br"));
    document.body.appendChild(prompt); 
    document.getElementById("dir").innerHTML = dir; 
    document.getElementById("command").disabled = false;
    document.getElementById("command").value = ""; 
    document.getElementById("command").focus();  
}

function message(str) { 
    document.body.appendChild(document.createElement("br"));
    var text = document.createElement("span"); 
    text.innerHTML = str;
    text.style.fontSize = "6.625vh"; 
    text.style.color = "white"; 
    document.body.appendChild(text); 
    crtNewPrompt(document.getElementById("dir").innerHTML);  
}

document.onkeydown = function(e) {
    if(e.keyCode == 38) {document.getElementById("command").value = last;}
    else if(e.keyCode == 40) {document.getElementById("command").value = "";}
}