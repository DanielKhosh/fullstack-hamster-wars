import { atom } from 'recoil'
import { Hamster } from '../models/Hamster'

const hamsters = atom<Hamster[]>({
    key: 'hamsters',
    default: []
})

export default hamsters