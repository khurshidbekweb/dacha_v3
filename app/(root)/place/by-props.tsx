'use client'

interface placeProps {
    paramsId: string
}

export default function ByPlace({ paramsId }: placeProps) {
    return (
        <div>
            {paramsId}
        </div>
    );
};
