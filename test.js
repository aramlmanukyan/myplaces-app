const jwt = require('jsonwebtoken');

const key = '6a3014f6-7a01-43cd-ae57-8151fcb18edf';

const decoded = jwt.verify('eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImRsYXM5MTJqc2RsOTEybCIsInRva2VuIjoidmFsaWQtdG9rZW4ifQ.nGpT76FuXItZieDvkZiMGkMwEY0Vv0oLbmviOUMcD2Q', key);
console.log(decoded);