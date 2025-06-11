import React, { Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import { breadcrambs } from '@/types';

interface Props {
    data: breadcrambs[],
    page: string
}

const BreadCrumbs = (props: Props) => {

    return (
        <div className="max-w-[1540px] mx-auto px-2 md:px-5 xl:px-14">
            <Breadcrumb className='mt-2 md:mt-3'>
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
        </div>
    );
};

export default BreadCrumbs;