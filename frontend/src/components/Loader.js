import React from 'react';
import { ColorRing } from 'react-loader-spinner';



function Loader(props) {
    return (
        <div className='flex justify-center items-center h-full'>
            <ColorRing
            visible={true}
            height="100%"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#00000','#00000','#00000','#00000','#00000']}
          />
        </div>

    );
}

export default Loader;