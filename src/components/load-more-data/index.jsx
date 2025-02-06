import { useEffect, useState } from "react";
import InfoIcon from '../infoIcon/InfoIcon';

export default function LoadMoreData() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(8);
    const [disableButton, setDisableButton] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [sortOption, setSortOption] = useState("recommendations");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch("https://fakestoreapi.com/products");
                const result = await response.json();
                setProducts(result);

                if (result.length <= visibleProducts) {
                    setDisableButton(true);
                }
            } catch (e) {
                console.error("Error fetching products:", e);
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products/categories");
                const categoriesResult = await response.json();
                setCategories(categoriesResult);
            } catch (e) {
                console.error("Error fetching categories:", e);
            }
        };

        fetchProducts();
        fetchCategories();
    }, [visibleProducts]);

    const handleLoadMore = () => {
        const newVisibleCount = visibleProducts + 8;
        if (newVisibleCount >= products.length) {
            setDisableButton(true);
        }
        setVisibleProducts(newVisibleCount);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(category)
                ? prevSelected.filter((item) => item !== category)
                : [...prevSelected, category]
        );
    };

    const handlePriceChange = (e) => {
        setPriceRange([Number(e.target.value), priceRange[1]]);
    };

    const handlePriceRangeEnd = (e) => {
        setPriceRange([priceRange[0], Number(e.target.value)]);
    };

    const handleRatingChange = (rating) => {
        setSelectedRatings((prevSelected) =>
            prevSelected.includes(rating)
                ? prevSelected.filter((item) => item !== rating)
                : [...prevSelected, rating]
        );
    };

    const handleClearFilters = () => {
        setSelectedCategories([]);
        setPriceRange([0, 1000]);
        setSelectedRatings([]);
    };

    const handleApplyFilters = () => {
        // Apply the filters and close the modal
        setIsModalOpen(false);
    };

    useEffect(() => {
        // Filter products whenever any filter state changes
        const filtered = products.filter((product) => {
            const isInCategory =
                selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const isInPriceRange =
                product.price >= priceRange[0] && product.price <= priceRange[1];
            const matchesRating =
                selectedRatings.length === 0 || selectedRatings.includes(Math.floor(product.rating.rate));

            return isInCategory && isInPriceRange && matchesRating;
        });

        setFilteredProducts(filtered);
    }, [selectedCategories, priceRange, selectedRatings, products]);

    const renderStars = (count) => {
        return Array(count)
            .fill("★")
            .join("");
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const sortedProducts = sortOption === "recommendations"
        ? filteredProducts
        : [...filteredProducts].sort((a, b) => {
            switch (sortOption) {
                case "priceLowToHigh":
                    return a.price - b.price;
                case "priceHighToLow":
                    return b.price - a.price;
                case "ratingLowToHigh":
                    return a.rating.rate - b.rating.rate;
                case "ratingHighToLow":
                    return b.rating.rate - a.rating.rate;
                default:
                    return 0;
            }
        });

    return (
        <div className="shop-cart">
            <InfoIcon pageName="productList" />
             
            <div className="hero-image relative bg-cover bg-center bg-no-repeat bg-opacity-30 h-[50%] p-[16%] bg-shop-mob md:bg-shop-desk md:top-[75px] top-[85px]" onLoad={(e) => (e.currentTarget.style.opacity = 1)}>
                <div className="hero-text w-[50%] absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-[5vw]">
                    <h1 className="font-lobster text-3xl md:text-7xl">Haven Concepts</h1>
                    <p className="md:text-base text-xs uppercase font-dosis text-black font-bold">Shop Bestsellers Now</p>
                </div>
            </div>

            <div className="md:flex inline-block md:flex-row flex-row-reverse justify-evenly md:top-[75px] top-[45px] pl-[5px] relative overflow-visible md:w-[90%] md:mx-auto">
                {isMobile ? (
                    <div className="mobile-filters-container top-[62px] absolute right-0 w-[40%] z-1">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-black text-white py-2 px-4 rounded font-dosis uppercase font-semibold w-[95%]">
                            Filters
                        </button>
                    </div>
                ) : (
                    <div id="filter-container"  className={`filter-more-data-container sticky pt-68 self-start transition-all duration-300 md:top-[60px] top-[62px] md:pr-10 md:w-[430px]`}>
                        <div className="flex justify-between">
                            <h3 className="font-dosis capitalize font-medium">Filter By:</h3>
                            <button
                                onClick={handleClearFilters}
                                className="text-black rounded font-dosis uppercase font-semibold text-sm hover:text-gray-500 ">
                                Clear All
                            </button>
                        </div>

                        {/* Categories */}  
                        <h4 className="font-dosis uppercase font-bold mt-4">Categories</h4>
                        <div className="flex flex-col gap-2 mt-2">
                            {categories.map((category) => (
                                <label key={category} className="flex items-center gap-2 font-dosis">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox text-blue-600"
                                        onChange={() => handleCategoryChange(category)}
                                        checked={selectedCategories.includes(category)}
                                    />
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </label>
                            ))}
                        </div>

                        {/* Price */}
                        <h4 className="font-dosis uppercase font-bold mt-4">Price</h4>
                        <div className="flex flex-col gap-2 mt-2">
                            <label className="font-dosis">
                                Min Price: £{priceRange[0]}
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    step="10"
                                    value={priceRange[0]}
                                    onChange={handlePriceChange}
                                    className="w-full mt-2"
                                />
                            </label>
                            <label className="font-dosis">
                                Max Price: £{priceRange[1]}
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    step="10"
                                    value={priceRange[1]}
                                    onChange={handlePriceRangeEnd}
                                    className="w-full mt-2"
                                />
                            </label>
                        </div>

                        {/* Ratings */}
                        <h4 className="font-dosis uppercase font-bold mt-4">Customer Rating</h4>
                        <div className="flex flex-col gap-2 mt-2">
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <label key={rating} className="flex items-center gap-2 font-dosis">
                                    <input
                                        type="checkbox"
                                        value={rating}
                                        checked={selectedRatings.includes(rating)}
                                        onChange={() => handleRatingChange(rating)}
                                    />
                                    <span>{renderStars(rating)}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                <div className="load-more-data-container relative md:top-[60px] top-[62px] flex flex-col gap-5">
                    {loading && <div>Loading Data! Please wait...</div>}

                    <div className="sort-by-container mb-4">
                        <label className="font-dosis uppercase font-bold mr-2">Sort By:</label>
                        <select
                            value={sortOption}
                            onChange={handleSortChange}
                            className="border p-2 rounded font-dosis">
                            <option value="recommendations">Recommendations</option>
                            <option value="priceLowToHigh">Price: Low to High</option>
                            <option value="priceHighToLow">Price: High to Low</option>
                            <option value="ratingLowToHigh">Rating: Low to High</option>
                            <option value="ratingHighToLow">Rating: High to Low</option>
                        </select>
                    </div>

                    <div className="product-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {sortedProducts.slice(0, visibleProducts).map((item) => (
                            <div className="product font-dosis p-4 flex flex-col text-center items-center gap-2.5 text-xs" key={item.id}>
                                <img className="w-full h-[200px] object-contain" src={item.image} alt={item.title} />
                                <div className="flex flex-col text-left mt-2">
                                    <p className="font-extrabold">£{item.price.toFixed(2)}</p>
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-sm text-gray-500 mt-1">Rating: {item.rating.rate} ({item.rating.count} reviews)</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="button-container mx-auto pb-10">
                        {!disableButton && filteredProducts.length > visibleProducts ? (
                            <button
                                className="bg-black text-white uppercase py-2 px-4 rounded hover:bg-blue-600 font-dosis font-semibold text-sm"
                                onClick={handleLoadMore}>
                                Load More Products
                            </button>
                        ) : (
                            <p className="text-gray-500">You have reached all products</p>
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-3">
                    <div className="modal-content bg-white p-6 rounded">
                        <h3 className="font-dosis capitalize font-medium">Filter By:</h3>
                        <button
                            onClick={handleClearFilters}
                            className="text-black rounded font-dosis uppercase font-semibold text-sm hover:text-gray-500">
                            Clear All
                        </button>

                        {/* Categories */}
                        <h4 className="font-dosis uppercase font-bold mt-4">Categories</h4>
                        <div className="flex flex-col gap-2 mt-2">
                            {categories.map((category) => (
                                <label key={category} className="flex items-center gap-2 font-dosis">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox text-blue-600"
                                        onChange={() => handleCategoryChange(category)}
                                        checked={selectedCategories.includes(category)}
                                    />
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </label>
                            ))}
                        </div>

                        {/* Price */}
                        <h4 className="font-dosis uppercase font-bold mt-4">Price</h4>
                        <div className="flex flex-col gap-2 mt-2">
                            <label className="font-dosis">
                                Min Price: £{priceRange[0]}
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    step="10"
                                    value={priceRange[0]}
                                    onChange={handlePriceChange}
                                    className="w-full mt-2"
                                />
                            </label>
                            <label className="font-dosis">
                                Max Price: £{priceRange[1]}
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    step="10"
                                    value={priceRange[1]}
                                    onChange={handlePriceRangeEnd}
                                    className="w-full mt-2"
                                />
                            </label>
                        </div>

                        {/* Ratings */}
                        <h4 className="font-dosis uppercase font-bold mt-4">Customer Rating</h4>
                        <div className="flex flex-col gap-2 mt-2">
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <label key={rating} className="flex items-center gap-2 font-dosis">
                                    <input
                                        type="checkbox"
                                        value={rating}
                                        checked={selectedRatings.includes(rating)}
                                        onChange={() => handleRatingChange(rating)}
                                    />
                                    <span>{renderStars(rating)}</span>
                                </label>
                            ))}
                        </div>

                        <button
                            onClick={handleApplyFilters}
                            className="bg-blue-600 text-white py-2 px-4 rounded font-dosis uppercase font-semibold mt-4">
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}