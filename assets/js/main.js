const div =document.getElementById('product')
const btn = document.getElementById('pagi')
let page = 1
let limit = 3

async function getProducts() {
    let skip = (page - 1) * limit;
    try {
        const response = await axios.get(`https://655c30f2ab37729791aa0509.mockapi.io/basket?page=${page}&limit=${limit}&skip=${skip}`);
        const data = response.data;
        db = data

        data.forEach(item => {
            const box = document.createElement('div');
            box.className = 'boxDiv';
            box.innerHTML = `
                <p class='title'>${item.title}</p>
                <img src='${item.image}' alt="">
                <button onclick="addToBasket(${item.id})">Add to basket</button>
            `;
            div.appendChild(box);
        });
        page++;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

btn.addEventListener('click', getProducts)

function addToBasket (id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.push(db.find(item => item.id == id))
    localStorage.setItem('cart', JSON.stringify(cart))
}
window.onload = () => {
    getProducts()
}