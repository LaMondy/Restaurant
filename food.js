fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function (response) {
        return response.json()
    }).then(function (data) {
        data.forEach(showDish)
    })

function showDish(dish) {
    console.log(dish)
    const template = document.querySelector("template").content;
    const copy = template.cloneNode(true);

    copy.querySelector(".data_name").textContent = dish.name;

    copy.querySelector(".containsAlcohol").textContent = `${dish.alcohol}% Alcohol`;

    copy.querySelector(".shadow").src = `imgs/medium/${dish.image}-md.jpg`;

    copy.querySelector(".data_price").textContent = `${dish.price},-- DKK`;
    if (dish.discount) {
        copy.querySelector(".data_price").classList.add("discount");
        copy.querySelector(".data_discount").textContent=Math.round(dish.price - dish.discount / 100 * dish.price)
    } else {
        copy.querySelector(".data_discount").remove();

    }
    if(dish.soldout){
        //do nothing
    }else{
        copy.querySelector("article").classList.remove("soldOut");
    }

    copy.querySelector(".data_soldout").textContent = dish.soldout;
    if (dish.soldout) {
    } else {
        copy.querySelector(".data_soldout").src = `assets/${dish.soldout}-soldoutimg.png`
    }


    document.querySelector(".productlist").appendChild(copy);

}
