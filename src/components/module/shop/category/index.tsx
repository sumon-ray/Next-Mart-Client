import { DataTable } from '@/components/ui/core/ReusableTable/DataTable';
import CategoryForm from './CategoryForm';

const Category = async({data}) => {
    console.log(data)
    return (
        <div className='flex justify-around'>
            <h1>Category</h1>
            <CategoryForm />
             {/* <DataTable  /> */}
        </div>
    );
};

export default Category;