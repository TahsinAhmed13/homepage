var files = {
    "~":["aboutme.html", "learn.html"]
}
var dirs = {
    "~":[]
}
var last = ""; 

function execute(e) { 
    //pressing enter
    if(e.keyCode == 13) { 
        var val = document.getElementById("command").value;
        var dir = document.getElementById("dir").innerHTML; 
        if(val.substring(0, 3) == "pwd") { 
            var current = document.createElement("span"); 
            current.innerHTML = document.getElementById("dir").innerHTML; 
            current.style.fontSize = "4em"; 
            current.style.color = "white";
            document.body.appendChild(current); 
            crtNewPrompt(document.getElementById("dir").innerHTML); 
        }else if(val.substring(0, 2) == "ls") { 
            //ls code here 
            var items = ls(dir);
            for(var i = 0; i < items.length; i++) { 
                var span = document.createElement("span"); 
                span.innerHTML = items[i] + " ";  
                if(items[i].includes(".")) { 
                    span.style.color = "white"; 
                }else { 
                    span.style.color = "lightblue"; 
                }
                span.style.fontSize = "4em"; 
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
    }
}

function ls(dir) {
    return dirs[dir].concat(files[dir]); 
}

function cd(dir, arg) {
    if(arg == ".") { 
        return dir; 
    }else if(dirs[dir].includes(arg)) { 
        return dir + "/" + arg; 
    }else { 
        return null; 
    }
}

function cat(dir, arg) { 
    if(files[dir].includes(arg)) { 
        return arg;
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
    var text = document.createElement("span"); 
    text.innerHTML = str;
    text.style.fontSize = "4em"; 
    text.style.color = "white"; 
    document.body.appendChild(text); 
    crtNewPrompt(document.getElementById("dir").innerHTML);  
}

document.onkeydown = function(e) {
    if(e.keyCode == 38) {document.getElementById("command").value = last;}
    else if(e.keyCode == 40) {document.getElementById("command").value = "";}
}