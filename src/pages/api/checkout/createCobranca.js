import { Agent } from "https";
import axios from "axios";
import { readFileSync } from "fs";
import path from 'path'

export default async function handler(req, res) {
    const valor_cobranca = req.body.valor_cobranca + '.00'
    const CPF = ((req.body.CPF).replaceAll('.', '')).replaceAll('-', '')
    let nome = ''
    await fetch('http://localhost:3000/api/firebase/getUser').then(res => res.json()).then(res => nome = res)
    console.log(nome);
    async function getToken() {
        const certificado = readFileSync(path.join(process.cwd()) + '/SenaiProd.p12');
        const credenciais = {
            client_id: process.env.GN_CLIENT_ID,
            client_secret: process.env.GN_CLIENT_SECRET,
        };

        const data = JSON.stringify({ grant_type: "client_credentials" });
        const data_credentials = credenciais.client_id + ":" + credenciais.client_secret;

        const auth = Buffer.from(data_credentials).toString("base64");

        const agent = new Agent({
            pfx: certificado,
            passphrase: "",
        });

        const config = {
            method: "POST",
            url: "https://api-pix.gerencianet.com.br/oauth/token",
            headers: {
                Authorization: "Basic " + auth,
                "Content-Type": "application/json",
            },
            httpsAgent: agent,
            data,
        };

        const result = await axios(config)
        return result.data

    }

    async function createCobranca(access_token) {
        const certificado = readFileSync(path.join(process.cwd()) + '/SenaiProd.p12');

        const data = JSON.stringify({
            calendario: {
                expiracao: 3600,
            },
            devedor: {
                nome: "Lucas Macharete",
                cpf: CPF,
            },
            valor: {
                original: valor_cobranca
            },
            chave: '6c857e0b-fca3-436a-9486-8c3db3fabe64',
            solicitacaoPagador: 'Pagar até uma hora'
        });


        const agent = new Agent({
            pfx: certificado,
            passphrase: "",
        });

        const config = {
            method: "POST",
            url: "https://api-pix.gerencianet.com.br/v2/cob",
            headers: {
                Authorization: "Bearer " + access_token,
                "Content-Type": "application/json",
            },
            httpsAgent: agent,
            data,
        };

        const result = await axios(config)
        return result
    }


    async function getLoc(access_token, locID) {
        const certificado = readFileSync(path.join(process.cwd()) + '/SenaiProd.p12');
        const agent = new Agent({
            pfx: certificado,
            passphrase: "",
        });
        const config = {
            method: "GET",
            url: "https://api-pix.gerencianet.com.br/v2/loc/"+locID+'/qrcode',
            headers: {
                Authorization: "Bearer " + access_token,
                "Content-Type": "application/json",
            },
            httpsAgent: agent,
        };
        const result = await axios(config)
        return result
    }
    const { access_token } = await getToken()
    const cobranca = await createCobranca(access_token)
    const qrcode = await getLoc(access_token, cobranca.data.loc.id)
    res.send(qrcode.data)
}
