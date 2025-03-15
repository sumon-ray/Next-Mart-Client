import Category from '@/components/module/shop/category';
import { DataTable } from '@/components/ui/core/ReusableTable/DataTable';
import { getAllCategoryData } from '@/services/category';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

const ShopCategory = async() => {
    const res = await getAllCategoryData()
    // const columns: ColumnDef<Payment>[] = [
    //     {
    //       accessorKey: "status",
    //       header: "Status",
    //     },
    //     {
    //       accessorKey: "email",
    //       header: "Email",
    //     },
    //     {
    //       accessorKey: "amount",
    //       header: "Amount",
    //     },
    //   ]
    return (
        <div>
          <Category data={res.data} />
        </div>
    );
};

export default ShopCategory;