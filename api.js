const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const moment = require("moment")
const md5 = require("md5")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "penyewaan_mobil"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {0
        console.log("MySQL Connected")
    }
})

app.get("/mobil", (req,res) => {
    let sql = "select * from mobil"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message 
            }
        } else {
            response = {
                count: result.length,
                mobil: result
            }
        }
        res.json(response) 
    })
})

app.get("/mobil/:id", (req,res) => {
    let data = {
        id_mobil: req.params.id
    }
    let sql = "select * from mobil where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                mobil: result
            }
        }
        res.json(response)
    })
})

app.post("/mobil", (req,res) => {
    let data = {
        id_mobil: req.body.id_mobil,
        nomor_mobil: req.body.nomor_mobil,
        merk: req.body.merk,
        jenis: req.body.jenis,
        warna: req.body.warna,
        tahun_pembuatan: req.body.tahun_pembuatan,
        biaya_sewa_per_hari: req.body.biaya_sewa_per_hari,
        image: req.body.image
    }

    let sql = "insert into mobil set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

app.put("/mobil", (req,res) => {
    let data = [
        {
            nomor_mobil: req.body.nomor_mobil,
            merk: req.body.merk,
            jenis: req.body.jenis,
            warna: req.body.warna,
            tahun_pembuatan: req.body.tahun_pembuatan,
            biaya_sewa_per_hari: req.body.biaya_sewa_per_hari,
            image: req.body.image
        },
        {
            id_mobil: req.body.id_mobil
        }
    ]
    let sql = "update mobil set ? where ?"
    
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) 
    })
})

app.delete("/mobil/:id", (req,res) => {
    let data = {
        id_mobil: req.params.id
    }
    let sql = "delete from mobil where ?"
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) 
    })
})

app.get("/pelanggan", (req,res) => {
    let sql = "select * from pelanggan"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                pelanggan: result
            }
        }
        res.json(response) 
    })
})

app.get("/pelanggan/:id", (req,res) => {
    let data = {
        id_pelanggan: req.params.id
    }
    let sql = "select * from pelanggan where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                pelanggan: result
            }
        }
        res.json(response)
    })
})

app.post("/pelanggan", (req,res) => {
    let data = {
        id_pelanggan: req.body.id_pelanggan,
        nama_pelanggan: req.body.nama_pelanggan,
        alamat_pelanggan: req.body.alamat_pelanggan,
        kontak: req.body.kontak
    }

    let sql = "insert into pelanggan set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) 
    })
})

app.put("/pelanggan", (req,res) => {

    let data = [
        {
            nama_pelanggan: req.body.nama_pelanggan,
            alamat_pelanggan: req.body.alamat_pelanggan,
            kontak: req.body.kontak
        },
        {
            id_pelanggan: req.body.id_pelanggan
        }
    ]

    let sql = "update pelanggan set ? where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) 
    })
})

app.delete("/pelanggan/:id", (req,res) => {
    let data = {
        id_pelanggan: req.params.id
    }
    let sql = "delete from pelanggan where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

app.get("/karyawan", (req,res) => {
    let sql = "select * from karyawan"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                karyawan: result
            }
        }
        res.json(response)
    })
})

app.get("/karyawan/:id", (req,res) => {
    let data = {
        id_karyawan: req.params.id
    }
    let sql = "select * from karyawan where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message 
            }
        } else {
            response = {
                count: result.length,
                karyawan: result
            }
        }
        res.json(response) 
    })
})

