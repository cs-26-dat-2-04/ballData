'use client'
import {useSearchParams} from 'next/navigation'

export default function Players()
{
    const searchParams = useSearchParams();
    const search = searchParams.get('id');
    return (
        <p>{search}</p>
    );
}