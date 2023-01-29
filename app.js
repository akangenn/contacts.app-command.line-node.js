const { demand, demandCommand } = require("yargs");
const yargs = require("yargs");
const contacts = require('./contacts');

yargs.command({
    command: 'add',
    describe: 'Menambahkan Contact Baru',
    builder : {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: "string",
        },
        email: {
            describe: "Email",
            demandOption: true,
            type: "string",
        },
        noHP: {
            describe: "Nomor Handphone",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        console.log(argv.nama)
        contacts.simpanContact (argv.nama, argv.email, argv.noHP);
    },
}).demandCommand();

// menampilkan daftar semua nama dan no hp contact

yargs.command({
    command: 'list',
    describe: 'Menampilakan semua nama, email, dan no HP contact',
    handler() {
        contacts.listContact();
    },
});

// menampilkan detail sebuah kontak

yargs.command({
    command: 'detail',
    describe: 'Menampilakan detail sebuah contact berdasarkan nama',
    builder : {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        contacts.detailContact(argv.nama);
    },
});

// menghapuskan contact berdasarkan nama

yargs.command({
    command: 'delete',
    describe: 'Menghapus sebuah contact berdasarkan nama',
    builder : {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        contacts.deleteContact(argv.nama);
    },
});



yargs.parse();
