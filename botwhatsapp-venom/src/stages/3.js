import { VenomBot } from '../venom.js'
import { storage } from '../storage.js'
import { STAGES } from './index.js'


// async function insertIntoDatabase(problem, address, protocolNumber, phone) {
//   let connection;
  
//   try {
//     connection = await oracledb.getConnection(dbconfig);
//     const result = await connection.execute(
//       `INSERT INTO t_cev_problemasRelatados (ds_problema, ds_endereco, nr_protocolo, nr_telefone)
//        VALUES (:problem, :address, :protocolNumber, :phone)`,
//       {
//         problem: problem,
//         address: address,
//         protocolNumber: protocolNumber,
//         phone: phone,
//       },
//       { autoCommit: true } // Commit automático para salvar os dados
//     );
    
//     console.log('Dados inseridos no banco de dados com sucesso!', result);
//   } catch (err) {
//     console.error('Erro ao inserir dados no banco de dados:', err);
//   } finally {
//     if (connection) {
//       try {
//         await connection.close();
//       } catch (err) {
//         console.error('Erro ao fechar a conexão com o banco de dados:', err);
//       }
//     }
//   }
// }

export const stageThree = {
  async exec({ from, message }) {
    storage[from].address = message

    let msg = '🔴 Atendimento *CANCELADO* com sucesso.'
    if (message === '*') {
      storage[from].stage = STAGES.INICIAL
    } else {
      const itens = storage[from].itens
      const problem = itens.map((item) => item.description).join(', ')
      const protocolNumber = Math.floor(Math.random() * 9000000000) + 1000000000
      const phone = from.split('@')[0]
      const total = storage[from].itens.length

      // await insertIntoDatabase(problem, message, protocolNumber, phone);

      msg =
        `🗒️ *RESUMO DO ATENDIMENTO*: \n\n ⚠️ Problema Relatado: *${problem}* \n📍 Endereço: *${message}* \n 📃Numero do protocolo do atendimento: *${protocolNumber}* \n 📞Numero de telefone: *${phone}* \n` +
        '🔊 Obrigado por relatar o seu problema! Vamos fazer o máximo para que em breve seja resolvido'
    }

    await VenomBot.getInstance().sendText({ to: from, message: msg })
  },
}
