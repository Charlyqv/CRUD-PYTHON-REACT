import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export const ValidCer = () => {

    // const FormData = require('form-data');

    const [showPassword, setShowPassword] = useState(false);

    const [errorCer, setErrorCer] = useState('');
    const [errorKey, setErrorKey] = useState('');
    const [errorPdf, setErrorPdf] = useState('');

    const [cerFile, setCerFile] = useState(null);
    const [keyFile, setKeyFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [pass, setPass] = useState(null);

    // Validación para el archivo .cer
    
    const handleCerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['application/x-x509-ca-cert'];
            if (!allowedTypes.includes(file.type) && !file.name.endsWith('.cer')) {
                setErrorCer('Por favor, selecciona un archivo .cer válido.');
                e.target.value = ''; 
            } else {
                setCerFile(file);
                setErrorCer('');
            }
        }
    };

    // Validación para el archivo .key
    const handleKeyChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.name.endsWith('.key')) {
                setErrorKey('Por favor, selecciona un archivo .key válido.');
                e.target.value = ''; 
            } else {
                setKeyFile(file);
                setErrorKey('');
            }
        }
    };

    const handlePdfChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.name.endsWith('.pdf')) {
                setErrorPdf('Por favor, selecciona un archivo .pdf válido.');
                e.target.value = ''; 
            } else {
                setPdfFile(file);
                setErrorPdf('');
            }
        }
    };

    const handleValidate = (e) => {
     
        const passwordValue = document.getElementById('pass').value;
        setPass(passwordValue);

        if (!cerFile || !keyFile) {
            console.error('❌ Ambos archivos (cer y key) deben ser seleccionados.');
            return;
        }

        const form = new FormData();
        form.append('archivo', pdfFile);
        form.append('cer', cerFile);
        form.append('key', keyFile);
        form.append('contrasena', passwordValue);

        console.log('Archivo:', pdfFile);
        console.log('Certificado:', cerFile);
        console.log('Key:', keyFile);
        console.log('Contraseña:', passwordValue);
        
        axios.post('http://127.0.0.1:8000/api/validar-certificado', form, {
            responseType: 'blob'
        })
        .then(response => {
            if (response.headers['content-type'].includes('application/json')) {
                const reader = new FileReader();
                reader.onload = () => {
                    console.log('Respuesta como JSON:', JSON.parse(reader.result));
                };
                reader.readAsText(response.data);
                return;
            }
        
            // Blob válido → descargar
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'archivo_firmado.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
                            
            Swal.fire({
                icon: 'success',
                title: 'Certificado válido',
                text: 'El archivo ha sido generado correctamente.',
            });
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al procesar el certificado.',
            });
        });                 

    }


  return (
    <div className='flex flex-col gap-2'>
        <h1 className='text-center text-2xl font-bold'>Validar certificados</h1>

        <div className="flex items-center gap-4">
            <p className='text-center'>Archivo</p>
            <input 
                type="file" 
                placeholder='' 
                accept=".pdf" 
                className='border-2 border-gray-300 rounded-md p-2'
                onChange={handlePdfChange}
                />
        </div>
        <div className="flex items-center gap-4">
            <p className='text-center'>Certificado</p>
            <input 
                type="file" 
                placeholder='' 
                accept=".cer" 
                className='border-2 border-gray-300 rounded-md p-2'
                onChange={handleCerChange}
                />
        </div>
        <div className="flex items-center gap-4">
            <p className='text-center'>Key</p>
            <input 
                type="file" 
                placeholder='' 
                accept=".key" 
                className='border-2 border-gray-300 rounded-md p-2'
                onChange={handleKeyChange}
                />
        </div>
        <div className="flex items-center gap-4">
            <p className='text-center'>Contraseña</p>
            <div className='relative 
            w-64 
            '>
                <input 
                    type={showPassword ? "text" : "password"} 
                    id='pass' 
                    className='text-black border-2 border-gray-300 rounded-md p-2' 
                />
                <span 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    <i className={showPassword ? 'fa-solid fa-lock-open' : 'fas fa-lock'}></i>
                </span>
            </div>
        </div>

        <button 
            className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'
            onClick={handleValidate}
        >Validar</button>

    </div>
  )
}