const overlay = document.getElementById("overlay");
const closeMenu = document.getElementById("close-menu");

document.getElementById("open-menu") .addEventListener("click", function() {
    overlay.classList.add("show-menu");
});

document.getElementById("close-menu").addEventListener("click", function(){
    overlay.classList.remove("show-menu")
    wrap.classList.remove("column");
});

const email = document.getElementById("mail");
const submit = document.getElementById("submit");
const text = document.getElementById("valid-error");
let valid = false;

email.addEventListener("input", function (event) {
   const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   if(reg.test(email.value) == false) {
        text.innerHTML = "Введите корректный e-mail";
        valid = false;
   }else{
        text.innerHTML = "";
        valid = true;
   }
});
submit.addEventListener("click", function (){
    if(valid == false){
        alert("Введите корректный e-mail");
    }
});

const scrollElem = document.getElementById("scrollToTop");
window.onscroll = function() {
        if (document.documentElement.scrollTop*2 > document.documentElement.clientHeight) {
            scrollElem.style.opacity = "1";
        } else {
            scrollElem.style.opacity = "0";
        }
    }
let timeOut;
function goUp() {
   const top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);    
   if(top > 0) {
      window.scrollBy(0,-100);
      timeOut = setTimeout("goUp()",20);
   } else {
       clearTimeout(timeOut);
       scrollElem.style.opacity = "0";
   }
}

const sortPrice = document.getElementById("sort-price");
const sortAge = document.getElementById("sort-age");
const items = document.getElementById("items");
const priceSvg = document.getElementById("price-svg");
const ageSvg = document.getElementById("age-svg");

sortPrice.addEventListener("click",function () {
    sortItems("data-price");
    if(!priceSvg.classList.contains("active")){
        priceSvg.classList.add("active")
    }else if(priceSvg.classList.contains("active")){
        priceSvg.classList.remove("active")
    }
    ageSvg.classList.remove("active")
});
sortAge.addEventListener("click",function () {
    sortItems("data-age");
    if(!ageSvg.classList.contains("active")){
        ageSvg.classList.add("active")
    }else if(ageSvg.classList.contains("active")){
        ageSvg.classList.remove("active")
    }
    priceSvg.classList.remove("active")
});

function toUp(sortType){
    for (let i = 0; i < items.children.length - 1; i++) {
        for (let j = i; j < items.children.length; j++) {
            if (+items.children[i].getAttribute(sortType) > +items.children[j].getAttribute(sortType)) {
                let replacedNode = items.replaceChild(items.children[j], items.children[i]);
                insertAfter(replacedNode, items.children[i]);
            }
        }
    }
}

function toDown(sortType){
    for (let i = 0; i < items.children.length - 1; i++) {
        for (let j = i; j < items.children.length; j++) {
            if (+items.children[i].getAttribute(sortType) < +items.children[j].getAttribute(sortType)) {
                let replacedNode = items.replaceChild(items.children[j], items.children[i]);
                insertAfter(replacedNode, items.children[i]);
            }
        }
    }
}

function sortItems(sortType) {
    const orderPrice = sortPrice.getAttribute("data-order");
    const orderAge = sortAge.getAttribute("data-order");
    if(sortType=="data-price"){
        if(orderPrice == "true"){
            toUp(sortType);
            sortPrice.setAttribute("data-order",false)  
        }else if(orderPrice == "false"){
            toDown(sortType);
            sortPrice.setAttribute("data-order",true)
        }
    }else if(sortType=="data-age"){
        if(orderAge == "true"){
            toUp(sortType);
            sortAge.setAttribute("data-order",false)
        }else if(orderAge == "false"){
            toDown(sortType);
            sortAge.setAttribute("data-order",true)
        }
    }
}

function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}  
