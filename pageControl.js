function loadTab(event, tab){
    var content, links;
    content = document.getElementsByClassName("tab");
    for (var i = 0; i < content.length; i++) {
        content[i].style.display = "none";
    }
    links = document.getElementsByClassName("tabButton");
    for (var i = 0; i < links.length; i++) {
        links[i].className = links[i].className.replace(" active", "");
    }
    document.getElementById(tab).style.display = "block";
    event.currentTarget.className += " active";
}
