import bycript from 'bcryptjs'

const saltRound = 10

export async function hashedPassword(password) {
    try {
        const hash = await bycript.hash(password, saltRound)
        return hash
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Error hashing password');
    }
}

export const comparePassword = async ( password, hashedPassword) => {
    try {
        const match = await bycript.compare(password, hashedPassword)
        return match
    } catch (error) {
        console.error('Error comparing password:', error);
        throw new Error('Error comparing password');
    }
}