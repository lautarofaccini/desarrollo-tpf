import {createPool} from 'mysql2/promise'

export const pool = new createPool({
    host: "172.29.190.180",
    port: 3306,
    user: 'facundo',
    password: 'root',
    database: 'desarrollo_tpf'
})
