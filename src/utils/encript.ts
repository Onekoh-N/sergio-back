import {  hash, compare } from 'bcryptjs';


export let encriptString = async(string: string) => {
    return await hash(string, 12);
}

export let compareHash = async(hash: string, storedHash: string) => {
    return await compare(hash, storedHash);
}
