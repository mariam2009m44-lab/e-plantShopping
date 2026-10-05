import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from './CartSlice';
import './ProductList.css';

function ProductList() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const [addedToCart, setAddedToCart] = useState({});

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15", badge: "Best Seller", rating: 5 },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12", badge: "Popular", rating: 4 },
                { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores and purifies the air.", cost: "$18", badge: "New", rating: 5 },
                { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity to the air and removes toxins.", cost: "$20", badge: "", rating: 4 },
                { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy to care for and effective at removing toxins.", cost: "$17", badge: "", rating: 4 },
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Purifies the air and has healing properties for skin.", cost: "$14", badge: "Best Seller", rating: 5 }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=400", description: "Calming scent, used in aromatherapy.", cost: "$20", badge: "Best Seller", rating: 5 },
                { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?w=400", description: "Sweet fragrance, promotes relaxation.", cost: "$18", badge: "Popular", rating: 5 },
                { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating scent, often used in cooking.", cost: "$15", badge: "", rating: 4 },
                { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg", description: "Refreshing aroma, used in teas and cooking.", cost: "$12", badge: "New", rating: 4 },
                { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description: "Citrusy scent, relieves stress and promotes sleep.", cost: "$14", badge: "", rating: 4 },
                { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg", description: "Beautiful flowering plant known for its fragrance.", cost: "$22", badge: "Popular", rating: 5 }
            ]
        },
        {
            category: "Insect Repellent Plants",
            plants: [
                { name: "Oregano", image: "https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg", description: "Contains compounds that can deter certain insects.", cost: "$10", badge: "", rating: 4 },
                { name: "Marigold", image: "https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg", description: "Natural insect repellent, also adds color.", cost: "$8", badge: "Best Seller", rating: 5 },
                { name: "Geraniums", image: "https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg", description: "Insect-repelling properties and pleasant scent.", cost: "$20", badge: "Popular", rating: 4 },
                { name: "Basil", image: "https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg", description: "Repels flies and mosquitoes, used in cooking.", cost: "$9", badge: "New", rating: 5 },
                { name: "Catnip", image: "https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg", description: "Repels mosquitoes and attracts cats.", cost: "$13", badge: "", rating: 3 }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
        setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
    };

    const isInCart = (plantName) => {
        return addedToCart[plantName] || cartItems.some(item => item.name === plantName);
    };

    const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const renderStars = (rating) => '⭐'.repeat(rating);

    return (
        <div className="page-wrapper">
            <nav className="navbar">
                <Link to="/" className="navbar-brand">
                    <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="logo" />
                    <div>
                        <h3>Paradise Nursery</h3>
                        <i>Where Green Meets Serenity</i>
                    </div>
                </Link>
                <div className="nav-links">
                    <Link to="/" className="nav-link">🏠 Home</Link>
                    <Link to="/plants" className="nav-link active">🌿 Plants</Link>
                    <Link to="/cart" className="cart-icon-link">
                        🛒 <span className="cart-count">{totalCartCount}</span>
                    </Link>
                </div>
            </nav>

            <div className="products-wrapper">
                {plantsArray.map((category, index) => (
                    <section key={index} className="category-section">
                        <div className="category-header">
                            <h1 className="category-title">{category.category}</h1>
                            <span className="category-count">{category.plants.length} plants</span>
                        </div>
                        <div className="product-grid">
                            {category.plants.map((plant, plantIndex) => (
                                <div className="product-card" key={plantIndex}>
                                    {plant.badge && (
                                        <span className={`product-badge badge-${plant.badge.toLowerCase().replace(' ', '-')}`}>
                                            {plant.badge}
                                        </span>
                                    )}
                                    <img className="product-image" src={plant.image} alt={plant.name} />
                                    <div className="product-name">{plant.name}</div>
                                    <div className="product-rating">{renderStars(plant.rating)}</div>
                                    <div className="product-description">{plant.description}</div>
                                    <div className="product-cost">{plant.cost}</div>
                                    <button
                                        className="product-button"
                                        disabled={isInCart(plant.name)}
                                        onClick={() => handleAddToCart(plant)}
                                    >
                                        {isInCart(plant.name) ? "✓ Added to Cart" : "🛒 Add to Cart"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            <footer className="site-footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>🌿 Paradise Nursery</h3>
                        <p>Where Green Meets Serenity</p>
                    </div>
                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <Link to="/">Home</Link>
                        <Link to="/plants">Plants</Link>
                        <Link to="/cart">Cart</Link>
                    </div>
                    <div className="footer-contact">
                        <h4>Contact Us</h4>
                        <p>📧 mariam2009m44@gmail.com</p>
                        <p>📞 01507938088</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2024 Paradise Nursery. Made with 💚 for plant lovers.</p>
                </div>
            </footer>
        </div>
    );
}

export default ProductList;