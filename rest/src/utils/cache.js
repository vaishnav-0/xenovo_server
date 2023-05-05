const Memcached = require('memcached');




const memcached = new Memcached()


memcached.connect('127.0.0.1:11211', function (err, conn) {
    if (err) {
        console.log(err)
        throw new Error(err);
    }
    // console.log(conn)
     console.log(conn.server);
});




module.exports = memcached;