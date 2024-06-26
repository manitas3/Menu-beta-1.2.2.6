document.addEventListener('DOMContentLoaded', function() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    const confirmarCompraButton = document.getElementById('confirmar-compra');
    const notificationElement = document.getElementById('notification');
    const customerNameInput = document.getElementById('customer-name');

    let cart = {};

    const menuData = {
        entradas: [
            { nombre: 'Ensalada César', descripcion: 'Lechuga, crutones, aderezo César.', precio: 80, imagen: 'https://cdn7.kiwilimon.com/recetaimagen/36391/45060.jpg' },
            { nombre: 'Queso Fundido', descripcion: 'Queso derretido con chorizo, servido con tortillas de maíz.', precio: 100, imagen: 'https://www.mexicoenmicocina.com/wp-content/uploads/2017/07/Queso-Fundido-con-Chorizo-%E2%80%8B%E2%80%8B1-1024x683.jpg' },
            { nombre: 'Guacamole', descripcion: 'Guacamole fresco con totopos.', precio: 90, imagen: 'https://www.goya.com/media/3968/mexican-guacamole.jpg?quality=80' },
            { nombre: 'Sopa de Tortilla', descripcion: 'Sopa caliente de tortilla con aguacate y crema.', precio: 85, imagen: 'https://assets.elgourmet.com/wp-content/uploads/2023/03/sopa-_hugNUCIWvbaBpcjk7QyfMs2AODrF3E-1024x683.png' }
        ],
        platosFuertes: [
            { nombre: 'Tacos al Pastor', descripcion: 'Tacos de carne al pastor con cebolla, cilantro y piña.', precio: 120, imagen: 'https://www.comedera.com/wp-content/uploads/2017/08/tacos-al-pastor-receta.jpg' },
            { nombre: 'Filete de Pescado', descripcion: 'Filete de pescado a la plancha con arroz y ensalada.', precio: 150, imagen: 'https://mejorconsalud.as.com/wp-content/uploads/2018/05/filete-pescado-verduras.jpg' },
            { nombre: 'Milanesa de Pollo', descripcion: 'Milanesa de pollo empanizada con papas fritas.', precio: 110, imagen: 'https://inmamamaggieskitchen.com/wp-content/uploads/2019/01/Milanesa-de-Pollo.jpg' },
            { nombre: 'Enchiladas Verdes', descripcion: 'Enchiladas de pollo bañadas en salsa verde, servidas con arroz y frijoles.', precio: 130, imagen: 'https://cdn7.kiwilimon.com/recetaimagen/36938/50874.jpg' }
        ],
        postres: [
            { nombre: 'Pastel de Chocolate', descripcion: 'Delicioso pastel de chocolate con salsa de fresa.', precio: 70, imagen: 'https://www.verybestbaking.com/sites/g/files/jgfbjl326/files/srh_recipes/6ac66e5882a6c7672cec34554a5a3a2d.jpg' },
            { nombre: 'Flan de Caramelo', descripcion: 'Flan casero con caramelo líquido.', precio: 60, imagen: 'https://mojo.generalmills.com/api/public/content/d0OzlvMawUWJ6G_dDAdWQg_gmi_hi_res_jpeg.jpeg?v=271f2d6e&t=16e3ce250f244648bef28c5949fb99ff' },
            { nombre: 'Helado de Vainilla', descripcion: 'Bola de helado de vainilla con sirope de chocolate.', precio: 50, imagen: 'https://www.recetasnestle.com.do/sites/default/files/srh_recipes/62099096785a3c939a1a1eefb06bf358.jpg' },
            { nombre: 'Tres Leches', descripcion: 'Pastel empapado en tres tipos de leche.', precio: 80, imagen: 'https://cdn0.recetasgratis.net/es/posts/0/1/9/torta_tres_leches_8910_orig.jpg' }
        ],
        bebidas: [
            { nombre: 'Margarita', descripcion: 'Clásica margarita preparada con tequila, triple sec y lima.', precio: 100, imagen: 'https://cdn.recetasderechupete.com/wp-content/uploads/2024/03/coctel_margarita_marie_brizard.jpg' },
            { nombre: 'Refresco', descripcion: 'Refresco de cola, naranja, o limón.', precio: 30, imagen: 'https://www.elfinanciero.com.mx/resizer/fnxt8x3-uNLTpsKKl7nku5RHbTU=/400x267/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/elfinanciero/XTYNPUDDSZFKRK2MG3NL7KNJA4.jpeg' },
            { nombre: 'Agua Fresca', descripcion: 'Agua de sabor natural de frutas.', precio: 40, imagen: 'https://www.cookingclassy.com/wp-content/uploads/2021/07/aqua-fresca-22.jpg' },
            { nombre: 'Cerveza Artesanal', descripcion: 'Cerveza artesanal local.', precio: 80, imagen: 'https://topbeer.mx/wp-content/uploads/2022/08/tipos-de-cerveza-en-beer-flight-1024x683.jpg' }
        ]
    };

    function addToCart(item) {
        if (cart[item.nombre]) {
            cart[item.nombre].cantidad++;
        } else {
            cart[item.nombre] = { ...item, cantidad: 1 };
        }
        updateCart();
    }

    function removeFromCart(item) {
        if (cart[item.nombre].cantidad === 1) {
            delete cart[item.nombre];
        } else {
            cart[item.nombre].cantidad--;
        }
        updateCart();
    }

    function updateCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;

        Object.values(cart).forEach(item => {
            total += item.precio * item.cantidad;
            const listItem = document.createElement('li');
            listItem.textContent = `${item.nombre} x ${item.cantidad} - $${item.precio * item.cantidad} MXN`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar';
            removeButton.addEventListener('click', function() {
                removeFromCart(item);
            });
            listItem.appendChild(removeButton);
            cartItemsElement.appendChild(listItem);
        });

        totalElement.textContent = `Total: $${total} MXN`;
    }

    function createMenuItems(category, containerId) {
        const container = document.getElementById(containerId);
        menuData[category].forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item-menu');
            itemDiv.dataset.name = item.nombre;
            itemDiv.dataset.price = item.precio;
            itemDiv.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}">
                <p>${item.nombre} - $${item.precio} MXN</p>
                <p>${item.descripcion}</p>
            `;
            itemDiv.addEventListener('click', function() {
                addToCart(item);
            });
            container.appendChild(itemDiv);
        });
    }

    createMenuItems('entradas', 'entradas');
    createMenuItems('platosFuertes', 'platosFuertes');
    createMenuItems('postres', 'postres');
    createMenuItems('bebidas', 'bebidas');

    confirmarCompraButton.addEventListener('click', function() {
        if (customerNameInput.value.trim() === '') {
            alert('Por favor, ingrese su nombre para confirmar la compra.');
            return;
        }

        const pedido = {
            nombreCliente: customerNameInput.value.trim(),
            items: Object.values(cart)
        };

        fetch('/pedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        }).then(() => {
            cart = {}; // Vacía el carrito después de confirmar la compra
            updateCart(); // Actualiza el carrito en la interfaz
            notificationElement.classList.remove('hidden');
            setTimeout(function() {
                notificationElement.classList.add('hidden');
            }, 3000);
        }).catch((error) => {
            console.error('Error:', error);
        });
    });
});
