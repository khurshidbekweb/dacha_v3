import AddNewPage from '@/section/add-new/add-new';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Add New | DachaOL",
    description: "Reginter in this page",
};

const AddNew = () => {
    return <AddNewPage />
};

export default AddNew;