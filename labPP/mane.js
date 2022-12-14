async function goCar() {
    let postitem = document.querySelector('.postitem');
    let addzero = document.querySelector('.addzero');
    let minprice = document.querySelector('.minprice');
    let inputs = document.querySelectorAll('input');
    let submit = document.querySelector('.submit');
    let change = document.querySelector('.change');

let res = await fetch('https://63510eaedfe45bbd55b55766.mockapi.io/api/Exx');
let data = await res.json();
const items = [];

class Car {
    constructor(data) {
        this.title = data.title,
        this.price = data.price,
        this.id = data.id
    }
}
for(i = 0; i < data.length; i++) {

    let car = new Car(data[i]);

    items.push(car);

    postitem.innerHTML += `
    <div class="post-item-wrap">
    <h1 class="post-title">${items[i]['title']}</h1>
    <p class="post-content">Cost: ${items[i]['price']}</p>
    <p class="post-content">Rating: ${items[i]['id']}</p>
    </div>
    `
}
console.log(items);

addzero.addEventListener('click', (event) => {
    postitem.innerHTML = '';

        for (let i = 0; i < items.length; i++) {
           
            let carprice = [];
           
            carprice.push(items[i]['price']);
           

            items[i]['price'] = carprice.map(price => price + "0");
            

            postitem.innerHTML += `
            <div class="post-item-wrap">
            <h1 class="post-title">${items[i]['title']}</h1>
            <p class="post-content">Cost: ${items[i]['price']}</p>
            <p class="post-content">Rating: ${items[i]['id']}</p>
            </div>
            `;
        }
    })

    minprice.addEventListener('click', (event) => {
        let cartitle = [];
        let carprice = [];

        for (let i = 0; i < items.length; i++) {
            if (items[i]['price'].length == 1) {
                cartitle.push(items[i]['title']);
                carprice.push(items[i]['price'][0]);
            } 
            
            
      else {
                cartitle.push(items[i]['title']);
                carprice.push(items[i]['price']);    
            }
        }

        let minCount = carprice[0];

        for(let j = 0; j < carprice.length; j++) {
            if (carprice[j] <= minCount && carprice[j] != '') {
                minCount = carprice[j];
                cartitle.push(items[j]['title']);
            }
        }
        carprice = carprice.filter(item => item == minCount);

        for (let g = 0, h = cartitle.length - carprice.length; g < carprice.length; g++, h++) {
            console.log(cartitle[h] + ": " + carprice[g]);
        }
    })

    submit.addEventListener('click', (event) => {
        console.clear()
        postitem.innerHTML += ''

        let carob = new Object();

        for (let i = 0; i < inputs.length; i++) {
            switch (i) {
                case 0:
                    carob.title = inputs[i].value;
                    break;

                case 1:
                    carob.price = inputs[i].value;
                    break;

                case 2:
                    carob.id = inputs[i].value;
                    break;

            }

            inputs[i].value = "";
        }

        items.push(carob);
        console.log(items);

        for (let i = items.length - 1; i < items.length; i++) {
            postitem.innerHTML += `
            <div class="post-item-wrap">
            <h1 class="post-title">${items[i]['title']}</h1>
            <p class="post-content">Cost: ${items[i]['price']}</p>
            <p class="post-content">Rating: ${items[i]['id']}</p>
            </div>
         `;
    }
 })

    change.addEventListener('click', (event) => {
        console.clear();
        postitem.innerHTML = "";
        
        for (let i = 0; i < items.length - 1; i++) {
            let temp = items[i]['title']; 
            items[i]['title'] =  items[i+1]['title'];
            items[i+1]['title'] = temp;
        }

        for (let i = 0; i < items.length; i++) {
            postitem.innerHTML += `
            <div class="post-item-wrap">
            <h1 class="post-title">${items[i]['title']}</h1>
            <p class="post-content">Cost: ${items[i]['price']}</p>
            <p class="post-content">Rating: ${items[i]['id']}</p>
            </div>
        `;
        }
    })
}
goCar();
