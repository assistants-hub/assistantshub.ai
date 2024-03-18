import Image from 'next/image';
import React from 'react';

export default function UserLocation(props: { metadata?: any }) {
  let location = '';
  if (props.metadata && props.metadata.city) {
    location = props.metadata.city;
  }
  let country =
    props.metadata && props.metadata.country ? props.metadata.country : '';
  if (country) {
    if (location) location += ', ';
    location += country;
  }

  return (
    <div className='items-between flex justify-center'>
      {country ? (
        <div className='self-center'>
          <Image
            alt={`${country} flag`}
            className='mr-4 rounded-full'
            src={`https://flagcdn.com/96x72/${country.toLowerCase()}.png`}
            // src={`https://flagcdn.com/${country.toLowerCase()}.svg`}
            width={32}
            height={32}
          />
        </div>
      ) : (
        <></>
      )}
      <div className='mr-auto text-left'>
        <h5 className='text-gray-700'>{location ? location : 'Unknown'}</h5>
      </div>
    </div>
  );
}
