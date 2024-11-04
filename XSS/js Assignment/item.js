function noSubmit() {
    return false;
}
// form
let myForm = document.getElementsByTagName("form")[0];
// input
let myInput = document.getElementsByClassName("input");
// butoom 
let btn = document.getElementsByName("create")[0];
btn.setAttribute("class", "input");
//div is result
let res = document.getElementsByClassName("results")[0];
res.style.cssText = 'width: 100% !important ; height : contents';
//take input 
let num = document.getElementsByName("elements")[0];

// style for form
console.log(myInput.length)
myForm.style.cssText = 'color: balck  ; height: 550px ; margin:0% 25%';
myForm.style.display = 'flex';
myForm.style.flexDirection = 'column';
for (let i = 0; i < myInput.length; i++) {
    myInput[i].style.width = '70%';
    // myInput[i].style.textIn = '2px';
    myInput[i].style.height = '15px';
    myInput[i].style.borderRadius = '2px';
    myInput[i].style.border = '1px';
    myInput[i].style.padding = '8px 5px';
    myInput[i].style.background = '#fcfceb';
    myInput[i].style.margin = '10px 15%';
    myInput[i].style.fontSize = '13px';
}
btn.style.backgroundColor = 'rgb(0 148 124)';
btn.style.height = '34px';
myInput[2].style.height = '30px';
btn.style.padding = '10px 0px';
btn.style.color = '#eee';
// myInput[2].style.cssText = 'height:30px ; width:70%';

let id = 1900;

function creatDiv(str, type) {
    // creat attribute

    let styl = 'width: 188px; height: 21px; text-align: center;border-radius: 2px;border: 10px 0px;padding: 3px 0px;background: #e45936;margin: 10px 15px ';
    let div = document.createElement(type);
    div.style.cssText = styl;
    div.innerText = str;
    div.setAttribute('id', id);
    div.setAttribute('class', 'NewDiv');
    res.appendChild(div);
    id++;
    // return div;
}


function creat() {
    let delDiv = document.getElementsByClassName("NewDiv");

    for (let i = delDiv.length - 1; i >= 0; i--) {
        delDiv[i].remove();
    }
    id = 1900;


    let counter = num.value;
    if (counter.length == 0)
        counter = 0;
    let str = myInput[1].value;
    let type = myInput[2].value;
    // console.log(type);

    for (let i = 0; i < counter; i++) {
        creatDiv(str, type);
    }

    // console.log(str + ' ' + counter);
}
let x = document.getElementById("11");

console.log(x.hasAttribute("name")); {
    // Jquery Code 
    $("table").css('cssText', 'background-color : #fff; width :400px ;');
    $("th").css('cssText', 'background-color : black; width : 25% ; height : 35px; margin:10px ; padding:5px');
    $("td").css('cssText', 'background-color : black; width : 25% ; height : 30px; margin:10px ; padding:5px');
    // $("#Don").css('ceeText', 'background-color : rgb(0 148 124);')

    $("#NE").css('cssText', 'background-color:rgb(0 148 124); color:#eee :; width:80px ; border:1px solid ; padding :5px');

    $("#NE").click(
        function() {
            var name = $("#text").val();
            var age = $("#age").val();
            var phone = $("#phone").val();

            var pattern = /alert\(\w\)/i;
            if (pattern.test(name)) {
                console.log("Find pattern");
                name = name.replace(pattern, "Fuck You");
            }

            $("#text").val("");
            $("#age").val("");
            $("#phone").val("");

            var data = `<tr><td>${name}</td><td>${age}</td><td>${phone}</td></tr>`;
            var old = $("table").html();
            $("table").html(old + data);
            $("td").css('cssText', 'background-color : black; width : 25% ; height : 30px; margin:10px ; padding:5px');


        });
}