import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { postCottage } from '@/types';
import React from 'react';
import { useFormContext } from 'react-hook-form';
interface infoProps {
    cottage: postCottage;
    setCottage: React.Dispatch<React.SetStateAction<postCottage>>;
}


const PlaceMap = ({ cottage, setCottage }: infoProps) => {
    const { control } = useFormContext();
    return (
        <div className='px-2'>
            <h1>Asosiy ma`lumotlar</h1>
            <FormField
                control={control}
                name="cottageName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Cottage Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Cottage Name" {...field}
                            // onChange={(e) => {
                            //     field.onChange(e)
                            //     setCottage({ ...cottage, cottageName: e.target.value })
                            // }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default PlaceMap;