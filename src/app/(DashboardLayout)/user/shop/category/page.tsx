// "use client" 
import Category from '@/components/module/shop/category';
import { getAllCategoryData } from '@/services/category';

const ShopCategory = async() => {
    const {data,meta}= await getAllCategoryData()
    console.log(data)

    return (
        <div>
          <Category categories={data} />
        </div>
    );
};

export default ShopCategory;