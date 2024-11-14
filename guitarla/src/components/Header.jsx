function Header({ cart, removeFromCart, increaseQuantity, decreaseQuantity, setCart, isEpmty, cartTotal}) {

    const payOrder = async () => {
        const url = 'http://10.1.1.43:3000/create-order';
        
        const order = cart.map(guitar => {
            return {
                price: guitar.price,
                name: guitar.name
            }
        });

        const body = {
            orderBody: order
        }

        const parmeters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        try{
            const response = await fetch(url, parmeters)
            const data = await response.json()
            window.location.href = data.links[1].href
        }catch(error){
            console.error(error)
        }
    };

  return (
    <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html" className="text-inteline-none text-xl text-center justify-content-center row hover:bg-gray-200 transition">
                        <span className="font-bold text-sm text-inteline-none">TUS VIDEOJUEGOS</span>
                        <span className="text-inteline-none text-5xl font-bold text-purple">.com</span>
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div 
                        className="carrito"
                    >
                        <img className="img-fluid" src="./img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" className="bg-white p-3">
                            {isEpmty ? (
                                <p className="text-center">El carrito esta vacio</p>
                            ): (
                                <>
                                    <table className="w-100 table">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map( guitar =>(  
                                                <tr key={guitar.id}>
                                                    <td>
                                                        <img className="img-fluid" src={`./img/${guitar.image}.jpg`} alt="imagen guitarra" />
                                                    </td>
                                                    <td>{guitar.name}</td>
                                                    <td className="fw-bold">
                                                            ${guitar.price}
                                                    </td>
                                                    <td className="flex align-items-start gap-4">
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            onClick={() => decreaseQuantity(guitar.id)}
                                                        >
                                                            -
                                                        </button>
                                                            {guitar.quantity}
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            onClick={() => increaseQuantity(guitar.id)}
                                                        >
                                                            +
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger"
                                                            type="button"
                                                            onClick={() => removeFromCart(guitar.id)}
                                                        >
                                                            X
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <button onClick={payOrder} style={{padding: '1', textAlign: 'center', color: 'white', borderRadius: '0.25rem', outline: 'none', border: 'solid 2px #0295CC', background: '#24C1FD', fontWeight: 'bold', cursor: 'pointer'}}>Pagar</button>
                                        <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>
                                    </div>
                                </>
                            )}
                                          
                            <button 
                                className="btn btn-dark w-100 mt-3 p-2"
                                onClick={() => setCart([])}
                            >
                                Vaciar Carrito
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
  )
}

export default Header
