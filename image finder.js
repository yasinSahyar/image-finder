//https://www.youtube.com/watch?v=q8MK-f2qemg&list=PLURN6mxdcwL_D8H1iki2YCmp-lNyNAdbz&index=170

const formWrapper = document.querySelector(".form-wrapper");
const  form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageList = document.querySelector(".imageList-wrapper");

runEventListeners();

function runEventListeners(){
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clear);
}

function clear(){
    searchInput.value="";
    Array.from(imageList.children).forEach((child)=>child.remove())
    // imageList.innerHTML=""; //bu satirdaki kod bi ustteki 19.satirdikisyle ayini islem yapyor
}

function search(e){
    
    const value = searchInput.value.trim();//trim--inputta sagi soldaki bosluk olsada hata vermez

     //@RequestParam ---spring --rest API  ---"?"
    fetch(`https://api.unsplash.com/search/photos?query=${value}`,{ //${value}--inputta verdigimiz deger
        method : "GET",
        headers :{
            Authorization : "Client-ID Cp2BsX5w9LqIVuiHGRUMOSYwgYnBfh9pSmMKgGn1CKM"
        }
    })
    .then((res)=> res.json())
    .then((data)=>{
        Array.from(data.results).forEach((image)=>{
            // console.log(image.urls.small)
            addImageToUI(image.urls.small)
        })
        
     })
    .catch((err)=> console.log(err));

    e.preventDefault(); //submit refleshlememesi icin buni ekledik
}

function addImageToUI(url){
    /*
    <div class="card">
                <img src="" alt="" >
            </div>
    */
    const div = document.createElement("div")
    div.className = "card";

    const img = document.createElement("img");
    img.setAttribute("src",url);
    img.height = '400';
    img.width = '400';

    div.appendChild(img);
    imageList.appendChild(div);

}
