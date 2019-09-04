//new fetch way
fetch("https://kea-alt-del.dk/t5/api/categories")
.then(res=>res.json())
.then(function(data){
    data.forEach(buildCategory)
    getProducts();
})

function buildCategory(data){
    const section = document.createElement("section");
    const header = document.createElement("h1");
    header.textContent = data;
    section.setAttribute("id",data)

    section.appendChild(header);
    document.querySelector("main").appendChild(section);
}



//step 1 fetch (old way)
function getProducts(){
fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function (response) {
        return response.json()
    }).then(function (data) {
        data.forEach(showDish)
    })
    }

//step 2 call the function

function showDish(dish) {
    //step 3 grab template
    console.log(dish)
    const template = document.querySelector("template.product").content;
    //step 4 cloning
    const copy = template.cloneNode(true);
    //step 5 change data


    copy.querySelector(".data_name").textContent = ` ${dish.name}`;
    copy.querySelector(".data_price").textContent = `${dish.price}DKK`
    if (dish.discount) {

        copy.querySelector(".data_price").classList.add("discount");

        copy.querySelector(".data_discount").textContent = Math.round(dish.price - dish.discount / 100 * dish.price)
    } else {
        copy.querySelector(".data_discount").remove();

    }
    if(dish.soldout){
        //do nothing
    }else{
        copy.querySelector("article").classList.remove("soldOut");
    }



copy.querySelector(".containsAlcohol").textContent = `${dish.alcohol}% Alcohol`;

// we need the ids to identify the specific details to show
copy.querySelector("article.product").setAttribute("id", `id${dish.id}`)
copy.querySelector(".productbody button").setAttribute("id", `id${dish.id}`)
//adding
copy.querySelector(".data_description").textContent = `${dish.shortdescription}`;
if(dish.vegetarian){
    copy.querySelector(".data_vegetarian").textContent = ` Vegetarian`;
}else {
   copy.querySelector(".data_vegetarian").textContent = `NOT Vegetarian`;
}

copy.querySelector(".shadow").src = `imgs/medium/${dish.image}-md.jpg`;


//step 6 - changed for new fetch
document.querySelector(`#${dish.category}`).appendChild(copy);


}

document.addEventListener('click', function(e){
//console.log(e.target.getAttribute('class'))
//console.log(e.target.getAttribute('class').includes('details'))
//console.log(e.target.nodeName)
    if(e.target.nodeName == 'BUTTON' && e.target.getAttribute('class').includes('details')) {
        console.log(e.target, 'Open Details')
        const productId = e.target.getAttribute('id')
        console.log(productId)
        const detailsToToggle = document.querySelector(`article#${productId} section.details`)
        console.log(detailsToToggle)
        detailsToToggle.classList.toggle('hidden')
    }
//    else {
//        console.log(e.target, 'no')
//    }
})

