import JSEncrypt from "jsencrypt";

const crypt = new JSEncrypt();
const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA27yUWP4KSeROzRHbfLII
HO1FctyoyCdUCIGXY7WTIAIHwxkHNVegcwyxwCxvdr3HqfhOvtMmlgin+bdPu1tf
fUJo8ETNJCLbjja1ENjZUKaFNCeiPOUmH2eKp4oJQmp11tEXb9TgXXkq8IODhQDo
hkLw/ET+QPi+DnpjGjgngTTzUl7Nsq5NxkIqCCBtv/vmbQQun2hzkn1qLM0laFo/
by41ofgmZOaSgyxsoNnlicSykOVlc0oZcgjAmzO0XOAd5W/1Ne00Meryt4ZuAl9U
jynNFcOa00PQSy1Ge4+yUpaqkXW9xlTpfVAzBAXk5UGh5vXRIXBMw06Wi7u2iw3e
cwIDAQAB
-----END PUBLIC KEY-----`;

const pvtKey = `-----BEGIN RSA PRIVATE KEY-----
MIICWAIBAAKBgFludtQX0ozulEWQDPkFWIeQF7edn6V1b4zZxDmdfniQ91dMGKJm
sHHE19vGQKe6ozuD02wOBEpXvp3MP80rWsrvGkYJ9EVp0JK7Iu9PeQ3WAb6H4FMB
SBwlJwK8NFhA+V8kdfuHt9idqVVPaDX6QK4mV1W0P99VWtJuNxWCVYB5AgMBAAEC
fx1YIaV2K6ASqJQqsBcFqgbRQPb+wWOJJRESY1CEXPsylfYPAgZHq52o+Ssj4hMn
Kmhc2QKblszN/b3JRyYLE78fXlktA9e4K6iBH1pKiVqDAypzigx8N87Oj8kpK9VI
zTqCGD0NmogP3tJmVU+9ace1dxnFrR2vH6BAIr2sGdECQQCb3riScZNkezyJhixG
XdJKNfbYBqYBSACSa/v36ljlb5BuD3p+AYumXefYLaU72slKISnKghN/A/o5iUQg
jiwDAkEAkuG8kdTsvCZ4tVQN9yiBfn2GRhUao8JDHcuBhGuKKNd7e4K0ZZ8vgkKj
f+YcthgeZJtSzv4jHsCQ+HPwcX++0wJAShENl9kMdwTwgVEWnOFcWhNGluSh4Z37
V5ikhOwBDhVzhjkotdO6LnYVA269Q7H1UJptp2MkLIkRUGHf07B7TQJARx2awnT4
ZiSuXwUied+XyxmVkIsZSd59xohI3kd/LkUemW9wTp+jTgtbxEoy7ouA868sieIM
ORB9YH4qFZoHVwJAVAic7C8M9+d9aHMINE4JKBFpM4iPA+WfWW0ndi3oUBXd5wea
2Wn+0jUktZlCq8nJ7+tRcf84dtcfGcnlnjI0gg==
-----END RSA PRIVATE KEY-----`;

export const decryption = (toDecrypt) => {
  crypt.setPrivateKey(pvtKey);
  const decrypted = crypt.decrypt(toDecrypt);
  return decrypted;
};

export const mergedEncryption = (toEncrypt) => {
  crypt.setKey(publicKey);
  const encrypted = crypt.encrypt(JSON.stringify(toEncrypt));
  return encrypted;
};
