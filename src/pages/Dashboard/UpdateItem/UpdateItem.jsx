import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useLoaderData } from 'react-router-dom';

const UpdateItem = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            <SectionTitle heading='update Item' subHeading='Refresh info' ></SectionTitle>
        </div>
    );
};

export default UpdateItem;