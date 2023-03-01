openssl req -x509 -nodes -days 365 -newkey rsa:4096 -keyout cert.key -out cert.pem -config req.cnf -sha256
