import {  hash, compare } from 'bcryptjs';


export let encriptString = async(string: string) => {
    return await hash(string, 12);
}



