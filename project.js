function selectcartype (){
    var car={
        carinfo:{
            name:"Chevorolet",
            price:"GHS90",
            image:"images/img.jpg"
        }
    }

    var output = document.getElementById('output');

    output.innerHTML = `<img src="${car.carinfo.image}" width="200px" height="200px"/> <br> <strong>Car Brand: </strong> ${car.carinfo.name}, <strong>Price: </strong> ${car.carinfo.price}  `

}

function electronictype() {
    var car = {
        carinfo: {
            name: "Fridge",
            price: "GHS400.00",
            image: "images/img1.jpg"

        }
    }
    function furnature(){
        var car={
            carinfo:{
                name:"sofa",
                price:"GHS200",
                image: "images/img.jff"
            }
        }
    }

    var output = document.getElementById('output');

    output.innerHTML = `<img src="${car.carinfo.image}" width="200px" height="200px"/> <br> <strong>Brand: </strong> ${car.carinfo.name}, <strong>Price: </strong> ${car.carinfo.price}  `

}