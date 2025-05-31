import React, { Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import { breadcrambs } from '@/types';

interface Props {
    data: breadcrambs[],
    page: string
}

const BreadCrumbs = (props: Props) => {

    return (
        <Breadcrumb className='my-3 px-1 md:px-5 xl:px-16'>
            <BreadcrumbList>
                {props.data.map(el => (
                    <Fragment key={el.slug}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/${el.slug}`}>{el.title}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </Fragment>
                ))}
                <BreadcrumbItem>
                    <BreadcrumbPage>{props.page}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>

    );
};

export default BreadCrumbs;