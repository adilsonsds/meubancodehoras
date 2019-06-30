const functions = require('firebase-functions')
const moment = require('moment')
const admin = require('firebase-admin')
admin.initializeApp();

exports.contarSaldoNoBancoDeHoras = functions.firestore
    .document('usuarios/{usuarioId}/diasDeTrabalho/{diaDeTrabalhoId}')
    .onWrite(async (change, context) => {

        if (!change.after.exists)
            throw new Error('Não foi possível calcular, pois o arquivo foi excluído')

        const saldoAnterior = change.before.exists ? change.before.data().quantoTabalharMenosQuantoTrabalho : 0;
        const novoSaldo = change.after.data().quantoTabalharMenosQuantoTrabalho;
        const valorParaAplicar = novoSaldo - saldoAnterior;

        const usuarioRef = change.after.ref.parent.parent;

        try {
            await admin.firestore().runTransaction(async transaction => {
                const sfDoc = await transaction.get(usuarioRef);
                if (!sfDoc.exists)
                    throw new Error("Documento inexistente");
                var novoSaldo_1 = sfDoc.data().saldoBancoDeHoras + valorParaAplicar;
                transaction.update(usuarioRef, { saldoBancoDeHoras: novoSaldo_1 });
            });
            return console.log('Saldo atualizado com sucesso');
        }
        catch (error) {
            return console.log('Ops. ', error);
        }
    })