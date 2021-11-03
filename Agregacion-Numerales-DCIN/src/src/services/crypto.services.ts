import { Injectable } from '@angular/core';
import * as cryptoSS from 'crypto-js';
import { CIPHER_P } from '../config/api.config';

@Injectable()
export class CryptoService {
    title = 'EncryptionDecryptionSample';  
    
    plainText:string;  
    encryptedText: string;  
    encPassword: string;  
    decPassword:string;  
    conversionEncryptOutput: string;  
    conversionDecryptOutput:string;  

    constructor() {}

    //method used to encrypt
    encryptText(text:string){
        return cryptoSS.AES.encrypt(text, CIPHER_P);
    }

    decryptText(text:string){
        return cryptoSS.AES.decrypt(text, CIPHER_P).toString(cryptoSS.enc.Utf8);
    }
}
