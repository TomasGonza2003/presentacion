import api from './api';

const getAllProducts = () => {
    return api.get('/products');
};

const getProductById = (id) => {
    return api.get(`/products/${id}`);
};

const ProductService = {
    getAllProducts,
    getProductById,
};

export default ProductService;
