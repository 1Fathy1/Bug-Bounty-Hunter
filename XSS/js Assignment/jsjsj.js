document.write('Start DOM <hr> <span> private text </span>');
let myDiv = document.getElementById("100");
myDiv.style.backgroundColor = "red";
let cretaDiv = document.createElement("div");
cretaDiv.style.backgroundColor = "#eee";
cretaDiv.innerHTML = "Creted elemnt";
myDiv.appendChild(cretaDiv);
let linksArray = document.links.push("www.google.com");
console.log(document.links.length);

function print() {

    document.write("Don");
}
myDiv.addEventListener("clike", print());