app.post("/karyawan", (req,res) => {
    let data = {
        id_karyawan: req.body.id_karyawan,
        nama_karyawan: req.body.nama_karyawan,
        alamat_karyawan: req.body.alamat_karyawan,
        kontak: req.body.kontak,
        username: req.body.username,
        password: md5(req.body.password)
    }

    let sql = "insert into karyawan set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

app.put("/karyawan", (req,res) => {

    let data = [
        {
            nama_karyawan: req.body.nama_karyawan,
            alamat_karyawan: req.body.alamat_karyawan,
            kontak: req.body.kontak,
            username: req.body.username,
            password: md5(req.body.password)
        },

        {
            id_karyawan: req.body.id_karyawan
        }
    ]

    let sql = "update karyawan set ? where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})

app.delete("/karyawan/:id", (req,res) => {
    let data = {
        id_karyawan: req.params.id
    }
    let sql = "delete from karyawan where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) 
    })
})

app.post("/sewa", (req,res) =>{
    let data = {
        id_sewa: req.body.id_sewa,
        id_mobil: req.body.id_mobil,
        id_karyawan: req.body.id_karyawan,
        id_pelanggan: req.body.id_pelanggan,
        tgl_sewa: moment().format('YYYY-MM-DD HH:mm:ss'),
        tgl_kembali: req.body.tgl_kembali,
        total_bayar: req.body.total_bayar
    }

    let sql = "insert into sewa set ?"

    db.query(sql, data, (error, result) => {
        let response = null

        if(error){
            res.json({message: error.message})
        } else {
            res.json({message: "Data inserted"})
        }
    })
})

app.get("/sewa", (req,res) => {
    let sql = "select s.id_sewa, m.id_mobil, m.nomor_mobil, m.merk, m.jenis, m.warna, k.id_karyawan, k.nama_karyawan, p.id_pelanggan, p.nama_pelanggan, s.tgl_sewa, s.tgl_kembali, s.total_bayar " + 
    "from sewa s join mobil m on s.id_mobil = m.id_mobil " + 
    "join karyawan k on s.id_karyawan = k.id_karyawan " + 
    "join pelanggan p on s.id_pelanggan = p.id_pelanggan"

    db.query(sql, (error, result) => {
        if (error) {
            res.json({ message: error.message})   
        }else{
            res.json({
                count: result.length,
                sewa: result
            })
        }
    })
})

app.get("/sewa/:id_sewa", (req,res) => {
    let param = {id_sewa: req.params.id_sewa}

    let sql = "select s.id_sewa, m.id_mobil, m.nomor_mobil, m.merk, m.jenis, m.warna, k.id_karyawan, k.nama_karyawan, p.id_pelanggan, p.nama_pelanggan, s.tgl_sewa, s.tgl_kembali, s.total_bayar " +
    "from sewa s join mobil m on s.id_mobil = m.id_mobil " + 
    "join karyawan k on s.id_karyawan = k.id_karyawan " + 
    "join pelanggan p on s.id_pelanggan = p.id_pelanggan " +
    "where ?"

    db.query(sql, param, (error, result) => {
        if (error) {
            res.json({ message: error.message})   
        }else{
            res.json({
                count: result.length,
                sewa: result
            })
        }
    })
})

app.put("/sewa", (req,res) => {

    let data = [
        {
            id_mobil: req.body.id_mobil,
            id_karyawan: req.body.id_karyawan,
            id_pelanggan: req.body.id_pelanggan,
            tgl_kembali: req.body.tgl_kembali,
            total_bayar: req.body.total_bayar
        },
        {
            id_sewa: req.body.id_sewa
        }
    ]
    let sql = "update sewa set ? where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})

app.delete("/sewa/:id_sewa", (req, res) => {
    let param = { id_sewa: req.params.id_sewa}

    let sql = "delete from sewa where ?"

    db.query(sql, param, (error, result) => {
        if (error) {
            res.json({ message: error.message})
        } else {
            let param = { id_sewa: req.params.id_sewa}
            let sql = "delete from sewa where ?"

            db.query(sql, param, (error, result) => {
                if (error) {
                    res.json({ message: error.message})
                } else {
                    res.json({message: "Data has been deleted"})
                }
            })
        }
    })

})

app.listen(8000, () => {
    console.log("Run on port 8000")
})