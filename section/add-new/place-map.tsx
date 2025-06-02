import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const PlaceMap = () => {
    const { control } = useFormContext();
    return (
        <div>
            <FormField
                control={control}
                name="cottageName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Cottage Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Cottage Name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default PlaceMap;