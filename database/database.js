import { createConnection } from 'mysql2/promise'

export const connection = await createConnection({
  host: '', // O host do banco. localhost
  user: '', // Usuário do banco criado anteriormente. <username>
  password: '', // A senha do usuário do banco. <password>
  database: '' // O banco de dados ao qual a aplicação irá se conectar.
})
