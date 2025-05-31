import React from 'react';


const GoogleMap = ({ link }: { link: string }) => {
    console.log(link);

    return (
        <div className='w-full mt-5 md:mt-10 px-1'>
            {link &&
                <div className="flex justify-center items-center rounded-lg h-full bg-gray-100">
                    <div className="w-full md:h-[400px]">
                        <iframe
                            className="w-full h-full rounded-lg"
                            src={link}
                            style={{ border: "0" }}
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            }
        </div>
    );
};

export default GoogleMap;