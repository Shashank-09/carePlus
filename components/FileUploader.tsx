'use clent';

import { convertFileToUrl } from '@/lib/utils';
import Image from 'next/image';
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

type FileUploaderProps = {
    files: File[] | undefined,
    onChange: (files: File[]) => void
}

 const FileUpload =({files , onChange} : FileUploaderProps)  => {
  const onDrop = useCallback((acceptedFiles : File[]) => {
    // Do something with the files
    onChange(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='file-upload'>
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image 
            src={convertFileToUrl(files[0])}
            height={1000}
            width={1000}
            alt="uploaded image"
            className='max-h-[400px] overflow-hidden object-cover'
        />
      ) : (
        <>
         <Image 
            src='/assets/icons/upload.svg'
            height={40}
            width={40}
            alt="upload"
         />
         <div>
             jbkjblkkb
         </div>
         </>
      )}
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default FileUpload